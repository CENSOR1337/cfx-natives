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

function getNativeReturnType(type) {
    if (type == "string") return "_s";
    if (type == "char") return "_s";
    if (type == "float") return "_rf";
    if (type == "Vector3") return "_rv";
    if (type == "long") return "_rl";
    if (type == "int") return "_ri";
    if (type == "object") return "_ro"; // This is CFX object
    if (type == "Object") return "_ri"; // This is in game object
    return "_ri"// default
}

const nativeParamTypes = {
    "int": "int",
    "Any": "int",
    "float": "float",
    "boolean": "boolean",
    "Vehicle": "int",
    "Cam": "int",
    "Vector3": "Vector3",
    "FireId": "int",
    "Pickup": "int",
    "string": "string",
    "Hash": "hash",
    "Ped": "int",
    "Entity": "int",
    "Object": "int",
    "object": "object",
    "Player": "int",
    "ScrHandle": "int",
    "Blip": "int",
    "Interior": "int",
}

function getParamType(param) {
    return nativeParamTypes[param.type] || param.type;
}

function getTypescriptType(argument) {
    const type = getParamType(argument);
    let tsType = "any";
    if (type == "string") return "string";
    if (type == "boolean") return "boolean";
    if (type == "int") return "number";
    if (type == "float") return "number";
    if (type == "Vector3") return "Vector3";
    if (type == "hash") return "number";
    if (type == "void") return "void";
    return tsType;
}

function getReturnWarperFunction(param) {
    const nativeType = getTypescriptType(param);
    let warpper = undefined;
    if (nativeType == "Vector3") warpper = "_mv";
    return warpper
}

function getReturnWarpper(param) {
    const nativeType = getTypescriptType(param);
    let warpper = "";
    if (nativeType == "Vector3") warpper = "_mv";
    return warpper ? `${warpper}(${param.name})` : `${param.name} as ${nativeType}`;
}

class Native {
    hash;
    name;
    jhash;
    comment;
    params;
    results;
    rawNativeInfo;

    constructor(data) {
        this.rawNativeInfo = data;
        this.hash = data.hash;
        this.name = data.name;
        this.jhash = "Placeholder";
        this.comment = data.comment;

        // Convert params
        const params = [];
        for (const param of data.params) {
            params.push({
                name: param.name,
                type: getParamType(param),
                ref: param.ref,
            });
        }
        this.params = params;


        // Convert results
        const results = [];
        let splitedResults = data.results.split(", ");
        if (splitedResults.length <= 0) {
            results.push(data.results);
        } else {
            for (let result of splitedResults) {
                result = result.replace("[", "").replace("]", "");
                results.push(result);
            }
        }
        this.results = results;

    }

    getReferenceParams() {
        const params = [];
        for (const param of this.params) {
            if (param.ref) params.push(param);
        }
        return params;
    }

    isSinglePointer() {
        let foundPointer = false;
        for (const param of this.params) {
            if (param.ref) {
                if (foundPointer) return false;
                foundPointer = true;
            }
        }
        return this.params[this.params.length - 1].ref;
    }

    getNativeName() {
        let name = this.name;
        const isUnderscore = name.startsWith("_");
        if (isUnderscore) {
            name = name.substring(1);
        }
        const parts = name.split("_");
        const firstPart = parts.shift().toLowerCase();
        const rest = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join("");
        return firstPart + rest;
    }

    getInvokeArgs() {
        const hashs = splitHash(this.hash);
        const args = [hashs.one, hashs.two];
        for (const param of this.params) {
            let acc = "";
            if (param.ref) {
                const singlePointer = this.isSinglePointer();
                if (param.type == "int") acc = singlePointer ? `_ii(${param.name})` : `_i`;
                if (param.type == "float") acc = singlePointer ? `_fi(${param.name})` : `_f`;
                if (param.type == "Vector3") acc = `_v`;
                acc = acc || "_i";
            } else {
                if (param.type == "func") acc = `_mfr(${param.name})`;
                if (param.type == "float") acc = `_fv(${param.name})`;
                if (param.type == "hash") acc = `_ch(${param.name})`;
                if (param.type == "object") acc = `...(_obj(${param.name}))`;
                if (param.type == "string") acc = `_ts(${param.name})`;
                if (param.type == "char") acc = `_ts(${param.name})`;
                acc = acc || param.name;
            }

            args.push(acc);
        }

        if (this.results.length > 0 && this.results[0] != "void") {
            args.push("_r");
            if (this.results[0] != "boolean") {
                args.push(getNativeReturnType(this.results[0]));
            }
        }

        return args;
    }

    genDoc() {
        const desc = this.comment;

        if (desc.length <= 0) return "";
        let doc = "/**\n";

        const lines = desc.split("\n");
        lines.forEach((line) => {
            doc = doc.concat(` * ${trimAndNormalize(line)}\n`);
        });

        for (const param of this.params) {
            doc = doc.concat(` * @param ${param.name}\n`);
        }

        doc = doc.concat(" */\n");
        return doc;
    }

    genParams() {
        const params = []
        for (const param of this.params) {
            if (!param.ref || this.isSinglePointer()) {
                params.push(`${param.name}: ${getTypescriptType(param)}`);
            }
        }
        return params.join(", ");
    }

    isNameTakenByParam(name) {
        for (const param of this.params) {
            if (param.name == name) return true;
        }
        return false;
    }

    genReturnTypes() {
        const results = [];
        for (const result of this.results) {
            results.push(getTypescriptType({ type: result }));
        }
        const returnCount = this.getReturnCount();
        if (returnCount <= 1) {
            let tsReturnType = results[0];
            results.forEach((result) => {
                if (result != "void") tsReturnType = result;
            });
            return tsReturnType;
        }
        if (results[0] == "void") results.shift();
        return `[${results.join(", ")}]`;
    }

    genReturn() {
        if (this.getReferenceParams().length <= 0) return "void";
    }

    getReturnCount() {
        let returnCount = this.getReferenceParams().length;
        if (this.results[0] != "void") returnCount++;
        return returnCount;
    }

    genBody() {
        const invokeParams = this.getInvokeArgs().join(", ");
        const returnCount = this.getReturnCount()
        if (returnCount > 1) {
            const referenceParams = [];
            if (this.results.length > 0 && this.results[0] != "void") {
                referenceParams.push({ name: "retval", type: this.results[0] });
            }
            referenceParams.push(...this.getReferenceParams());
            for (const refParam of referenceParams) {
                refParam.name = this.isNameTakenByParam(refParam.name) ? `${refParam.name}_out` : refParam.name;
            }
            const invokePart = `const [${referenceParams.map(p => p.name).join(", ")}] = _in(${invokeParams});`;
            const returnPart = `return [${referenceParams.map(p => getReturnWarpper(p)).join(", ")}]`;
            return `${invokePart}\n\t${returnPart}`;
        }

        const returnWarpper = getReturnWarperFunction({ type: this.results[0] });
        const aaa = returnWarpper ? `${returnWarpper}(_in(${invokeParams}))` : `_in(${invokeParams})`;
        return `return ${aaa}`
    }

    generate() {
        return `\n${this.genDoc()}export function ${this.getNativeName()}(${this.genParams()}): ${this.genReturnTypes()} { \n\t${this.genBody()}; \n}\n`
    }

}


module.exports = {
    Native
}