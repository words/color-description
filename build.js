import fs from 'fs';

const body = fs.readFileSync('index.js', 'utf8');
const nodeTpl = fs.readFileSync('index.node.js.tpl', 'utf8');

fs.writeFileSync('dist/index.node.js', nodeTpl.replace('{{body}}', body));
fs.writeFileSync('dist/index.js', body);