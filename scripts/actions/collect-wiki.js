
const path = require('path');
const fs = require('fs');
const esdocSettings = require('../../.esdoc.json');

const TMP_DIR = 'wiki';


const tmpPath = path.join(__dirname, '../..', TMP_DIR);
if (!fs.existsSync(tmpPath)) {
  fs.mkdirSync(tmpPath);
}

const readmeFiles = esdocSettings['plugins'][0]['option']['manual']['files'];
for (const i in readmeFiles) {
  const fullPath = `../.${  readmeFiles[i]}`;
  const name = path.parse(fullPath).base;


  const newName = `${i  }-${  name.substr(7, name.length - 3)}`;
  fs.copyFileSync(path.resolve(__dirname, fullPath), path.join(tmpPath, newName));
}

// Attempt copy index file to "home.md" in wiki
const home = esdocSettings['plugins'][0]['option']['manual']['index'];
const homePath = `../.${home}`;
fs.copyFileSync(path.resolve(__dirname, homePath), path.join(tmpPath, 'home.md'));
