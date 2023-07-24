import fs from "fs";

const nativeDbLink = "https://natives.altv.mp/natives";

async function downloadJsonNative() {
    const response = await fetch(nativeDbLink);
    const data = await response.json();
    const jsonData = JSON.stringify(data, null, 4);
    fs.writeFile(`./bin/natives.json`, jsonData, (err) => {
        if (err) {
            console.error(err);
            return;
        };
    });
}

downloadJsonNative();
