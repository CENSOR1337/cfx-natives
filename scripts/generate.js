const fs = require("fs");

function splitHash(hash) {
    const bigHash = BigInt(hash);
    const hashOne = (bigHash >> BigInt(32)) & BigInt(0xffffffff);
    const hashTwo = bigHash & BigInt(0xffffffff);
    return {
        one: `0x${hashOne.toString(16).padStart(8, "0")}`,
        two: `0x${hashTwo.toString(16).padStart(8, "0")}`,
    };
}

function trimAndNormalize(str) {
    return str.trim().replace(/\/\*/g, " -- [[").replace(/\*\//g, "]] ");
}


function getNumOfPointers(native) {
    return native.params.filter((param) => param.ref).length;
}

function isSinglePointerNative(native) {
    return getNumOfPointers(native) == 1;
}

function getArgumentWarpper(argument, native) {
    const isPointer = argument.ref;
    if (isPointer) {
        const isSinglePointer = isSinglePointerNative(native);
        if (argument.type.includes("int")) return isSinglePointer ? `_ii(${argument.name})` : `_i`;
        if (argument.type.includes("float")) return isSinglePointer ? `_fi(${argument.name})` : `_f`;
        if (argument.type.includes("Vector3")) return `_v`;

        return `_i`;
    }

    if (argument.type.includes("func")) return `_mfr(${argument.name})`;
    if (argument.type.includes("float")) return `_fv(${argument.name})`;
    if (argument.type.includes("hash")) return `_ch(${argument.name})`;
    if (argument.type.includes("object")) return `...(_obj(${argument.name})`;
    if (argument.type.includes("string")) return `_ts(${argument.name})`;
    if (argument.type.includes("char")) return `_ts(${argument.name})`;

    return argument.name;
}

function getNativeReturnType(native) {
    if (native.results.includes("string")) return "_s";
    if (native.results.includes("char")) return "_s";
    if (native.results.includes("float")) return "_rf";
    if (native.results.includes("Vector3")) return "_rv";
    if (native.results.includes("long")) return "_rl";
    if (native.results.includes("int")) return "_ri";
    if (native.results.includes("any")) return "_ri";
    if (native.results.includes("object")) return "_ro";
}


function getNativeInvokeParams(native) {
    const hashs = splitHash(native.hash);
    const returns = [hashs.one, hashs.two];

    for (const param of native.params) {
        returns.push(getArgumentWarpper(param, native));
    }

    if (!native.results.includes("void")) {
        returns.push("_r");
        const returnType = getNativeReturnType(native);
        if (returnType) {
            returns.push(returnType);
        }
    }

    return returns.join(", ");
}

function getParamType(param) {
    switch (param.type) {
        case "int":
            return "int";
        case "void":
            return "void";
        case "Any":
            return "int";
        case "float":
            return "float";
        case "boolean":
            return "boolean";
        case "Vehicle":
            return "int";
        case "Cam":
            return "int";
        case "Vector3":
            return "Vector3";
        case "FireId":
            return "int";
        case "Pickup":
            return "int";
        case "string":
            return "string";
        case "Hash":
            return "hash";
        case "Ped":
            return "int";
        case "Entity":
            return "int";
        case "Object":
            return "int";
        case "Player":
            return "int";
        case "ScrHandle":
            return "int";
        case "Blip":
            return "int";
        case "Interior":
            return "int";
        default:
            return param.type;
    }
}

function getTypescriptType(argument) {
    const type = getParamType(argument);
    if (type.includes("int")) return "number";
    if (type.includes("float")) return "number";
    if (type.includes("Vector3")) return "Vector3";
    if (type.includes("hash")) return "string | number";
    return "any"
}

function getNativeArguments(native) {
    const params = [];
    for (const param of native.params) {
        if (!param.ref || isSinglePointerNative(native)) {
            const paramType = getTypescriptType(param);
            params.push(`${param.name}: ${paramType}`);
        };
    }
    return params.join(", ");
}

function getNativeDoc(native) {
    const desc = native.comment;

    if (desc.length <= 0) return "";
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

function getReturnWarpper(native, invokeParams) {

    if (native.results.includes("Vector3")) {
        const returnCount = native.results.split("Vector3").length - 1;
        const warpperFunction = returnCount == 1 ? "Vector3.fromArray" : "Vector3.fromArrays"
        return `${warpperFunction}(_in(${invokeParams}))`;
    }

    return `_in(${invokeParams})`;
}

const template = fs.readFileSync("./src/header.ts", "utf8");


function generateNatives() {
    const path = "./bin/natives.json";
    if (!fs.existsSync(path)) throw new Error(`File ${path} not found`);
    const nativeDB = JSON.parse(fs.readFileSync(path, "utf8"));
    const allNatives = new Array();

    for (const [namespace, natives] of Object.entries(nativeDB)) {
        for (const [hash, native] of Object.entries(natives)) {
            native.hash = hash;
            for (const param of native.params) {
                param.type = getParamType(param);
            }
            native.results = getParamType({ type: native.results });
            allNatives.push(native);
        }
    }

    // Sort by name
    allNatives.sort((a, b) => {
        if (a.altName > b.altName) {
            return 1;
        } else {
            return -1;
        }
    });

    let output = template;
    allNatives.forEach((native) => {
        const nativeName = native.altName;
        const doc = getNativeDoc(native);
        const args = getNativeArguments(native);
        const returnType = getTypescriptType({ type: native.results });
        const invokeParams = getNativeInvokeParams(native);
        const returnWarp = getReturnWarpper(native, invokeParams);

        const fnNative = `\n${doc}export function ${nativeName}(${args}): ${returnType} {\n\treturn ${returnWarp}; \n}\n`;
        output = output.concat(fnNative);
    });

    if (!fs.existsSync("./src")) {
        fs.mkdirSync("./src");
    }
    fs.writeFileSync("./src/natives.ts", output);

}

generateNatives();