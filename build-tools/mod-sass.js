const sass = require('node-sass');

const {read, prop, write} = require('./utils.js');

const compileScssAndWrite = (fileName, destination) => {
  return read(fileName)
      .then((x) => sass.renderSync({data: x, file: fileName}))
      .then(prop('css'))
      .then(write(destination));
};

module.exports = {
  compileScssAndWrite,
};
