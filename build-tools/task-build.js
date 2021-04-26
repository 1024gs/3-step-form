const {promiseSerial} = require('./utils.js');
const {
  compileScss,
  transpileEs,
  bundle,
  concatenate,
  stripDebug,
  autoprefixCss,
  compressCss,
  compressJs,
} = require('./tasks.js');

const buildDev = promiseSerial(
    compileScss,
    transpileEs,
    bundle(false),
    concatenate,
);

const buildProd = promiseSerial(
    compileScss,
    transpileEs,
    bundle(true),
    concatenate,
    stripDebug,
    autoprefixCss,
    compressCss,
    compressJs,
);

const build = () => {
  switch (process.env.NODE_ENV) {
    case 'test':
    case 'production':
      return buildProd();
    default:
      return buildDev();
  }
};

build();
