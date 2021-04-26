const fs = require('fs');
const path = require('path');
const {appRoot} = require('./config.js');
const {promiseSerial} = require('./utils.js');
const prependRoot = (x) => path.join(appRoot, x);

const argv = process.argv.slice(2);

if (argv.length < 1) {
  console.log('PLEASE SPECIFY THE FILE');
  console.log('');
  console.log('  Example: node ./scripts/task-mock.js on');
  console.log('           node ./scripts/task-mock.js off');
  return;
}

const isMockOn = fs.existsSync(prependRoot('src/utils/fetch-actual.js'));

const rename = (a, b) =>
  new Promise((resolve, reject) => {
    fs.rename(prependRoot(a), prependRoot(b), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

const turnItOn = promiseSerial(
    () => rename('src/utils/fetch.js', 'src/utils/fetch-actual.js'),
    () => rename('src/utils/fetch-mock.js', 'src/utils/fetch.js'),
);

const turnItOff = promiseSerial(
    () => rename('src/utils/fetch.js', 'src/utils/fetch-mock.js'),
    () => rename('src/utils/fetch-actual.js', 'src/utils/fetch.js'),
);

if (argv[0] === 'on') {
  if (isMockOn) {
    console.log('ON ALREADY!\n');
    return;
  }
  turnItOn();
}

if (argv[0] === 'off') {
  if (!isMockOn) {
    console.log('OFF ALREADY!\n');
    return;
  }
  turnItOff();
}
