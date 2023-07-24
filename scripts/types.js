export const CodegenType = {
    void: "void",
    charptr: "charptr",
    float: "float",
    int: "int",
    entity: "entity",
    ped: "ped",
    bool: "bool",
    vehicle: "vehicle",
    anyptr: "anyptr",
    any: "any",
    hash: "hash",
    object: "object",
    intptr: "intptr",
    cam: "cam",
    player: "player",
    boolptr: "boolptr",
    scrhandle: "scrhandle",
    entityptr: "entityptr",
    vector3ptr: "vector3ptr",
    floatptr: "floatptr",
    scrhandleptr: "scrhandleptr",
    objectptr: "objectptr",
    vehicleptr: "vehicleptr",
    pedptr: "pedptr",
    hashptr: "hashptr",
    fireid: "fireid",
    pickup: "pickup",
    blip: "blip",
    blipptr: "blipptr",
    func: "func",
    long: "long",
    vector3: "vector3",
}

/* 
* This function is used to get the return type of a function. in TypeScript syntax.
*/
export function getVariableType(type) {
    type = type.toLowerCase();
    switch (type) {
        case CodegenType.void:
            return "void";
        case CodegenType.charptr:
            return "string";
        case CodegenType.float:
            return "number";
        case CodegenType.int:
            return "number";
        case CodegenType.entity:
            return "number";
        case CodegenType.ped:
            return "number";
        case CodegenType.bool:
            return "boolean";
        case CodegenType.vehicle:
            return "number";
        case CodegenType.anyptr:
            return "any";
        case CodegenType.any:
            return "any";
        case CodegenType.hash:
            return "number";
        case CodegenType.object:
            return "number";
        case CodegenType.intptr:
            return "number";
        case CodegenType.cam:
            return "number";
        case CodegenType.player:
            return "number";
        case CodegenType.boolptr:
            return "boolean";
        case CodegenType.scrhandle:
            return "number";
        case CodegenType.entityptr:
            return "number";
        case CodegenType.vector3ptr:
            return "Vector3";
        case CodegenType.floatptr:
            return "number";
        case CodegenType.scrhandleptr:
            return "number";
        case CodegenType.objectptr:
            return "number";
        case CodegenType.vehicleptr:
            return "number";
        case CodegenType.pedptr:
            return "number";
        case CodegenType.hashptr:
            return "number";
        case CodegenType.fireid:
            return "number";
        case CodegenType.pickup:
            return "number";
        case CodegenType.blip:
            return "number";
        case CodegenType.blipptr:
            return "number";
        case CodegenType.func:
            return "any";
        case CodegenType.long:
            return "number";
        case CodegenType.vector3:
            return "Vector3";
        default:
            return "any";
    }
}

export function isPointerArgument(argument) {
    if (argument.type.includes("char")) return false;
    return argument.type.includes("ptr");
}

function isSinglePointerNative(native) {
    let isFoundPointer = false;
    for (const param of native.params) {
        if (isPointerArgument(param)) {
            if (isFoundPointer) {
                return false;
            } else {
                isFoundPointer = true;
            }
        }
    }

    return native.params[native.params.length - 1].type.includes("ptr");
}

export function getArgumentWarpper(argument, native) {
    const isPointer = isPointerArgument(argument);
    if (isPointer) {
        const isSinglePointer = isSinglePointerNative(native);

        if (argument.type.includes("int")) return isSinglePointer ? `_ii(${argument.name})` : `_i`;
        if (argument.type.includes("float")) return isSinglePointer ? `_fi(${argument.name})` : `_f`;
        if (argument.type.includes("vector3")) return `_v(${argument.name})`;

        return `_i`;
    }

    if (argument.type.includes("func")) return `_mfr(${argument.name})`;
    if (argument.type.includes("float")) return `_fv(${argument.name})`;
    if (argument.type.includes("hash")) return `_ch(${argument.name})`;
    //if (argument.type.includes("object")) return `...(_obj(${argument.name})`;
    if (argument.type.includes("string")) return `_ts(${argument.name})`;
    if (argument.type.includes("char")) return `_ts(${argument.name})`;

    return argument.name;
}


export function getNativeReturnType(native) {

    if (native.results.includes("string")) return "_s";
    if (native.results.includes("char")) return "_s";
    if (native.results.includes("float")) return "_rf";
    if (native.results.includes("vector3")) return "_rv";
    if (native.results.includes("long")) return "_rl";
    if (native.results.includes("int")) return "_ri";
    if (native.results.includes("any")) return "_ri";
    if (native.results.includes("object")) return "_ro";
}
