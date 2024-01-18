// install-component.js
const fs = require('fs');
const path = require('path');

function askInstallDirectory() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        readline.question('Where is your component file? (e.g., app/component): ', (answer) => {
        readline.close();
        resolve(answer.trim());
        });
    });
}

function copyFileAsync(source, destination) {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(source);
        const writeStream = fs.createWriteStream(destination);

        readStream.on('error', reject);
        writeStream.on('error', reject);

        readStream.pipe(writeStream);

        writeStream.on('finish', resolve);
    });
}

async function installComponent() {
    const installDirectory = await askInstallDirectory();
    const sourcePath = path.join(__dirname, 'src', 'components', 'discord-messages-ui');
    const destinationPath = path.join(process.cwd(), installDirectory);

    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
    }

    const files = fs.readdirSync(sourcePath);
    for (const file of files) {
        const sourceFile = path.join(sourcePath, file);
        const destinationFile = path.join(destinationPath, file);
        await copyFileAsync(sourceFile, destinationFile);
    }

    console.log('Component installed successfully!');
}

installComponent();
