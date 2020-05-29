const cache = new WeakMap();

function countOwnKeys(obj) {
  if (cache.has(obj)) {
    return [cache.get(obj), 'cached'];
  } else {
    const count = Object.keys(obj).length;
    cache.set(obj, count);
    return [count, 'computed'];
  }
}

let obj = { name: 'kaka', age: '30' };

console.log(countOwnKeys(obj));

console.log(countOwnKeys(obj));

obj = null;
