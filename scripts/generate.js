import axios from "axios";
import fs from "fs";

import { splitHash, trimAndNormalize } from "./utils.js";
import { getVariableType, getArgumentWarpper, getNativeReturnType, isPointerArgument } from "./types.js";

function getNativeName(native) {
    let nativeName = native.name;
    const words = nativeName.split('_');

    const transformedWords = words.map((word, index) => {
        if (index === 0) return word.toLowerCase();
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    return transformedWords.join("");
}

function getNativeDoc(native) {
    const desc = native.description;
    let doc = "/**\n";

    const lines = desc.split("\n");
    lines.forEach((line) => {
        doc = doc.concat(` * ${trimAndNormalize(line)}\n`);
    });

    for (const param of native.params) {
        doc = doc.concat(` * @param ${param.name}\n`);
    }

    if (native.resultsDescription) {
        doc = doc.concat(` * @return ${trimAndNormalize(native.resultsDescription)}\n`);
    }

    doc = doc.concat(" */\n");
    return doc;
}

function getNativeParams(native) {
    const params = [];
    for (const param of native.params) {
        if (isPointerArgument(param)) continue;
        const paramType = getVariableType(param.type);
        params.push(`${param.name}: ${paramType}`);
    }
    //const params = native.params.map((param) => `${param.name}: ${getVariableType(param.type)}`).join(", ");
    //return params;
    return params.join(", ");
}

function getNativeInvokeParams(native) {
    const hashs = splitHash(native.hash);
    const returns = [hashs.one, hashs.two];

    for (const param of native.params) {
        returns.push(getArgumentWarpper(param, native));
    }

    if (native.results != "void") {
        returns.push("_r");
        const returnType = getNativeReturnType(native);
        if (returnType) {
            returns.push(returnType);
        }
    }

    return returns.join(", ");
}

const template = fs.readFileSync("./scripts/template.txt", "utf8");
const codegenTypes = [];
function getNatives(nativeFile) {
    const filePath = `./bin/${nativeFile}.json`;
    if (!fs.existsSync(filePath)) throw new Error(`File ${filePath} not found`);
    const file = fs.readFileSync(filePath, "utf8");

    const data = JSON.parse(file);
    const returnNatives = new Map();

    for (const [module, natives] of Object.entries(data)) {
        for (let [hash, native] of Object.entries(natives)) {
            if (!native.name) continue;

            if (native.params) {
                for (const param of native.params) {
                    param.name = param.name == "var" ? "varName" : param.name;
                    param.type = param.type.replace("*", "Ptr");
                    param.type = param.type.toLowerCase();

                    if (!codegenTypes.includes(param.type)) {
                        codegenTypes.push(param.type);
                    }
                }
            }
            native.results = native.results.replace("*", "Ptr");
            native.results = native.results.toLowerCase();
            returnNatives.set(hash, native);
        }
    }

    return returnNatives;
}

async function nativeGen(nativeFile) {
    const data = getNatives(nativeFile);
    let output = template;
    data.forEach((native) => {
        const nativeName = getNativeName(native);
        const doc = getNativeDoc(native);
        const param = getNativeParams(native);
        const returnType = getVariableType(native.results);
        const invokeParam = getNativeInvokeParams(native);
        const fnNative = `\n${doc}export function ${nativeName}(${param}): ${returnType} {\n\treturn _in(${invokeParam}); \n}\n`;

        output = output.concat(fnNative);
    });
    fs.writeFileSync(`./src/${nativeFile}.ts`, output);
}

nativeGen("natives");
nativeGen("natives_cfx");