import _ from './_';

describe('_', () => {
  describe('isDefined(x)', () => {
    it('returns false for undefined', () => {
      expect(_.isDefined(undefined)).toBe(false);
    });
    it('returns false for void 0', () => {
      expect(_.isDefined(void 0)).toBe(false);
    });
    it('returns true for every other value', () => {
      expect(_.isDefined(false)).toBe(true);
      expect(_.isDefined(null)).toBe(true);
      expect(_.isDefined(NaN)).toBe(true);
      expect(_.isDefined(0)).toBe(true);
      expect(_.isDefined('')).toBe(true);
      expect(_.isDefined({})).toBe(true);
      expect(_.isDefined([])).toBe(true);
    });
  });

  describe('isUndefined(x)', () => {
    it('returns true for undefined', () => {
      expect(_.isUndefined(undefined)).toBe(true);
    });
    it('returns true for void 0', () => {
      expect(_.isUndefined(void 0)).toBe(true);
    });
    it('returns false for every other value', () => {
      expect(_.isUndefined(false)).toBe(false);
      expect(_.isUndefined(null)).toBe(false);
      expect(_.isUndefined(NaN)).toBe(false);
      expect(_.isUndefined(0)).toBe(false);
      expect(_.isUndefined('')).toBe(false);
      expect(_.isUndefined({})).toBe(false);
      expect(_.isUndefined([])).toBe(false);
    });
  });

  describe('noop()', () => {
    it('is a function that does nothing and returns undefined', () => {
      expect(_.noop(1)).toBe(undefined);
    });
  });

  describe('always(x)', () => {
    it('returns a function that returns the object initially supplied', () => {
      const always42 = _.always(42);
      expect(always42()).toBe(42);
      expect(always42(10)).toBe(42);
      expect(always42(false)).toBe(42);
    });
  });

  describe('on(f, g)', () => {
    it('returns a function that takes (a, b) and composes as follow f(g(a), g(b)', () => {
      const add = (a, b) => a + b;
      const square = (x) => x * x;
      expect(_.on(add, square)(2, 4)).toBe(20);
      expect(_.on(add, square)(3, 5)).toBe(add(square(3), square(5)));
    });
  });

  describe('pipe(f1, f2, .., fn)', () => {
    it('is a variadic function', () => {
      expect(typeof _.pipe).toBe('function');
      expect(_.pipe.length).toBe(0);
    });

    it('performs left-to-right function composition', () => {
      //  f :: (String, Number?) -> ([Number] -> [Number])
      const f = _.pipe(
          (x) => x + 'a',
          (x) => x + 'b',
          (x) => x + 'c',
      );

      expect(f.length).toBe(1);
      expect(f('')).toBe('abc');
    });
  });

  describe('when(pred, onTrue, x)', () => {
    const isNumber = (x) => typeof x === 'number';
    const add = (a) => (b) => a + b;

    it('calls the whenTrue function if the validator returns a truthy value', () => {
      expect(_.when(isNumber, add(1), 2)).toBe(3);
    });

    it('returns the argument unmodified if the validator returns a falsy value', () => {
      expect(_.when(isNumber, add(1), 'hello')).toBe('hello');
    });

    it('is a curried function', () => {
      expect(_.when(isNumber, add(1), 10)).toBe(_.when(isNumber, add(1))(10));
      expect(_.when(isNumber, add(1), 10)).toBe(_.when(isNumber)(add(1), 10));
    });
  });

  describe('applyTo(x)(f)', () => {
    const add1 = (x) => x + 1;

    it('applies function f to value x', () => {
      expect(_.applyTo(2)(add1)).toBe(3);
      expect(_.applyTo(1)(add1)).toBe(add1(1));
    });
  });

  describe('not(f)(x)', () => {
    const equals1 = (x) => x === 1;

    it('negates function', () => {
      expect(_.not(equals1)(1)).toBe(!equals1(1));
    });
  });

  describe('curry(fn)', () => {
    it('curries a single value', () => {
      const f = _.curry((a, b, c, d) => (a + b * c) / d); // f(12, 3, 6, 2) == 15
      const g = f(12);
      expect(g(3, 6, 2)).toBe(15);
    });

    it('curries multiple values', () => {
      const f = _.curry((a, b, c, d) => (a + b * c) / d); // f(12, 3, 6, 2) == 15
      const g = f(12, 3);
      expect(g(6, 2)).toBe(15);
      const h = f(12, 3, 6);
      expect(h(2)).toBe(15);
    });

    it('allows further currying of a curried function', () => {
      const f = _.curry((a, b, c, d) => (a + b * c) / d); // f(12, 3, 6, 2) == 15
      const g = f(12);
      expect(g(3, 6, 2)).toBe(15);

      const h = g(3);
      expect(h(6, 2)).toBe(15);
      expect(g(3, 6)(2)).toBe(15);
    });
  });

  describe('isNil(x)', () => {
    it('returns true for undefined', () => {
      expect(_.isNil(undefined)).toBe(true);
    });
    it('returns true for void 0', () => {
      expect(_.isNil(void 0)).toBe(true);
    });
    it('returns true for null', () => {
      expect(_.isNil(null)).toBe(true);
    });
    it('returns false for every other value', () => {
      expect(_.isNil(false)).toBe(false);
      expect(_.isNil(true)).toBe(false);
      expect(_.isNil(NaN)).toBe(false);
      expect(_.isNil(new Date())).toBe(false);
      expect(_.isNil(/(?:.)/)).toBe(false);
      expect(_.isNil(0)).toBe(false);
      expect(_.isNil('')).toBe(false);
      expect(_.isNil([])).toBe(false);
      expect(_.isNil({})).toBe(false);
      expect(_.isNil(function() {})).toBe(false);
      expect(_.isNil(() => {})).toBe(false);
    });
  });

  describe('isArray(x)', () => {
    it('returns true for array only', () => {
      expect(_.isArray([])).toBe(true);
      expect(_.isArray([[]])).toBe(true);
      expect(_.isArray([1])).toBe(true);
    });
    it('returns false for every other value', () => {
      expect(_.isArray(false)).toBe(false);
      expect(_.isArray(true)).toBe(false);
      expect(_.isArray(null)).toBe(false);
      expect(_.isArray(NaN)).toBe(false);
      expect(_.isArray(new Date())).toBe(false);
      expect(_.isArray(/(?:.)/)).toBe(false);
      expect(_.isArray(0)).toBe(false);
      expect(_.isArray('')).toBe(false);
      expect(_.isArray({})).toBe(false);
      expect(_.isArray(function() {})).toBe(false);
      expect(_.isArray(() => {})).toBe(false);
    });
  });
  describe('isNumber(x)', () => {
    it('returns true for numbers', () => {
      expect(_.isNumber(0)).toBe(true);
      expect(_.isNumber(0.1)).toBe(true);
      expect(_.isNumber(1)).toBe(true);
      expect(_.isNumber(-1)).toBe(true);
    });
    it('returns true for infinity', () => {
      expect(_.isNumber(Infinity)).toBe(true);
      expect(_.isNumber(-Infinity)).toBe(true);
    });
    it('returns true for NaN', () => {
      expect(_.isNumber(NaN)).toBe(true);
    });
    it('returns false for every other value', () => {
      expect(_.isNumber(false)).toBe(false);
      expect(_.isNumber(true)).toBe(false);
      expect(_.isNumber(null)).toBe(false);
      expect(_.isNumber([])).toBe(false);
      expect(_.isNumber(/(?:.)/)).toBe(false);
      expect(_.isNumber('')).toBe(false);
      expect(_.isNumber('1')).toBe(false);
      expect(_.isNumber(new Date())).toBe(false);
      expect(_.isNumber({})).toBe(false);
      expect(_.isNumber(function() {})).toBe(false);
      expect(_.isNumber(() => {})).toBe(false);
    });
  });

  describe('isEmpty(xs)', () => {
    it('returns true if a list is empty', () => {
      expect(_.isEmpty([])).toBe(true);
      expect(_.isEmpty([1])).toBe(false);
    });
    it('returns true for empty string', () => {
      expect(_.isEmpty('')).toBe(true);
      expect(_.isEmpty(' ')).toBe(false);
    });
    it('throws for null and undefined', () => {
      expect(() => _.isEmpty(null)).toThrowError(TypeError);
      expect(() => _.isEmpty(undefined)).toThrowError(TypeError);
    });
  });

  describe('defaultTo(x, val)', () => {
    it('returns the default value if input is null, undefined or NaN', () => {
      const defaultTo1 = _.defaultTo(1);
      expect(defaultTo1(null)).toBe(1);
      expect(defaultTo1(undefined)).toBe(1);
      expect(defaultTo1(NaN)).toBe(1);
    });

    it('returns the input value if it is not null/undefined', () => {
      const defaultTo1 = _.defaultTo(1);
      expect(defaultTo1('a real value')).toBe('a real value');
    });

    it('returns the input value even if it is considered falsy', () => {
      const defaultTo1 = _.defaultTo(1);
      expect(defaultTo1('')).toBe('');
      expect(defaultTo1(0)).toBe(0);
      expect(defaultTo1(false)).toBe(false);
      expect(defaultTo1([])).toEqual([]);
    });

    it('is curried', () => {
      expect(_.defaultTo(1, null)).toEqual(_.defaultTo(1)(null));
    });
  });

  describe('equals(a, b)', () => {
    it('returns true if values are qeual', () => {
      expect(_.equals(1, 1)).toBe(true);
      expect(_.equals(1, '1')).toBe(false);
      expect(_.equals('a', 'a')).toBe(true);
      expect(_.equals(undefined, undefined)).toBe(true);
    });
  });

  describe('equalsBy(f, a, b)', () => {
    it('returns true if f applied to a equals f applied to b', () => {
      const toUpperCase = (x) => x.toUpperCase();
      expect(_.equalsBy(toUpperCase, 'a', 'A')).toBe(true);
      expect(_.equalsBy(toUpperCase, 'a', 'b')).toBe(false);
    });
  });

  describe('percentage(b, a)', () => {
    it('a is what percent of b ?', () => {
      expect(_.percentage(5, 2)).toBe((2 / 5) * 100);
    });

    it('is curried', () => {
      expect(_.percentage(2, 1)).toBe(_.percentage(2)(1));
    });
  });

  describe('max(a, b)', () => {
    it('returns the maximum value', () => {
      expect(_.max(1, 2)).toBe(2);
      expect(_.max(2, 1)).toBe(2);
    });
  });

  describe('round(x)', () => {
    it('rounds x', () => {
      expect(_.round(1.223)).toBe(1);
      expect(_.round(1.523)).toBe(2);
    });
  });

  describe('roundTo(n, x)', () => {
    it('rounds x to n decimals', () => {
      expect(_.roundTo(2, 1.223)).toBe(1.22);
      expect(_.roundTo(2, 1.225)).toBe(1.23);
      expect(_.roundTo(3, 1.225)).toBe(1.225);
      expect(_.roundTo(0, 1.225)).toBe(1);
    });

    it('is curried', () => {
      expect(_.roundTo(2, 1.223)).toEqual(_.roundTo(2)(1.223));
    });
  });

  describe('compare(a, b)', () => {
    it('returns -1 if a is lower than b', () => {
      expect(_.compare(1, 2)).toBe(-1);
    });
    it('returns 1 if a is greater than b', () => {
      expect(_.compare(2, 1)).toBe(1);
    });
    it('returns 0 if a is equal b', () => {
      expect(_.compare(1, 1)).toBe(0);
    });
  });

  describe('head(xs)', () => {
    it('returns the first element of an ordered collection', () => {
      expect(_.head([1, 2, 3])).toBe(1);
      expect(_.head([2, 3])).toBe(2);
      expect(_.head([3])).toBe(3);
      expect(_.head([])).toBe(undefined);

      expect(_.head('abc')).toBe('a');
      expect(_.head('bc')).toBe('b');
      expect(_.head('c')).toBe('c');
    });
  });

  describe('tail(xs)', () => {
    it('returns all but the first element of an ordered collection', () => {
      expect(_.tail([1, 2, 3])).toEqual([2, 3]);
      expect(_.tail([2, 3])).toEqual([3]);
      expect(_.tail([3])).toEqual([]);
      expect(_.tail([])).toEqual([]);
    });
  });

  describe('length(xs)', () => {
    it('works on lists', () => {
      expect(_.length([1, 2, 3])).toBe(3);
      expect(_.length([])).toBe(0);
    });
    it('works on strings', () => {
      expect(_.length('abc')).toBe(3);
      expect(_.length('')).toBe(0);
    });
  });

  describe('push(x, xs)', () => {
    it('appends x to xs', () => {
      expect(_.push(2, [1])).toEqual([1, 2]);
      expect(_.push(2, [])).toEqual([2]);
    });
    it('is not destructive', () => {
      const xs = [1, 2];
      const res = _.push(3, xs);
      expect(xs).toEqual([1, 2]);
      expect(res).toEqual([1, 2, 3]);
      expect(res).not.toBe(xs);
    });
  });

  describe('copy(xs)', () => {
    it('clones shallow arrays', () => {
      const list = [1, 2, 3];
      const clone = _.copy(list);
      list.pop();

      expect(list).not.toBe(clone);
      expect(clone).toEqual([1, 2, 3]);
    });
  });

  describe('map(fn, xs)', () => {
    const times2 = (x) => x * 2;
    const add1 = (x) => x + 1;
    const dec = (x) => x - 1;
    const functor = (a, b, c) => {
      if (b || c) {
        throw new Error('the functor must be called only with one argument');
      }
      return a;
    };

    it('maps simple functions over arrays', () => {
      expect(_.map(times2, [1, 2, 3, 4])).toEqual([2, 4, 6, 8]);
    });

    it('returns empty array for an empty-array input', () => {
      expect(_.map(times2, [])).toEqual([]);
    });

    it('the functor is called only with one argument', () => {
      expect(_.map(functor, [0, 0, 0])).toEqual([0, 0, 0]);
    });

    it('is a curried function', () => {
      expect(_.map(add1)([1, 2, 3])).toEqual(_.map(add1, [1, 2, 3]));
    });
  });

  describe('reduce(fn, acc, xs)', () => {
    const add = (a, b) => a + b;
    const mult = (a, b) => a * b;
    const functor = (a, b, c, d) => {
      if (c || d) {
        throw new Error(
            'the functor must be called only with acc and item arguments',
        );
      }
      return a;
    };

    it('folds simple functions over arrays with the supplied accumulator', () => {
      expect(_.reduce(add, 0, [1, 2, 3, 4])).toBe(10);
      expect(_.reduce(mult, 1, [1, 2, 3, 4])).toBe(24);
    });

    it('returns the accumulator for an empty array', () => {
      expect(_.reduce(add, 0, [])).toBe(0);
    });

    it('the functor is called only with acc and item arguments', () => {
      expect(_.reduce(functor, 1, [0, 0])).toBe(1);
    });

    it('is a curried function', () => {
      expect(_.reduce(add)(0)([1, 2])).toBe(_.reduce(add, 0)([1, 2]));
      expect(_.reduce(add)(0)([1, 2])).toBe(_.reduce(add)(0, [1, 2]));
    });
  });

  describe('take(n, xs)', () => {
    it('takes only the first `n` elements from a list', () => {
      expect(_.take(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g'])).toEqual([
        'a',
        'b',
        'c',
      ]);
    });
    it('returns only as many as the array can provide', () => {
      expect(_.take(3, [1, 2])).toEqual([1, 2]);
      expect(_.take(Infinity, [1, 2, 3])).toEqual([1, 2, 3]);
      expect(_.take(3, [])).toEqual([]);
    });

    it('never returns the input array', () => {
      const xs = [1, 2, 3];

      expect(_.take(3, xs)).not.toBe(xs);
      expect(_.take(Infinity, xs)).not.toBe(xs);
      expect(_.take(-1, xs)).not.toBe(xs);
    });
    it('can operate on strings', () => {
      expect(_.take(3, 'Abcd')).toEqual('Abc');
      expect(_.take(2, 'Abcd')).toEqual('Ab');
      expect(_.take(1, 'Abcd')).toEqual('A');
      expect(_.take(0, 'Abcd')).toEqual('');
    });
  });

  describe('drop(n, xs)', () => {
    it('skips the first `n` elements from a list, returning the remainder', () => {
      expect(_.drop(3, ['a', 'b', 'c', 'd', 'e'])).toEqual(['d', 'e']);
    });
    it('returns an empty array if `n` is too large', () => {
      expect(_.drop(20, ['a', 'b', 'c', 'd', 'e', 'f', 'g'])).toEqual([]);
    });
    it('returns an equivalent list if `n` is <= 0', () => {
      expect(_.drop(0, [1, 2, 3])).toEqual([1, 2, 3]);
      expect(_.drop(-1, [1, 2, 3])).toEqual([1, 2, 3]);
      expect(_.drop(-Infinity, [1, 2, 3])).toEqual([1, 2, 3]);
    });
    it('never returns the input array', () => {
      const xs = [1, 2, 3];

      expect(_.drop(0, xs)).not.toBe(xs);
      expect(_.drop(-1, xs)).not.toBe(xs);
    });
  });

  describe('ascend(fn)', () => {
    it('factors an ascending comparator function', () => {
      const comparator = _.ascend((x) => x);
      expect(typeof comparator).toBe('function');
      expect(comparator(1, 2)).toBe(-1);
      expect(comparator(2, 1)).toBe(1);
      expect(comparator(1, 1)).toBe(0);
    });
    it('is compatible with sort', () => {
      expect([1, 3, 2].sort(_.ascend((x) => x))).toEqual([1, 2, 3]);
    });
    it('compare upper cases', () => {
      const ascendUpper = _.ascend((x) => x.toUpperCase());
      expect(['a', 'D', 'c', 'B'].sort(ascendUpper)).toEqual([
        'a',
        'B',
        'c',
        'D',
      ]);
    });
  });

  describe('descend(fn)', () => {
    it('factors an ascending comparator function', () => {
      const comparator = _.descend((x) => x);
      expect(typeof comparator).toBe('function');
      expect(comparator(1, 2)).toBe(1);
      expect(comparator(2, 1)).toBe(-1);
      expect(comparator(1, 1)).toBe(0);
    });
    it('is compatible with sort', () => {
      expect([1, 3, 2].sort(_.descend((x) => x))).toEqual([3, 2, 1]);
    });
    it('compare upper cases', () => {
      const descendUpper = _.descend((x) => x.toUpperCase());
      expect(['a', 'D', 'c', 'B'].sort(descendUpper)).toEqual([
        'D',
        'c',
        'B',
        'a',
      ]);
    });
  });

  describe('sort(fn)', () => {
    it('sorts a list by a comparator function', () => {
      const compareCaseInsensitive = (a, b) => {
        if (a.toUpperCase() < b.toUpperCase()) {
          return -1;
        }
        if (a.toUpperCase() > b.toUpperCase()) {
          return 1;
        }
        return 0;
      };

      expect(_.sort(compareCaseInsensitive, ['a', 'D', 'c', 'B'])).toEqual([
        'a',
        'B',
        'c',
        'D',
      ]);
    });
  });

  describe('toUpperCase(s)', () => {
    it('returns the upper-case equivalent of the input string', () => {
      expect(_.toUpperCase('abc')).toBe('ABC');
    });
  });

  describe('prop(x, obj)', () => {
    it('returns a function that fetches the appropriate property', () => {
      expect(_.prop('name', {name: 'Fred', age: 23})).toBe('Fred');
      expect(_.prop('id', {x: 23, id: 1})).toBe(1);
    });

    it('is a curried function', () => {
      expect(_.prop('a', {a: 1})).toEqual(_.prop('a')({a: 1}));
    });
  });

  describe('merge(b, a)', () => {
    it('merges two objects', () => {
      const a = {w: 1, x: 2};
      const b = {y: 3, z: 4};
      expect(_.merge(b, a)).toEqual({w: 1, x: 2, y: 3, z: 4});
    });
    it('overrides properties in the SECOND object', () => {
      const a = {w: 1, x: 2};
      const b = {w: 100, y: 3, z: 4};
      expect(_.merge(b, a)).toEqual({w: 100, x: 2, y: 3, z: 4});
    });
    it('is not destructive', () => {
      const a = {w: 1, x: 2};
      const res = _.merge({x: 5}, a);
      expect(a).not.toBe(res);
      expect(res).toEqual({w: 1, x: 5});
    });
  });
});
