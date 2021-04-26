const fs = require('fs');
const path = require('path');
const {appRoot} = require('./config.js');
const {scanDir, is, either} = require('./utils.js');
const {prettifyJs} = require('./mod-prettier.js');

const argv = process.argv.slice(2);

if (argv.length < 1) {
  console.log('PLEASE SPECIFY THE FILE');
  console.log('');
  console.log('  Example: npm run prettify-js -- file.js');
  console.log('           npm run prettify-js -- dir');
  return;
}

const fileName = argv[0];
const absolutePath = path.isAbsolute(fileName) ?
  fileName :
  path.join(appRoot, fileName);

if (fs.statSync(absolutePath).isDirectory()) {
  scanDir(absolutePath)
      .filter(either([is('.js'), is('.ts'), is('.tsx'), is('.jsx')]))
      .map((x) => prettifyJs(x, x));
} else {
  prettifyJs(absolutePath, absolutePath);
}
