/*  Generated

 "0x5835D9CD92E83184": {
        "name": "NETWORK_CLAN_GET_EMBLEM_TXD_NAME",
        "hash": "0x5835D9CD92E83184",
        "namespace": "NETWORK",
        "doc": "",
        "arguments": [
            {
                "name": "netHandle",
                "isPointer": true,
                "type": {
                    "name": "AnyPtr",
                    "nativeType": "Any*"
                }
            },
            {
                "name": "txdName",
                "isPointer": true,
                "type": {
                    "name": "charPtr",
                    "nativeType": "string"
                }
            }
        ],
        "returns": {
            "name": "BOOL",
            "nativeType": "bool"
        }
    },
*/


/* 
Expected

"0x5835D9CD92E83184": {
    "name": "NETWORK_CLAN_GET_EMBLEM_TXD_NAME"
    "hash": "0x5835D9CD92E83184",
    "ns": "NETWORK",
    "doc": "!\n\t",
    "arguments": [
      {
        "type": { "nativeType": "int", "name": "Any" },
        "pointer": true,
        "annotations": {},
        "name": "netHandle"
      },
      {
        "type": { "nativeType": "string", "name": "charPtr" },
        "annotations": { "cs_type": "AnyPtr" },
        "name": "txdName"
      }
    ],
    "returns": { "nativeType": "bool", "name": "BOOL" },
  },

*/

import fs from "fs";
async function start() {
    const generated = fs.readFileSync("./bin/natives.json", "utf-8");
    const expected = fs.readFileSync("./research/native_client.json", "utf-8");

    const generatedJson = JSON.parse(generated);
    const expectedJson = JSON.parse(expected);

    // check every native in generated json compared to expected json if they are the same or not
    for (const [hash, native] of Object.entries(generatedJson)) {
        const expectedNative = expectedJson[hash];
        if (!expectedNative) {
            console.log(`Missing native: ${native.name} - ${hash}`);
            continue;
        }

        if (native.name != expectedNative.name) {
            console.log(`Different native name: ${native.name} - ${hash}`);
            continue;
        }

        if (native.namespace != expectedNative.ns) {
            console.log(`Different namespace: ${native.name} - ${hash}`);
            continue;
        }

        if (native.arguments.length != expectedNative.arguments.length) {
            console.log(`Different argument length: ${native.name} - ${hash}`);
            continue;
        }

        for (let i = 0; i < native.arguments.length; i++) {
            const argument = native.arguments[i];
            const expectedArgument = expectedNative.arguments[i];
            if (argument.name != expectedArgument.name) {
                console.log(`Different argument name: ${native.name} - ${hash}`);
                continue;
            }

            if (argument.type.name != expectedArgument.type.name) {
                console.log(`Different argument type name: ${native.name} - ${hash}`);
                continue;
            }

            if (argument.type.nativeType != expectedArgument.type.nativeType) {
                console.log(`Different argument type nativeType: ${native.name} - ${hash}`);
                continue;
            }

            if (expectedArgument.pointer) {
                if (argument.isPointer != expectedArgument.pointer) {
                    console.log(`Different argument pointer: ${native.name} - ${hash}`);
                    continue;
                }
            }
        }

        if (native.returns) {
            if (native.returns.name != expectedNative.returns.name) {
                console.log(`Different returns name: ${native.name} - ${hash}`);
                continue;
            }

            if (native.returns.nativeType != expectedNative.returns.nativeType) {
                console.log(`Different returns nativeType: ${native.name} - ${hash}`);
                continue;
            }
        }
    }
}

start();