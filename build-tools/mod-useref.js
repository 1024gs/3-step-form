const path = require('path');
const crypto = require('crypto');
const {def} = require('./utils.js');

const _useref = require('useref');

const useref = () => {
  const _files = (o) => {
    const r = [];
    for (const type in o) {
      if (!o.hasOwnProperty(type)) {
        continue;
      }

      for (const file in o[type]) {
        if (!o[type].hasOwnProperty(file)) {
          continue;
        }

        r.push({
          type: type,
          name: file,
          assets: o[type][file].assets.map((x) =>
            def(o[type][file].searchPaths) ?
              path.join(o[type][file].searchPaths, x) :
              x,
          ),
        });
      }
    }

    return r;
  };

  return (x) => {
    const r = _useref(x);
    return [r[0], _files(r[1])];
  };
};

const revHash = (str) =>
  crypto.createHash('md5').update(str).digest('hex').slice(0, 10);

const revRename = (ver, x) => x.replace(/(\.\w+$)/, '-' + ver + '$1');

const revReplaceFactory = (from, to) => (x) =>
  x.replace(RegExp('(=|\'|")' + from), '$1' + to);

const rev = (x) => (str) => [revHash(str), str];

const revReplace = (html) => (fns) => fns.reduce((a, fn) => fn(a), html);

module.exports = {
  useref,
  revRename,
  revReplaceFactory,
  rev,
  revReplace,
};
