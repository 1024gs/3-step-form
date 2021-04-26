if (process.env.NODE_ENV === 'production') {
    module.exports = require('../react-es/dist-prod/react-dom-server-node.js');
  } else {
    module.exports = require('../react-es/dist-dev/react-dom-server-node.js');
  }
  