const fs = require('fs');
const path = require('path');

// 1. Extract keys from main.js
const mainJs = fs.readFileSync('assets/js/main.js', 'utf8');
// Naive regex to find keys in translations.en
// Looks for: en: { ... }
const enBlockMatch = mainJs.match(/en:\s*{([^}]+)}/s);
if (!enBlockMatch) {
    console.error("Could not find en: {} block in main.js");
    process.exit(1);
}
const enBlock = enBlockMatch[1];
const keys = [];
const keyRegex = /([a-zA-Z0-9_]+):/g;
let match;
while ((match = keyRegex.exec(enBlock)) !== null) {
    keys.push(match[1]);
}
console.log("Found translation keys:", keys.length);

// 2. Scan HTML files
const htmlFiles = ['index.html', 'menu.html', 'reservation.html', 'contact.html'];
let missingKeys = [];

htmlFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const i18nRegex = /data-i18n="([^"]+)"/g;
        let i18nMatch;
        while ((i18nMatch = i18nRegex.exec(content)) !== null) {
            const key = i18nMatch[1];
            if (!keys.includes(key)) {
                missingKeys.push({ file, key });
            }
        }
    }
});

if (missingKeys.length > 0) {
    console.error("Missing translation keys found!");
    missingKeys.forEach(item => {
        console.error(`File: ${item.file}, Key: ${item.key}`);
    });
    process.exit(1);
} else {
    console.log("All data-i18n keys are present in main.js translations.");
}
