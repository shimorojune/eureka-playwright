const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = require(packageJsonPath);

const newVersion = process.argv[2];
const tagFormat = `1.51.1-${newVersion}`;

packageJson.version = tagFormat;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log(`Updated package.json version to new version ${tagFormat}`);
