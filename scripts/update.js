import fs from "fs";

const links = {
    natives: "https://runtime.fivem.net/doc/natives.json",
    natives_cfx: "https://runtime.fivem.net/doc/natives_cfx.json",
};

async function downloadJsonNative() {
    for (const [name, link] of Object.entries(links)) {
        const response = await fetch(link);
        const json = await response.json();
        fs.writeFile(`./bin/${name}.json`, JSON.stringify(json, null, 4), (err) => {
            if (err) {
                console.error(err);
                return;
            };
        });
    }
}

downloadJsonNative();