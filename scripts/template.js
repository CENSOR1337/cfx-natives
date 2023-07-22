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