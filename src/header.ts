import { Vector3 } from "cfx-shared";
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

function joaat(s: string) {
	const k = s.toLowerCase();
	let h, i;

	for (h = i = 0; i < k.length; i++) {
		h += k.charCodeAt(i);
		h += h << 10;
		h ^= h >>> 6;
	}

	h += h << 3;
	h ^= h >>> 11;
	h += h << 15;

	return h >>> 0;
}

function _ch(hash: any) {
	if (typeof hash === "string") {
		return joaat(hash);
	}

	return hash;
}

function _obj(obj: any) {
	const s = msgpack_pack(obj);
	return [s, s.length];
}

function _ts(num: any) {
	if (num === 0 || num === null || num === undefined || num === false) {
		// workaround for users calling string parameters with '0', also nil being translated
		return null;
	}
	if (ArrayBuffer.isView(num) || num instanceof ArrayBuffer) {
		// these are handled as strings internally
		return num;
	}
	return num.toString();
}
function _fv(flt: number) {
	return flt === 0.0 ? flt : flt + 0.0000001;
}

function _mfr(fn: any) {
	return Citizen.makeRefFunction(fn);
}

function _mv(vector: any): Vector3 {
	return Vector3.fromArray(vector);
}
