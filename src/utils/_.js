/*
 * Composition
 */
const noop = () => {};
const always = (x) => () => x;
const on = (f, g) => (a, b) => f(g(a), g(b));
const pipe = (...fns) => (init) => fns.reduce((a, fn) => fn(a), init);
const when = (pred, onTrue, x) => (pred(x) ? onTrue(x) : x);
const applyTo = (x) => (f) => f(x);
const not = (f) => (x) => !f(x);
const curry = (fn, a = []) => (...b) => {
  const args = a.concat(b);
  if (args.length < fn.length) {
    return curry(fn, args);
  }
  return fn(...args);
};

/*
 * Boolean
 */
const isDefined = (x) => typeof x !== 'undefined';
const isUndefined = (x) => typeof x === 'undefined';
const isNil = (x) => typeof x === 'undefined' || x === null;
const isArray = (x) => Array.isArray(x);
const isEmpty = (xs) => xs.length === 0;
const isNumber = (x) => typeof x === 'number';
/* eslint-disable-next-line no-self-compare */
const defaultTo = (x, val) => (isNil(val) || val !== val ? x : val);
const equals = (a, b) => a === b;
const equalsBy = (f, a, b) => equals(f(a), f(b));

/*
 * Math
 */
const percentage = (b, a) => (a / b) * 100; // a is what percent of b ?
const max = (a, b) => Math.max(a, b);
const round = (x) => Math.round(x);
const roundTo = (n, x) => {
  const divisor = Math.pow(10, n);
  return Math.round(x * divisor) / divisor;
};
const compare = (a, b) => (a === b ? 0 : a < b ? -1 : 1);

/*
 * Lists
 */
const head = (xs) => xs[0];
const tail = (xs) => xs.slice(1, xs.length);
const length = (xs) => xs.length;
const copy = (xs) => xs.slice(0, xs.length);
const push = (b, a) => a.concat([b]);
const map = (fn, xs) => xs.map((x) => fn(x));
const reduce = (fn, acc, xs) => xs.reduce((a, x) => fn(a, x), acc);
const take = (n, xs) => xs.slice(0, n);
const drop = (n, xs) => xs.slice(n < 0 ? 0 : n, xs.length, xs);
const ascend = (fn) => (a, b) => compare(fn(a), fn(b));
const descend = (fn) => (b, a) => compare(fn(a), fn(b));
const sort = (fn, xs) => copy(xs).sort(fn);

/*
 * Strings
 */
const toUpperCase = (x) => x.toUpperCase();

/*
 * Objects
 */
const prop = (x, obj) => obj[x];
const merge = (b, a) => Object.assign({}, a, b);

const _ = {
  isDefined,
  isUndefined,

  noop,
  always,
  on: on,
  pipe,
  when: curry(when),
  applyTo: applyTo,
  not: not,
  curry,

  isNil,
  isArray,
  isEmpty,
  isNumber,
  defaultTo: curry(defaultTo),
  equals: curry(equals),
  equalsBy: curry(equalsBy),

  percentage: curry(percentage),
  max: curry(max),
  round,
  roundTo: curry(roundTo),
  compare,

  head,
  tail,
  length,
  copy: copy,
  push: curry(push),
  map: curry(map),
  reduce: curry(reduce),
  take: curry(take),
  drop: curry(drop),
  ascend,
  descend,
  sort: curry(sort),

  toUpperCase,

  prop: curry(prop),
  merge: curry(merge),
};

export default _;
