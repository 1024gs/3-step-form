const fs = require('fs');
const path = require('path');
const {appRoot} = require('./config.js');
const {scanDir, is, either} = require('./utils.js');
const {transpileTsAndWrite} = require('./mod-typescript.js');

const argv = process.argv.slice(2);

if (argv.length < 1) {
  console.log('PLEASE SPECIFY THE FILE');
  console.log('');
  console.log('  Example: npm run transpile-ts -- file.ts');
  console.log('           npm run transpile-ts -- dir');
  return;
}

const fileName = argv[0];
const absolutePath = path.isAbsolute(fileName) ?
  fileName :
  path.join(appRoot, fileName);

if (fs.statSync(absolutePath).isDirectory()) {
  scanDir(absolutePath)
      .filter(either([is('.ts'), is('.tsx')]))
      .map((x) => transpileTsAndWrite(x, x.replace(/\.ts$/, '.js')));
} else {
  transpileTsAndWrite(absolutePath, absolutePath.replace(/\.ts$/, '.js'));
}
