const axios = require('axios');
const fs = require('fs');
import { splitHash, trimAndNormalize } from "./utils";
import { ParamTypes, getParamType } from "./paramTypes";
import { ReturnTypes, getReturnType } from "./returnType";

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
        doc = doc.concat(` * @param ${param.name} ${param.type}\n`);
    }

    if (native.resultsDescription) {
        doc = doc.concat(` * @return ${trimAndNormalize(native.resultsDescription)}\n`);
    }

    doc = doc.concat(" */\n");
    return doc;
}

function getNativeParams(native) {
    const params = native.params.map((param) => `${param.name}: ${getParamType(param.type)}`).join(", ");
    return params;
}

function getNativeInvokeParams(native) {
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

async function getNatives(link) {
    const data = (await axios < any > (link)).data;
    const returnNatives = new Map();

    for (const [module, natives] of Object.entries(data)) {
        for (let [hash, native] of Object.entries(natives)) {
            if (!native.name) continue;
            returnNatives.set(hash, native);
        }
    }

    return returnNatives;
}


const output = fs.readFileSync("./scripts/template.js", "utf8");
