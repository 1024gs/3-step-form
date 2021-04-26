const _rollup = require('rollup');

const path = require('path');
const {appRoot} = require('./config.js');
const {prop, has, merge, def, either, is} = require('./utils.js');

const prependRoot = (x) => path.join(appRoot, x);

const rollupFactory = (inputOpts, outputOpts) => (fileName, content) => {
  const inject = (content) => {
    let done = false;
    return {
      load(id) {
        /* (!done) <=> (id === fileName) */
        /* (id === fileName) doesn't work if fileName isn't absolute */
        if (!done) {
          done = true;
          return content;
        }

        return null;
      },
    };
  };

  const _inputOpts = merge({input: fileName}, inputOpts);

  if (def(content)) {
    if (!has('plugins', _inputOpts)) {
      _inputOpts.plugins = [];
    }
    _inputOpts.plugins.unshift(inject(content));
  }

  return _rollup
      .rollup(_inputOpts)
      .then((bundle) => bundle.generate(outputOpts))
      .then(prop('output'))
      .then((xs) => xs[0].code);
};

const rollupReactResolvePlugin = ({root, isProduction = false}) => {
  const isReact = either([is('react'), is('react.js')]);
  const isReactDom = either([is('react-dom'), is('react-dom.js')]);

  const react = (isProduction) =>
    isProduction ?
      'vendors/react-es/dist-prod/react.js' :
      'vendors/react-es/dist-dev/react.js';

  const reactDom = (isProduction) =>
    isProduction ?
      'vendors/react-es/dist-prod/react-dom.js' :
      'vendors/react-es/dist-dev/react-dom.js';

  return {
    name: 'scripts/rollup-react-resolve-plugin',
    resolveId(x, importer) {
      if (isReact(x)) {
        return prependRoot(react(isProduction));
      }
      if (isReactDom(x)) {
        return prependRoot(reactDom(isProduction));
      }
      return null;
    },
  };
};

const inputOpts = (plugins = []) => ({
  plugins: plugins,
});

/* iife = (function () { CODE })(); */
const outputOpts = (format = 'iife') => ({
  format: format,
  extend: false,
  interop: true,
  sourcemap: false,
});

const rollupIife = rollupFactory(inputOpts([]), outputOpts('iife'));

const rollupIifeReactResolve = (isProduction) =>
  rollupFactory(
      inputOpts([rollupReactResolvePlugin({root: appRoot, isProduction})]),
      outputOpts('iife'),
  );

module.exports = {
  rollupIife,
  rollupIifeReactResolve,
};
