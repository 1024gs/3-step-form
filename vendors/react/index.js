if (process.env.NODE_ENV === 'production') {
  module.exports = require('../react-es/dist-prod/react.js');
} else {
  module.exports = require('../react-es/dist-dev/react.js');
}
