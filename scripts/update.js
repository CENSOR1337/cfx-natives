const fs = require("fs");

const NATIVE_DB = {
    GTA5: "https://raw.githubusercontent.com/alloc8or/gta5-nativedb-data/master/natives.json",
    RDR3: "https://raw.githubusercontent.com/alloc8or/rdr3-nativedb-data/master/natives.json"
}

function isParameterReference(parameter) {
    if (parameter.includes("char")) return false;
    return parameter.includes("*");
}

function getParameterType(parameter) {
    if (parameter.includes("char")) return "string";
    if (parameter.includes("BOOL")) return "boolean";
    return parameter.replace("*", "");
}

function getParameterName(name) { // mostly for avoiding reserved words for javascript or typescript
    if (name === "var") return "_var";
    if (name === "let") return "_let";
    return name;
}

function getReturnType(returnType) {
    if (returnType.includes("char")) return "string";
    if (returnType.includes("BOOL")) return "boolean";
    return returnType.replace("*", "");
}

function getResult(native, returnType) {
    const results = [getReturnType(returnType)];
    for (parameter of native.params) {
        if (parameter.ref) {
            results.push(getReturnType(parameter.type));
        }
    }
    if (results.length === 1) return results[0];
    return `[${results.join(", ")}]`;
}

function getNativeName(name) {
    const parts = name.replace(/^_/, '').split('_');

    const firstPart = parts.shift().toLowerCase();
    const rest = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join('');

    return firstPart + rest;
}

async function downloadJsonNative() {
    const response = await fetch(NATIVE_DB.GTA5);
    const data = await response.json();
    const nativeDB = {};
    for (const [namespace, natives] of Object.entries(data)) {
        const nativesMap = {};
        for (const [hash, native] of Object.entries(natives)) {
            const parameters = []
            for (const [index, parameter] of Object.entries(native.params)) {
                const parameterInfo = {
                    name: getParameterName(parameter.name),
                    type: getParameterType(parameter.type),
                    ref: isParameterReference(parameter.type)
                }
                parameters.push(parameterInfo)
            }
            const nativeInfo = {
                nativeName: getNativeName(native.name),
                namespace: namespace,
                name: native.name,
                hash: hash,
                params: parameters,
                comment: native.comment,
            }
            const results = getResult(nativeInfo, native.return_type);
            nativeInfo.results = results;
            nativesMap[nativeInfo.hash] = nativeInfo;
        }
        nativeDB[namespace] = nativesMap;
    }
    if (!fs.existsSync("./bin")) {
        fs.mkdirSync("./bin");
    }
    const output = JSON.stringify(nativeDB, null, 4);
    fs.writeFile(`./bin/natives.json`, output, (err) => {
        if (err) {
            console.error(err);
            return;
        };
    });
}

downloadJsonNative();
