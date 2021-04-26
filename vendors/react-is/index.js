if (process.env.NODE_ENV === 'production') {
  module.exports = require('../react-es/dist-prod/react-is.js');
} else {
  // Todo: enzyme-adapter-react-16 doesn't support es modules
  module.exports = require('./react-is-cjs-dev.js');
}
