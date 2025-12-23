const fs = require('fs');

const getEntityAndContentTypeByKey = (key) => {
    const [entity, contentType] = key.split(/(?=[A-Z])/).map((str) => str.toLowerCase());

    if (!['target', 'source'].includes(entity)) {
        return [];
    }

    if (!['md', 'text', 'image', 'audio'].includes(contentType)) {
        return [];
    }

    return [entity, contentType];
}

const getTypesByPackage = (pckg) => {
    const resultSet = new Set();

    pckg.content.items.forEach((item) => {
        Object.keys(item).forEach((key) => {
            const [entity, contentType] = getEntityAndContentTypeByKey(key);
            if (entity && contentType) {
                resultSet.add(contentType);
            }
        });
    });

    return Array.from(resultSet);
}

async function main () {
    const result = [];
    const packs = fs.readdirSync(__dirname + `\\..\\.local-packages\\`);
    for (let pack of packs) {
        const content = fs.readFileSync(__dirname + `\\..\\.local-packages\\${pack}\\tzu.json`).toString();
        const json = JSON.parse(content);

        result.push({
            packageName: json.packageName,
            author: json.author,
            description: json.description,
            cardsAmount: json.content.items.length,
            contentTypes: getTypesByPackage(json),
            url: `https://raw.githubusercontent.com/yellow-bat/tzu-packs/main/packs/${json.packageName}.zip`
        });
    }

    fs.writeFileSync(
        __dirname + `\\..\\meta.json`,
        JSON.stringify(result, null, 4)
    );
}

main();

