const fs = require('fs');
const path = require('path');

const dir = __dirname;
const template = fs.readFileSync(path.join(dir, 'template.html'), 'utf8');
const font = fs.readFileSync(path.join(dir, 'font.b64.txt'), 'utf8').trim();
const bg = fs.readFileSync(path.join(dir, 'bg.b64.txt'), 'utf8').trim();
const icon = fs.readFileSync(path.join(dir, 'icon180.b64.txt'), 'utf8').trim();

const output = template
  .replace('{{FONT_BASE64}}', font)
  .replace(/\{\{BG_BASE64\}\}/g, bg)
  .replace(/\{\{ICON_BASE64\}\}/g, icon);

fs.writeFileSync(path.join(dir, 'index.html'), output);
console.log('Built index.html:', (output.length / 1024).toFixed(0), 'KB');
