const fs = require('fs');
const path = require('path');
const {appRoot} = require('./config');

/* ------------------------------------------------------ */
/* ----------------------- Helpers ---------------------- */
/* ------------------------------------------------------ */
const length = (x) => x.length;
const isArray = (x) => Array.isArray(x);
/* concat() does not change the existing arrays, but instead returns a new array */
const concat = (b, a) => a.concat(b); // [1].concat([2]) -> [1, 2]
const push = (b, a) => a.concat([b]); // [1].concat(2) -> [1, 2]
const includes = (x, xs) => xs.includes(x);
const map = (f, xs) => xs.map(f);
const curry = (fn, a = []) => (...b) => {
  const args = concat(b, a);
  if (length(args) < length(fn)) {
    return curry(fn, args);
  }
  return fn(...args);
};
const has = (x, obj) => obj.hasOwnProperty(x);
const keys = (x) => Object.keys(x);
const merge = (b, a) => Object.assign(a, b);
const head = (xs) => xs[0];
const last = (xs) => xs[length(xs) - 1];
const tail = (xs) => xs.slice(1);
const pipe = (...fns) => (init) => fns.reduce((a, fn) => fn(a), init);
const pipeP = (f, g) => (x) => f(x).then(g);
const promiseSerial = (...xs) => tail(xs).reduce(pipeP, head(xs));
const def = (x) => typeof x !== 'undefined';
const undef = (x) => !def(x);
const test = (regexp, x) => regexp.test(x);
const either = (predicates, x) => predicates.some((f) => f(x));
const not = (pred, x) => !pred(x);
const prop = (x, obj) => obj[x];
const isPrefixOf = (b, a) => a.substring(0, length(b)) === b; // (src, src/foo) -> true
const isSuffixOf = (b, a) =>
  a.substring(length(a) - length(b), length(a)) === b; // (.js, foo.js) -> true
const is = (ext, file) => isSuffixOf(ext, file);
const isNot = (ext, file) => !isSuffixOf(ext, file);
const once = (fn) => {
  let called = false;
  let r;
  return (...args) => {
    if (called) {
      return r;
    }
    called = true;
    r = fn(...args);
    return r;
  };
};
const memoizeWith = (mFn, fn) => {
  const cache = {};
  return (...args) => {
    const key = mFn(...args);
    if (!has(key, cache)) {
      cache[key] = fn(...args);
      // console.log(key, '->', cache[key]);
    }
    return cache[key];
  };
};
const flatten = (xs) =>
  xs.reduce((a, x) => {
    if (isArray(x)) {
      return concat(x, a);
    } else {
      return push(x, a);
    }
  }, []);
const maxBy = (f, xs) => xs.reduce((a, x) => Math.max(a, f(x)), 0);
const pad = (x, n, a = '') => (n > 0 ? pad(x, n - 1, `${a}${x}`) : a);
// todo: review pad
// '23'.padEnd(8, '0') // '23000000'
// Array.prototype.reject = function(fn) {
//   return this.filter(not(fn));
// };

const yellow = (x) => `\x1b[33m${x}\x1b[0m`;
const green = (x) => `\x1b[32m${x}\x1b[0m`;
const red = (x) => `\x1b[31m${x}\x1b[0m`;
const magenta = (x) => `\x1b[35m${x}\x1b[0m`;
const cyan = (x) => `\x1b[36m${x}\x1b[0m`;
const grey = (x) => `\x1b[90m${x}\x1b[0m`;

const scanDir = (dir) => {
  return fs
      .readdirSync(dir)
      .reduce(
          (a, x) =>
        fs.statSync(path.join(dir, x)).isDirectory() ?
          a.concat(scanDir(path.join(dir, x))) :
          a.concat(path.join(dir, x)),
          [],
      );
};

const mkDirR = (xs, existMap = {}, a = '', i = 0) => {
  if (i >= length(xs)) {
    return;
  }
  a += xs[i] + path.sep;

  if (undef(existMap[a])) {
    existMap[a] = true;
    try {
      fs.mkdirSync(a);
      // console.log('-- made ------', a);
    } catch (e) {
      // if (e.code === 'EEXIST') {
      //   console.log('---- exists ---', a);
      // }
      if (e.code !== 'EEXIST' && e.code !== 'EPERM') {
        throw e;
      }
    }
  } else {
    // console.log('------- skip - ', a);
  }

  mkDirR(xs, existMap, a, i + 1);
};
// let existMap = {};
// mkDirR(['a', 'a', 'a'], existMap);
// mkDirR(['a', 'a', 'b'], existMap);
// mkDirR(['a', 'b', 'a'], existMap);
// mkDirR(['a', 'b', 'b'], existMap);
// mkDirR(['b', 'c', 'd', 'e', 'f'], existMap);

