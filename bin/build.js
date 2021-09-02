const fs = require("fs");
const path = require("path");
const { start } = require("repl");
async function build() {
    const filePath = path.resolve(__dirname, "..", "dist/main.js");
    // console.log(filePath)
    let text = fs.readFileSync(filePath, "utf8");
    // console.log(text)
    const bannerPath = path.resolve(__dirname, "..", "./bin/banner.txt");
    let banner = fs.readFileSync(bannerPath, "utf8");
    // console.log(banner)
    let outputPath = path.resolve(__dirname, "..", "dist/main.user.js");
    fs.writeFileSync(outputPath, banner + "\n" + text);
    // console.log(banner+text)
    console.log("build finished");
}
build()