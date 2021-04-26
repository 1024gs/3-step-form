const fs = require('fs');
const path = require('path');
const {appRoot} = require('./config.js');
const {scanDir, is, either, not, read, write} = require('./utils.js');
const {transpileEsAndWrite} = require('./mod-babel.js');

const argv = process.argv.slice(2);

if (argv.length < 1) {
  console.log('PLEASE SPECIFY THE FILE');
  console.log('');
  console.log('  Example: npm run transpile-tsx -- file.ts');
  console.log('           npm run transpile-tsx -- dir');
  return;
}

const fileName = argv[0];
const absolutePath = path.isAbsolute(fileName) ?
  fileName :
  path.join(appRoot, fileName);

if (fs.statSync(absolutePath).isDirectory()) {
  scanDir(absolutePath)
      .filter(either([is('.ts'), is('.tsx')]))
      .filter(not(either([is('.test.ts'), is('.test.tsx')])))
      .map((x) => transpileEsAndWrite(x, x.replace(/\.tsx?$/, '.js')));
} else {
  transpileEsAndWrite(absolutePath, absolutePath.replace(/\.tsx?$/, '.js'));
}
