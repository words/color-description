const fs = require('fs');
const babel = require("@babel/core");

const transpile = code => babel.transform(code, {
  presets: ["@babel/preset-env"],
}).code

const lib = transpile(fs.readFileSync('src/lib.js', 'utf8'));
const index = transpile(fs.readFileSync('src/index.js', 'utf8'));
const nodeTpl = fs.readFileSync('index.node.js.tpl', 'utf8');

fs.writeFileSync('dist/index.node.js', nodeTpl.replace('{{body}}', lib + index));
fs.writeFileSync('dist/index.js', index);
fs.writeFileSync('dist/lib.js', lib);