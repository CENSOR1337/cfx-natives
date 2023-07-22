export const ReturnTypes = {
    Int: "int",
    Void: "void",
    Bool: "bool",
    CharPtr: "char*",
    Long: "long",
    Float: "float",
    Object: "object",
    Entity: "entity",
    Vector3: "vector3",
    Hash: "hash",
    Player: "player",
    Vehicle: "vehicle",
    Blip: "blip",
    Any: "any",
    Cam: "cam",
    Ped: "ped",
    AnyPtr: "any*",
    ScrHandle: "scrhandle",
    FireId: "fireid",
    Pickup: "pickup",
}

export function getReturnType(type) {
    switch (type.toLowerCase()) {
        case ReturnTypes.Int:
            return "number";
        case ReturnTypes.Void:
            return "void";
        case ReturnTypes.Bool:
            return "boolean";
        case ReturnTypes.CharPtr:
            return "string";
        case ReturnTypes.Long:
            return "number";
        case ReturnTypes.Float:
            return "number";
        case ReturnTypes.Object:
            return "number";
        case ReturnTypes.Entity:
            return "number";
        case ReturnTypes.Vector3:
            return "Vector3";
        case ReturnTypes.Hash:
            return "number";
        case ReturnTypes.Player:
            return "number";
        case ReturnTypes.Vehicle:
            return "number";
        case ReturnTypes.Blip:
            return "number";
        case ReturnTypes.Any:
            return "any";
        case ReturnTypes.Cam:
            return "number";
        case ReturnTypes.Ped:
            return "number";
        case ReturnTypes.AnyPtr:
            return "any";
        case ReturnTypes.ScrHandle:
            return "number";
        case ReturnTypes.FireId:
            return "number";
        case ReturnTypes.Pickup:
            return "number";
        default:
            return "any";
    }

}

export function getInvokeType(type) {
    switch (type.toLowerCase()) {
        case ReturnTypes.Int:
            return "_ri";
        case ReturnTypes.Void:
            return "_r";
        case ReturnTypes.Bool:
            return "_ri";
        case ReturnTypes.CharPtr:
            return "_s";
        case ReturnTypes.Long:
            return "_rl";
        case ReturnTypes.Float:
            return "_rf";
        case ReturnTypes.Object:
            return "_ro";
        case ReturnTypes.Entity:
            return "_ri";
        case ReturnTypes.Vector3:
            return "_rv";
        case ReturnTypes.Hash:
            return "_ri";
        case ReturnTypes.Player:
            return "_ri";
        case ReturnTypes.Vehicle:
            return "_ri";
        case ReturnTypes.Blip:
            return "_ri";
        case ReturnTypes.Any:
            return "_ri";
        case ReturnTypes.Cam:
            return "_ri";
        case ReturnTypes.Ped:
            return "_ri";
        case ReturnTypes.AnyPtr:
            return "_ri";
        case ReturnTypes.ScrHandle:
            return "_ri";
        case ReturnTypes.FireId:
            return "_ri";
        case ReturnTypes.Pickup:
            return "_ri";
        default:
            return "_ri";
    }
}