const path = require('path');
const {appRoot} = require('./config.js');
const {is, either, not} = require('./utils.js');
const staticServer = require('./mod-static-server.js');

const prependRoot = (x) => path.join(appRoot, x);

const doesNotHaveExtension = not(
    either([is('.css'), is('.html'), is('.js'), is('.ico')]),
);
const isReact = either([is('react'), is('react.js')]);
const isReactDom = either([is('react-dom'), is('react-dom.js')]);
const isRoute = (url) => {
  if (url === '/' || url.startsWith('/privacy') || url.startsWith('/done')) {
    return true;
  }
  return false;
};

const resolve = (url) => {
  if (isRoute(url)) {
    return prependRoot('src/index.html');
  }
  if (isReact(url)) {
    return prependRoot('vendors/react-es/dist-dev/react.js');
  }
  if (isReactDom(url)) {
    return prependRoot('vendors/react-es/dist-dev/react-dom.js');
  }
  if (is('react.development.js', url)) {
    return prependRoot('vendors/react-es/dist-dev/react.development.js');
  }
  if (is('_commonjsHelpers.js', url)) {
    return prependRoot('vendors/react-es/dist-dev/_commonjsHelpers.js');
  }
  if (is('checkPropTypes.js', url)) {
    return prependRoot('vendors/react-es/dist-dev/checkPropTypes.js');
  }
  if (is('react-dom.development.js', url)) {
    return prependRoot('vendors/react-es/dist-dev/react-dom.development.js');
  }
  if (is('index3.js', url)) {
    return prependRoot('vendors/react-es/dist-dev/index3.js');
  }
  if (url === 'wouter') {
    return prependRoot('vendors/wouter/index.js');
  }
  if (url === '/vendors/use-location.js') {
    return prependRoot('vendors/wouter/use-location.js');
  }
  if (url === '/vendors/matcher.js') {
    return prependRoot('vendors/wouter/matcher.js');
  }
  if (url === '/vendors/react-deps.js') {
    return prependRoot('vendors/wouter/react-deps.js');
  }
  if (doesNotHaveExtension(url)) {
    return prependRoot(url + '.js');
  }

  return null;
};

const argv = process.argv.slice(2);
const serveDist = argv[0];

const start = () => {
  const opt = serveDist ?
    {
      expose: [{path: 'dist', as: '/'}],
      resolve: (url) => (isRoute(url) ? prependRoot('dist/index.html') : null),
    } :
    {
      verbose: true,
      expose: [
        {path: 'src', as: '/src'},
        {path: 'src', as: '/'},
        {path: 'vendors', as: '/vendors'},
      ],
      resolve: resolve,
    };
  const server = staticServer(opt);
  const port = 8000;

  server.listen(port, () => {
    console.log(`Development server is listening on port ${port}`);
  });
};

start();
