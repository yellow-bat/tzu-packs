const fs = require('fs');
const archiver = require('archiver');

async function main () {
    const packs = fs.readdirSync(__dirname + `\\..\\.local-packages\\`);
    try {
        fs.rmSync(__dirname + `\\..\\packs\\`, { recursive: true });
    } catch(e) {}
    fs.mkdirSync(__dirname + `\\..\\packs\\`);

    for (let pack of packs) {
        const content = fs.readFileSync(__dirname + `\\..\\.local-packages\\${pack}\\tzu.json`).toString();
        const name = JSON.parse(content).packageName;
        const output = fs.createWriteStream(__dirname + `\\..\\packs\\${name}.zip`);
        const archive = archiver('zip', {
            zlib: { level: 9 }
        });
        archive.pipe(output);

        archive.directory(__dirname + `\\..\\.local-packages\\${pack}`, false);
        archive.finalize();
    }
}

main();
