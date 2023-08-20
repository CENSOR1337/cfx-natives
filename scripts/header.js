const fs = require("fs");
const header = fs.readFileSync("./src/header.ts", "utf8");

module.exports = {
    header
}