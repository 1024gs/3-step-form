const path = require('path');
const _babel = require('@babel/core');
const {appRoot} = require('./config.js');

const {readSync, parseConfig, read, prop, write, merge} = require('./utils.js');
const {transpileTs} = require('./mod-typescript.js');

const babelrc = require(path.join(appRoot, 'babel.config.js'))({
  env: (x) => process.env.NODE_ENV === x,
});

const babel = (fileName) => {
  return (content) =>
    _babel
        .transformAsync(
            content,
            merge(
                {
                  root: appRoot,
                  filename: fileName,
                  configFile: false,
                  babelrc: false,
                },
                babelrc,
            ),
        )
        .then(prop('code'));
};

const transpileEsAndWrite = (fileName, destination) =>
  read(fileName)
      .then(transpileTs(fileName))
      .then(babel(fileName))
      .then(write(destination));

module.exports = {
  babel,
  transpileEsAndWrite,
};
