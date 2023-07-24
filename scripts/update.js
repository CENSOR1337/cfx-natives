import fs from "fs";
//https://natives.altv.mp/natives

const links = {
    natives: "https://runtime.fivem.net/doc/natives.json",
    natives_cfx: "https://runtime.fivem.net/doc/natives_cfx.json",
};

const nativeTypeMap = {
    /*  "void": {
         nativeType: "int",
     }, */
    "anyptr": {
        nativeType: "Any*",
    },
    "any": {
        nativeType: "int",
    },
    "uint": {
        nativeType: "int",
    },
    "hash": {
        nativeType: "int",
    },
    "entity": {
        nativeType: "int",
    },
    "player": {
        nativeType: "int",
    },
    "decisionmaker": {
        nativeType: "int",
    },
    "fireid": {
        nativeType: "int",
    },
    "ped": {
        nativeType: "int",
        extends: "Entity",
    },
    "vehicle": {
        nativeType: "int",
        extends: "Entity",
    },
    "cam": {
        nativeType: "int",
    },
    "cargenerator": {
        nativeType: "int",
    },
    "group": {
        nativeType: "int",
    },
    "train": {
        nativeType: "int",
        extends: "Vehicle",
    },
    "pickup": {
        nativeType: "int",
    },
    "object": {
        nativeType: "int",
        extends: "Entity",
    },
    "weapon": {
        nativeType: "int",
    },
    "interior": {
        nativeType: "int",
    },
    "blip": {
        nativeType: "int",
    },
    "texture": {
        nativeType: "int",
    },
    "texturedict": {
        nativeType: "int",
    },
    "coverpoint": {
        nativeType: "int",
    },
    "camera": {
        nativeType: "int",
    },
    "tasksequence": {
        nativeType: "int",
    },
    "colourindex": {
        nativeType: "int",
    },
    "sphere": {
        nativeType: "int",
    },
    "scrhandle": {
        nativeType: "int",
    },
    "bool": {
        nativeType: "bool",
    },
    "int": {
        nativeType: "int",
    },
    "long": {
        nativeType: "int",
        subtype: "long",
    },
    "float": {
        nativeType: "float",
    },
    "charptr": {
        nativeType: "string",
    },
    "vector3": {
        nativeType: "vector3",
    },
    "func": {
        nativeType: "func",
    },
    // "object": {
    //     nativeType: "object",
    // },
};

/* 
    [
    'int',     
    'Any*',
    'object',  
    'bool',
    'float',   
    'string',
    'vector3', 
    'func'
    ]
*/

const paramTypes = [];
const returnTypes = [];
async function downloadJsonNative() {
    for (const [name, link] of Object.entries(links)) {
        const response = await fetch(link);
        const data = await response.json();
        const mapNatives = new Map();
        for (const [namespace, natives] of Object.entries(data)) {
            if (namespace == "CFX") continue;
            for (const [hash, native] of Object.entries(natives)) {
                const params = [];
                for (const param of native.params) {
                    if (!paramTypes.includes(param.type)) paramTypes.push(param.type);
                    const isPointer = param.type.includes("*");
                    let type = param.type.replace("*", "Ptr");
                    if (hash == "0x5835D9CD92E83184") {
                        console.log(type);
                    }
                    const newParam = {
                        name: param.name,
                        isPointer: isPointer,
                        type: {
                            name: type.includes("int") ? "int" : (type.includes("object") ? "Entity" : type),
                            ...nativeTypeMap[type.toLowerCase()] || nativeTypeMap.any
                        }
                    }
                    params.push(newParam);
                }

                let results = native.results.replace("*", "Ptr");

                if (!returnTypes.includes(results)) returnTypes.push(results);

                const nativeData = new Map();
                nativeData.set("name", native.name || hash);
                nativeData.set("hash", native.hash);
                nativeData.set("namespace", namespace);
                nativeData.set("doc", native.description);
                nativeData.set("arguments", params);
                if (results != "void") {
                    nativeData.set("returns", {
                        name: results,
                        ...nativeTypeMap[results.toLowerCase()]
                    });
                }
                mapNatives.set(hash, Object.fromEntries(nativeData));
            }
        }
        const jsonData = JSON.stringify(Object.fromEntries(mapNatives), null, 4);
        fs.writeFile(`./bin/${name}.json`, jsonData, (err) => {
            if (err) {
                console.error(err);
                return;
            };
        });
    }

    console.log(paramTypes);
    console.log(returnTypes);
}

downloadJsonNative();
