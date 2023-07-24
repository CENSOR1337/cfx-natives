export const ParamTypes = {
    CharPtr: "char*",
    Int: "int",
    Hash: "hash",
    Func: "func",
    Bool: "bool",
    Vehicle: "vehicle",
    Long: "long",
    Float: "float",
    Entity: "entity",
    Object: "object",
    EntityPtr: "entity*",
    Cam: "cam",
    Vector3Ptr: "vector3*",
    FloatPtr: "float*",
    Ped: "ped",
    Player: "player",
    IntPtr: "int*",
    BoolPtr: "bool*",
    Vector3: "vector3",
    Any: "any",
    BlipPtr: "blip*",
    Blip: "blip",
    AnyPtr: "any*",
    ScrHandle: "scrhandle",
    ScrHandlePtr: "scrhandle*",
    ObjectPtr: "object*",
    VehiclePtr: "vehicle*",
    PedPtr: "ped*",
    HashPtr: "hash*",
    FireId: "fireid",
    Pickup: "pickup",
}

export function getParamType(type) {
    switch (type.toLowerCase()) {
        case ParamTypes.CharPtr:
            return "string";
        case ParamTypes.Int:
            return "number";
        case ParamTypes.Hash:
            return "number";
        case ParamTypes.Func:
            return "number";
        case ParamTypes.Bool:
            return "boolean";
        case ParamTypes.Vehicle:
            return "number";
        case ParamTypes.Long:
            return "number";
        case ParamTypes.Float:
            return "number";
        case ParamTypes.Entity:
            return "number";
        case ParamTypes.Object:
            return "number";
        case ParamTypes.EntityPtr:
            return "number";
        case ParamTypes.Cam:
            return "number";
        case ParamTypes.Vector3Ptr:
            return "Vector3";
        case ParamTypes.FloatPtr:
            return "number";
        case ParamTypes.Ped:
            return "number";
        case ParamTypes.Player:
            return "number";
        case ParamTypes.IntPtr:
            return "number";
        case ParamTypes.BoolPtr:
            return "boolean";
        case ParamTypes.Vector3:
            return "Vector3";
        case ParamTypes.Any:
            return "any";
        case ParamTypes.BlipPtr:
            return "number";
        case ParamTypes.Blip:
            return "number";
        case ParamTypes.AnyPtr:
            return "any";
        case ParamTypes.ScrHandle:
            return "number";
        case ParamTypes.ScrHandlePtr:
            return "number";
        case ParamTypes.ObjectPtr:
            return "number";
        case ParamTypes.VehiclePtr:
            return "number";
        case ParamTypes.PedPtr:
            return "number";
        case ParamTypes.HashPtr:
            return "number";
        case ParamTypes.FireId:
            return "number";
        case ParamTypes.Pickup:
            return "number";
        default:
            return "any";
    }
}


export function getParamSafeFunction(type) {
    type = type.toLowerCase();
    const isPtr = type.includes("ptr");
    const paramType = getParamType(type);

    if (isPtr) {
        if (paramType === "number") {
            return isPtr ? "_ii" : "_i";
        }
    }
}


