const path = require('path');
const {appRoot} = require('./config.js');

const csso = require('csso');
const uglifyES = require('uglify-es');

const {
  scanDir,
  is,
  either,
  not,
  test,
  read,
  write,
  mkDirR,
  prop,
} = require('./utils.js');
const {autoprefixer} = require('./mod-autoprefixer.js');
const {compileScssAndWrite} = require('./mod-sass.js');
const {transpileEsAndWrite} = require('./mod-babel.js');
const {rollupIifeReactResolve} = require('./mod-rollup.js');
const {rollupReact} = require('./mod-rollup-react.js');
const {
  useref,
  revRename,
  revReplaceFactory,
  rev,
  revReplace,
} = require('./mod-useref.js');

const prependRoot = (x) => path.join(appRoot, x);

const prepareVendors = () => {
  mkDirR('vendors/bootstrap/dist/css'.split('/'));
  return Promise.all([
    compileScssAndWrite(
        'vendors/bootstrap/scss/bootstrap.scss',
        'vendors/bootstrap/dist/css/bootstrap.css',
    ),
  ]);
};

const compileScss = () => {
  return Promise.all(
      scanDir(prependRoot('src'))
          .filter(is('.scss'))
          .filter(not(test(/_.*\.scss/)))
          .map((x) => compileScssAndWrite(x, x.replace(/\.scss$/, '.css'))),
  );
};

const transpileEs = () => {
  return Promise.all(
      scanDir(prependRoot('src'))
          .filter(either([is('.ts'), is('.tsx')]))
          .filter(not(either([is('.test.ts'), is('.test.tsx')])))
          .map((x) => transpileEsAndWrite(x, x.replace(/\.tsx?$/, '.js'))),
  );
};

const bundle = (isProduction) => () =>
  rollupIifeReactResolve(isProduction)(prependRoot('src/index.js')).then(
      write(prependRoot('src/index.js')),
  );

const concatenate = () => {
  mkDirR(['dist']);

  return read(prependRoot('src/index.html'))
      .then(useref())
      .then(([html, files]) => {
      // console.log(files);

        return Promise.all(
            files.map((file) =>
              Promise.all(file.assets.map(prependRoot).map(read))
                  .then((xs) => xs.reduce((a, b) => a + b, ''))
                  .then(rev(file))
                  .then(([hash, str]) => {
                    const renamed = revRename(hash, file.name);
                    return write(path.join('dist', renamed), str).then(() =>
                      revReplaceFactory(file.name, renamed),
                    );
                  }),
            ),
        )
            .then(revReplace(html))
            .then(write(prependRoot('dist/index.html')));
      });
};

const stripCode = (options) => {
  const pattern = new RegExp(
      '([\\t ]*\\/\\* ?' +
      options.startComment +
      ' ?\\*\\/)[\\s\\S]*?(\\/\\* ?' +
      options.endComment +
      ' ?\\*\\/[\\t ]*\\n?)',
      'g',
  );

  return (str) => str.replace(pattern, '');
};

const _stripDebug = (file, destination) => {
  return read(file)
      .then(
          stripCode({
            startComment: 'start-dev-block',
            endComment: 'end-dev-block',
          }),
      )
      .then(write(destination));
};

const stripDebug = () => {
  return Promise.all(
      scanDir('dist')
          .filter(either([is('.html'), is('.js')]))
          .filter(not(test(/vendors/)))
          .map((file) => _stripDebug(file, file)),
  );
};

const _compressCss = (file, destination) => {
  return read(file)
      .then(csso.minify)
      .then(prop('css'))
      .then(write(destination));
};

const compressCss = () => {
  return Promise.all(
      scanDir('dist')
          .filter(is('.css'))
          .map((file) => _compressCss(file, file)),
  );
};

const autoprefixCss = () => {
  return Promise.all(
      scanDir(prependRoot('dist'))
          .filter(is('.css'))
          .map((file) => autoprefixer(file, file)),
  );
};

const nCache = {};
const uglifyJSOptions = {
  compress: {
    inline: false,
    collapse_vars: false,
    drop_console: true,
    keep_infinity: true,
    typeofs: false,
    hoist_funs: false,
    hoist_props: false,
    hoist_vars: false,
  },
  mangle: {
    eval: false,
    keep_fnames: false,
    properties: false,
    toplevel: false,
  },
  output: {
    beautify: false,
    max_line_len: 500,
    quote_style: 1,
  },
  ie8: false,
  sourceMap: false,
  toplevel: true,
  keep_fnames: false,
  nameCache: nCache,
};
const _compressJs = (file, destination, isES6) => {
  // console.log('--- compress-js ', file, ' -- isES6', isES6);
  // let uglifyJS = {
  //   minify: (x) => {
  //     return {code: x};
  //   },
  // };

  return (
    read(file)
    // .then((x) => (isES6 ? uglifyES : uglifyJS)
    // .then((x) => uglifyES.minify(x, (isES6 ? options : options)))
        .then((x) => uglifyES.minify(x, uglifyJSOptions))
        .then(prop('code'))
        .then(write(destination))
  );
};

const compressJs = () => {
  // const isES6 = test(/(?:[^-]|^)src/);
  return Promise.all(
      scanDir('dist')
          .filter(is('.js'))
          .filter(not(test(/legacy-vendors/)))
          .map((file) => _compressJs(file, file)),
  );
};

module.exports = {
  prepareVendors,
  compileScss,
  transpileEs,
  bundle,
  concatenate,
  stripDebug,
  autoprefixCss,
  compressCss,
  compressJs,
};
