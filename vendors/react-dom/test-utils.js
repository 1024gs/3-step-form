if (process.env.NODE_ENV === 'production') {
    module.exports = require('../react-es/dist-prod/react-dom-test-utils.js');
  } else {
    module.exports = require('../react-es/dist-dev/react-dom-test-utils.js');
  }
  