const read = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const write = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const readSync = (file) => fs.readFileSync(file, {encoding: 'utf8'});
const writeSync = (file, data) =>
  fs.writeFileSync(file, data, {encoding: 'utf8'});

// const writeStream = (file) => {
//   const ws = fs.createWriteStream(file, {encoding: 'utf8', autoClose: true});
//   return (data) => {
//     return new Promise((resolve, reject) => {
//       ws.write(data);
//       ws.on('error', reject);
//       ws.on('finish', resolve);
//       ws.end();
//     });
//   };
// };

const copy = (source, target) => {
  return new Promise((resolve, reject) => {
    let end = false;
    const done = (err) => {
      if (!end) {
        err ? reject(err) : resolve();
        end = true;
      }
    };

    const rd = fs.createReadStream(source);
    rd.on('error', function(err) {
      done(err);
    });
    const wr = fs.createWriteStream(target);
    wr.on('error', function(err) {
      done(err);
    });
    wr.on('close', function() {
      done(null);
    });
    rd.pipe(wr);
  });
};

const dest = (from, to) => {
  // console.log('------ from --- ' + from + ' --- to --- ' + to);
  const existMap = {};
  const destPath = path.resolve(appRoot, to);
  // console.log('------ appRoot ', appRoot);
  // console.log('------ destPath', destPath);

  // does not make much sense
  // just reminds you that there is room for optimisation
  mkDirR(path.relative(appRoot, destPath).split(path.sep), existMap);

  return (file) => {
    const x = file.replace(from, to);
    const f = path.relative(appRoot, path.dirname(x));

    mkDirR(f.split(path.sep), existMap);

    return x;
  };
};

const watch = (options = {}) => {
  const opt = merge(options, {
    persistent: true,
    interval: 200,
    encoding: 'utf8',
  });

  return (files, cb) => {
    return files.map((x) =>
      fs.watchFile(x, opt, (curr, prev) => {
        if (curr.mtime > prev.mtime) {
          cb(x);
        }
      }),
    );
  };
};

const unwatch = (files, cb) => {
  return files.map((x) => fs.unwatchFile(x, cb));
};

const runFactory = (options) => {
  const {spawn} = require('child_process');
  const getCwd = () => process.env.PWD || process.cwd();

  if (undef(options.cwd)) {
    options.cwd = getCwd();
  }

  return (command, args) => {
    return new Promise((resolve, reject) => {
      const cmd = spawn(command, args, options);
      // catch exceptions so node doesn't exit prematurely,
      // leaving a runaway process
      process.on('uncaughtException', (err) => {
        console.error('err.stack', err.stack);
        cmd.kill('SIGHUP');
      });

      let stdout = '';
      let stderr = '';

      cmd.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      cmd.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      cmd.on('close', (code, signal) => {
        if (code === 0) {
          resolve(stdout);
        } else {
          reject(stderr);
        }
      });
    });
  };
};

const removeComments = (x) =>
  x
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*.*?\*\//g, '')
      .replace(/\,\s*\}/g, '}')
      .replace(/\,\s*\]/g, ']');
const parseConfig = (x) => JSON.parse(removeComments(x));

module.exports = {
  length,
  keys,
  has: curry(has),
  curry,
  merge: curry(merge),
  head,
  last,
  tail,
  isArray,
  concat: curry(concat),
  push: curry(push),
  includes: curry(includes),
  map: curry(map),
  flatten,
  pipe,
  pipeP,
  promiseSerial,
  def,
  undef,
  test: curry(test),
  either: curry(either),
  not: curry(not),
  prop: curry(prop),
  isPrefixOf: curry(isPrefixOf),
  isSuffixOf: curry(isSuffixOf),
  is: curry(is),
  isNot: curry(isNot),
  once,
  memoizeWith,
  maxBy: curry(maxBy),
  pad: pad,
  parseConfig,

  yellow,
  green,
  red,
  cyan,
  magenta,
  grey,

  scanDir,
  mkDirR,
  read,
  readSync,
  write: curry(write),
  writeSync: curry(writeSync),
  copy,
  dest,
  watch,
  unwatch,
  runFactory,
};
