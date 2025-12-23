const fs = require('fs');
const extract = require('extract-zip')

async function main () {
    const packs = fs.readdirSync('./packs');
    for (let pack of packs) {
        fs.rmdirSync(__dirname + `\\..\\.local-packages\\`, { recursive: true });
        const packFolder = __dirname + `\\..\\packs\\${pack}`;
        const outputPackFolder = __dirname + `\\..\\.local-packages\\${pack.replace('.zip', '')}`;
        await extract(packFolder, { dir: outputPackFolder })
    }
}

main();
