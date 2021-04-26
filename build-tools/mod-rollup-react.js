const rollup = require('rollup');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');

const path = require('path');
const {appRoot} = require('./config.js');

const prependRoot = (x) => path.join(appRoot, x);

const toIdentifierName = (str) => str.replace(/[^\w]+/g, '');

/** expand-exports-plugin for Babel
 * This plugin expands exports for CommonJS modules into granular
 * export-default and export-all declarations.
 *
 * It takes a "map" option that must be an object from
 * module names (e.g. 'react') to filenames.
 * It then replaces export-all declarations (i.e. "export *") with
 * granular exports that export all named keys and a default export.
 */
const expandExportsPlugin = ({template, types: t}) => ({
  visitor: {
    ExportAllDeclaration(path, state) {
      const {map} = state.opts;
      const module = path.node.source.value;
      const file = map[module];
      // We retrieve the module name and filename from the map
      if (typeof file === 'string') {
        // We turn the module name to a safe identifier
        const importId = t.identifier(toIdentifierName(module));
        // We retrieve all exports via CommonJS in Node
        const exportKeys = Object.keys(require(file));

        // import %importId% from "%file%;
        const importNode = t.importDeclaration(
            [t.importDefaultSpecifier(importId)],
            t.stringLiteral(file),
        );

        // export default %importId%;
        const defaultExportNode = t.exportDefaultDeclaration(importId);

        // export const { %exportKeys% } = %importId%;
        const exportsNode = t.exportNamedDeclaration(
            t.variableDeclaration('const', [
              t.variableDeclarator(
                  t.objectPattern(
                      exportKeys.map((name) => {
                        const identifier = t.identifier(name);
                        return t.objectProperty(identifier, identifier, false, true);
                      }),
                  ),
                  importId,
              ),
            ]),
            [],
        );

        // Replace the export-all declaration with new nodes
        path.replaceWithMultiple([importNode, defaultExportNode, exportsNode]);
      }
    },
  },
});

/* This replaces object-assign with native Object.assign */
const replaceAssignPlugin = ({types: t}) => ({
  visitor: {
    CallExpression(path, state) {
      const {callee, arguments: args} = path.node;

      if (
        t.isIdentifier(callee) &&
        callee.name === 'require' &&
        t.isStringLiteral(args[0]) &&
        args[0].value === 'object-assign'
      ) {
        path.replaceWithSourceString('Object.assign');
      }
    },
  },
});

const exportsMap = (isProduction = false) => ({
  'react': `react/cjs/react.${
    isProduction ? 'production.min' : 'development'
  }.js`,
  'react-is': `react-is/cjs/react-is.${
    isProduction ? 'production.min' : 'development'
  }.js`,
  'react-dom': `react-dom/cjs/react-dom.${
    isProduction ? 'production.min' : 'development'
  }.js`,
  'react-dom-server-browser': `react-dom/cjs/react-dom-server.browser.${
    isProduction ? 'production.min' : 'development'
  }.js`,
  'react-dom-server-node': `react-dom/cjs/react-dom-server.node.${
    isProduction ? 'production.min' : 'development'
  }.js`,
  'react-dom-test-utils': `react-dom/cjs/react-dom-test-utils.${
    isProduction ? 'production.min' : 'development'
  }.js`,
  'prop-types': 'prop-types/index.js',
});

const inputOpts = (isProduction = false) => ({
  input: {
    'index': prependRoot('vendors/react-es/src/index.js'),
    'react': prependRoot('vendors/react-es/src/react.js'),
    'react-is': prependRoot('vendors/react-es/src/react-is.js'),
    'react-dom': prependRoot('vendors/react-es/src/react-dom.js'),
    'react-dom-server-browser': prependRoot(
        'vendors/react-es/src/react-dom-server-browser.js',
    ),
    'react-dom-server-node': prependRoot(
        'vendors/react-es/src/react-dom-server-node.js',
    ),
    'react-dom-test-utils': prependRoot(
        'vendors/react-es/src/react-dom-test-utils.js',
    ),
    'prop-types': prependRoot('vendors/react-es/src/prop-types.js'),
  },
  plugins: [
    babel({
      babelrc: false,
      plugins: [
        // This expands all our exports
        [
          expandExportsPlugin,
          {
            map: exportsMap(isProduction),
          },
        ],
        // This replaces object-assign with native Object.assign
        replaceAssignPlugin,
      ],
    }),
    nodeResolve({
      mainFields: ['module', 'jsnext', 'main'],
      browser: true,
    }),
    commonjs({
      ignoreGlobal: true,
      include: /\/node_modules\//,
      namedExports: {
        'react': Object.keys(require('react')),
        'react-dom': Object.keys(require('react-dom')),
        'prop-types': Object.keys(require('prop-types')),
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        isProduction ? 'production' : 'development',
      ),
    }),
  ],
  onwarn: () => {},
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
  },
});

const outputOpts = (destination) => ({
  compact: true,
  interop: false,
  freeze: false,
  dir: prependRoot('vendors/react-es/' + destination),
  entryFileNames: '[name].js',
  chunkFileNames: '[name].js',
  format: 'esm',
});

const rollupReact = () =>
  Promise.all([
    rollup
        .rollup(inputOpts(false))
        .then((bundle) => bundle.write(outputOpts('dist-dev'))),
    rollup
        .rollup(inputOpts(true))
        .then((bundle) => bundle.write(outputOpts('dist-prod'))),
  ]).then(() =>
    rollup
        .rollup({input: prependRoot('vendors/react-es/dist-dev/react-is.js')})
        .then((bundle) =>
          bundle.write({
            format: 'cjs',
            file: prependRoot('vendors/react-is/react-is-cjs-dev.js'),
          }),
        ),
  );

module.exports = {
  rollupReact,
};
