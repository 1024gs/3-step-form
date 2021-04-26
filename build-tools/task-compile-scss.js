const fs = require('fs');
const path = require('path');
const {appRoot} = require('./config.js');
const {scanDir, is, not, test} = require('./utils.js');
const {compileScssAndWrite} = require('./mod-sass.js');

const argv = process.argv.slice(2);

if (argv.length < 1) {
  console.log('PLEASE SPECIFY THE FILE');
  console.log('');
  console.log('  Example: npm run compile-scss -- file.scss');
  console.log('           npm run compile-scss -- dir');
  return;
}

const fileName = argv[0];
const absolutePath = path.isAbsolute(fileName) ?
  fileName :
  path.join(appRoot, fileName);

if (fs.statSync(absolutePath).isDirectory()) {
  scanDir(absolutePath)
      .filter(is('.scss'))
      .filter(not(test(/_[a-zA-Z0-9-_]*\.scss/)))
      .map((x) => compileScssAndWrite(x, x.replace(/\.scss$/, '.css')));
} else {
  compileScssAndWrite(absolutePath, absolutePath.replace(/\.scss$/, '.css'));
}
