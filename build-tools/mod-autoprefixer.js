const {read, write} = require('./utils.js');

const _autoprefixer = require('autoprefixer');
const postcss = require('postcss');

const autoprefixer = (fileName, destination) => {
  return read(fileName)
      .then((x) =>
        postcss([_autoprefixer]).process(x, {from: fileName, to: destination}),
      )
      .then((x) => {
        x.warnings().forEach((warn) => {
          console.warn(warn.toString());
        });
        return x.css;
      })
      .then(write(destination));
};

module.exports = {autoprefixer};
