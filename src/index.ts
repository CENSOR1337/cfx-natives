import axios from "axios";
import * as fs from "fs";
import { ParamTypes, getParamType } from "./ParamTypes";
import { ReturnTypes, getReturnType, getInvokeType } from "./ReturnTypes";
import { json } from "stream/consumers";

interface Param {
	name: string;
	type: string;
}

interface Native {
	name: string;
	params: Array<Param>;
	results: string;
	description: string;
	example: string;
	hash: string;
	ns: string;
	apiset: string;
	resultsDescription: string;
}

interface SplitedHash {
	one: string;
	two: string;
}

function getNativeName(native: Native) {
	let input = native.name;
	const words = input.split("_");

	const transformedWords = words.map((word, index) => {
		if (index === 0) return word.toLowerCase();
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	});

	return transformedWords.join("");
}

function splitHash(hash: string): SplitedHash {
	const bigHash = BigInt(hash);
	const hashOne = (bigHash >> BigInt(32)) & BigInt(0xffffffff);
	const hashTwo = bigHash & BigInt(0xffffffff);
	return {
		one: `0x${hashOne.toString(16).padStart(8, "0")}`,
		two: `0x${hashTwo.toString(16).padStart(8, "0")}`,
	};
}

async function getNatives(link: string): Promise<Map<string, Native>> {
	const data = (await axios<any>(link)).data;
	const returnNatives = new Map<string, Native>();

	for (const [module, natives] of Object.entries(data)) {
		for (let [hash, native] of Object.entries(natives as Map<string, Native>)) {
			if (!native.name) continue;
			returnNatives.set(hash, native);
		}
	}

	return returnNatives;
}
function trimAndNormalize(str: string) {
    //return trim(str):gsub('/%*', ' -- [['):gsub('%*/', ']] ')
    return  str.trim().replace(/\/\*/g, " -- [[").replace(/\*\//g, "]] ");
}

function getDoc(native: Native): string {
	const desc = native.description;
	let doc = "/**\n";

	const lines = desc.split("\n");
	lines.forEach((line) => {
		doc = doc.concat(` * ${trimAndNormalize(line)}\n`);
	});

	for (const param of native.params) {
		doc = doc.concat(` * @param ${param.name} ${param.type}\n`);
	}

	if (native.resultsDescription) {
		doc = doc.concat(` * @return ${trimAndNormalize(native.resultsDescription)}\n`);
	}

	doc = doc.concat(" */\n");
	return doc;
}

function getParam(native: Native): string {
	const params = native.params.map((param) => `${param.name}: ${getParamType(param.type)}`).join(", ");
	return params;
}

function geInvokeParam(native: Native): string {
	const hashs = splitHash(native.hash);
	const returns = [hashs.one, hashs.two];

	for (const param of native.params) {
		returns.push(param.name);
	}

	if (native.results != "void") {
		returns.push("_r");

		returns.push(getInvokeType(native.results));
	}

	return returns.join(", ");
}

const main = `
//@ts-ignore
const Citizen = global.Citizen;
//@ts-ignore
const msgpack_pack = global.msgpack_pack;
const _i = Citizen.pointerValueInt();
const _f = Citizen.pointerValueFloat();
const _v = Citizen.pointerValueVector();
const _r = Citizen.returnResultAnyway();
const _ri = Citizen.resultAsInteger();
const _rf = Citizen.resultAsFloat();
const _rl = Citizen.resultAsLong();
const _s = Citizen.resultAsString();
const _rv = Citizen.resultAsVector();
const _ro = Citizen.resultAsObject2();
const _in = Citizen.invokeNativeByHash;
const _ii = Citizen.pointerValueIntInitialized;
const _fi = Citizen.pointerValueFloatInitialized;
function _ch(hash) {
    if (typeof hash === 'string') {
        return getHashKey(hash);
    }

    return hash;
}

function _obj(obj) {
    const s = msgpack_pack(obj);
    return [s, s.length];
}

function _ts(num) {
    if (num === 0 || num === null || num === undefined || num === false) { // workaround for users calling string parameters with '0', also nil being translated
        return null;
    }
    if (ArrayBuffer.isView(num) || num instanceof ArrayBuffer) { // these are handled as strings internally
        return num;
    }
    return num.toString();
}
function _fv(flt) {
    return (flt === 0.0) ? flt : (flt + 0.0000001);
}

function _mfr(fn) {
    return Citizen.makeRefFunction(fn);
}
`;

async function nativeGen(link: string) {
	const data = await getNatives(link);
	let output = main;
	data.forEach((native) => {
		const nativeName = getNativeName(native);
		const doc = getDoc(native);
		const param = getParam(native);
		const returnType = getReturnType(native.results);
		const invokeParam = geInvokeParam(native);
		const fnNative = `\n${doc}export function ${nativeName}(${param}): ${returnType} {\n\treturn _in(${invokeParam}); \n}\n`;

		output = output.concat(fnNative);
	});
	fs.writeFileSync("./output/natives.txt", output);
}

const links = {
	natives: "https://runtime.fivem.net/doc/natives.json",
	natives_cfx: "https://runtime.fivem.net/doc/natives_cfx.json",
};
//nativeGen(links.natives);
nativeGen(links.natives_cfx);
