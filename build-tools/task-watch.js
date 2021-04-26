const path = require('path');
const liveReload = require('livereload');
const {appRoot} = require('./config.js');

const {scanDir, either, is, not, watch, unwatch, once} = require('./utils.js');
const {compileScssAndWrite} = require('./mod-sass.js');
const {transpileEsAndWrite} = require('./mod-babel.js');
const {compileScss} = require('./tasks.js');
const {prettifyJs, prettifyCss} = require('./mod-prettier.js');

const prependRoot = (x) => path.join(appRoot, x);
const removeRoot = (x) => x.replace(appRoot + path.sep, '').replace(/\\/g, '/');

const watch200 = watch({interval: 100});

const unwatchWithLog = (file, cb) => {
  console.log('-- not watching... ', removeRoot(file));
  return unwatch([file], cb);
};

const watchWithLog = (file, cb) => {
  console.log('-- watching... ', removeRoot(file));
  return watch200([file], cb);
};

const handleCss = (liveReloadServer) => (file) => {
  // console.log('file:', file);
  unwatchWithLog(file);
  const reWatch = once(() => watchWithLog(file, handleCss(liveReloadServer)));

  if (/_[a-zA-Z0-9-_]*\.scss/.test(file)) {
    // compile all scss
    compileScss().then(() => {
      liveReloadServer.refresh(removeRoot(file));
    });
  } else {
    const cssFile = file.replace(/\.scss$/, '.css');
    compileScssAndWrite(file, cssFile).then(() => {
      liveReloadServer.refresh(removeRoot(cssFile));
    });
  }
  setTimeout(() => {
    prettifyCss(file, file).then(reWatch);
  }, 0);
};

const handleJs = (liveReloadServer) => (file) => {
  unwatchWithLog(file);
  const reWatch = once(() => watchWithLog(file, handleJs(liveReloadServer)));

  // todo: posible optimisation read the content of the file ONCE
  const jsFile = file.replace(/\.tsx?$/, '.js');
  transpileEsAndWrite(file, jsFile).then(() => {
    liveReloadServer.refresh(removeRoot(jsFile));
  });

  prettifyJs(file, file).then(reWatch);
};

const handleTest = (liveReloadServer) => (file) => {
  unwatchWithLog(file);
  const reWatch = once(() => watchWithLog(file, handleTest(liveReloadServer)));

  prettifyJs(file, file).then(reWatch);
};

const watchFiles = () => {
  const liveReloadServer = liveReload.createServer();

  /* Watch scss */
  watch200(
      scanDir(prependRoot('src')).filter(is('.scss')),
      handleCss(liveReloadServer),
  );

  /* Watch tsx */
  watch200(
      scanDir(prependRoot('src'))
          .filter(either([is('.ts'), is('.tsx')]))
          .filter(not(either([is('.test.ts'), is('.test.tsx')]))),
      handleJs(liveReloadServer),
  );

  /* Watch test */
  watch200(
      scanDir(prependRoot('src')).filter(
          either([is('.test.ts'), is('.test.tsx')]),
      ),
      handleTest(liveReloadServer),
  );

  process.on('exit', () => {
    unwatch(scanDir(prependRoot('src')));
  });
};

watchFiles();
