const fs = require('fs');
const path = require('path');

const dir = __dirname;
const template = fs.readFileSync(path.join(dir, 'template.html'), 'utf8');
const font = fs.readFileSync(path.join(dir, 'font.b64.txt'), 'utf8').trim();
const roboto = fs.readFileSync(path.join(dir, 'roboto.b64.txt'), 'utf8').trim();
const bangers = fs.readFileSync(path.join(dir, 'bangers.b64.txt'), 'utf8').trim();
const bg = fs.readFileSync(path.join(dir, 'bg.b64.txt'), 'utf8').trim();
const icon = fs.readFileSync(path.join(dir, 'icon180.b64.txt'), 'utf8').trim();
const swTemplate = fs.readFileSync(path.join(dir, 'sw.template.js'), 'utf8');

const buildVersion = String(Date.now());

const output = template
  .replace('{{FONT_BASE64}}', font)
  .replace('{{ROBOTO_BASE64}}', roboto)
  .replace('{{BANGERS_BASE64}}', bangers)
  .replace(/\{\{BG_BASE64\}\}/g, bg)
  .replace(/\{\{ICON_BASE64\}\}/g, icon)
  .replace(/\{\{BUILD_VERSION\}\}/g, buildVersion);

const swOutput = swTemplate.replace(/\{\{BUILD_VERSION\}\}/g, buildVersion);

fs.writeFileSync(path.join(dir, 'index.html'), output);
fs.writeFileSync(path.join(dir, 'sw.js'), swOutput);
console.log('Built index.html:', (output.length / 1024).toFixed(0), 'KB, version', buildVersion);
