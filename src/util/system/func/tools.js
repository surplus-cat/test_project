export function dataURLtoBlob(dataurl) {
  let arr = dataurl.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

export function conversion(timestamp) {
  return new Date(timestamp).getMonth() + 1 + '.' + new Date(timestamp).getDate();
}

export function toThousands(s, n) {
  // 数据自带% 则不处理
  if (s.toString().includes("%")) return s;
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d.-]/g, "")).toFixed(n) + "";
  let l = s.split(".")[0].split("").reverse();
  let r = s.split(".")[1];
  let t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "");
  }
  if (r > 0) {
    return (t.split("").reverse().join("") + "." + r).replace(/0$/, '');
  } else {
    return t.split("").reverse().join("");
  }
}

export function diff(obj1, obj2) {
  var o1 = obj1 instanceof Object;
  var o2 = obj2 instanceof Object;
  if (!o1 || !o2) { /*  判断不是对象  */
    return obj1 === obj2;
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (var attr in obj1) {
    var t1 = obj1[attr] instanceof Object;
    var t2 = obj2[attr] instanceof Object;
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr]);
    } else if (obj1[attr] !== obj2[attr]) {
      return false;
    }
  }
  return true;
}

export function toTenThousands(num) {
  if (num === null) return '-';
  let digit = Math[num > 0 ? "floor" : "ceil"](num);
  if (digit.toString().length >= 3) {
    // let digit = (num / 10000).toString();
    // let index = digit.indexOf('.') + 2;
    // if (digit.indexOf('.') > -1) {
    //   return digit.substr(0, index + 1);
    // }
    return (digit / 10000).toFixed(2);
  }
  return 0;
}

export function calMax(arr) {
  let max = Math.max(...arr);
  let bits = Math.pow(5, max.toFixed().length);
  let maxInt = Math.round(max / bits) + 1;
  let maxval = maxInt * bits;
  // if (max < 1) {
  //   maxval = maxint * 5;
  // }
  return maxval;
}

export function toMax(arr) {
  let max = Math.max(...arr);
  let maxInt = Math.ceil(max * 10) / 10;
  return maxInt;
}

export function toMin(arr) {
  let min = Math.min(...arr);
  let minInt = Math.floor(min * 10) / 10;
  return minInt;
}

export function getBeforeDate(n) {
  var d = new Date();
  var mon = d.getMonth() + 1;
  var day = d.getDate();
  if (day <= n) {
    if (mon > 1) {
      mon = mon - 1;
    } else {
      mon = 12;
    }
  }
  d.setDate(d.getDate() + n); // 很重要，+n取得是前一天的时间
  mon = d.getMonth() + 1;
  day = d.getDate();
  // let s = (mon < 10 ? ('0' + mon) : mon) + '.' + (day < 10 ? ('0' + day) : day)
  let s = `${mon}.${day}`;
  return s;
}

let timeout = null;
export function debounce(fn, wait) {
  if (timeout !== null) clearTimeout(timeout);
  timeout = setTimeout(fn, wait);
}

export function dispose(int) {
  return int || 0;
}

export function debounceDup(fn, ms) {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null;
    }, ms);
  }
};

export function getTime(timestamp) {
  var time = new Date(timestamp);
  var y = time.getFullYear(); // 年
  var m = zeroBu(time.getMonth() + 1); // 月
  var d = zeroBu(time.getDate()); // 日
  var h = zeroBu(time.getHours()); // 时
  var mm = zeroBu(time.getMinutes()); // 分
  var s = zeroBu(time.getSeconds()); // 秒
  var times = y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
  return times;
}

export function gainTime(timestamp) {
  var time = new Date(timestamp);
  var y = time.getFullYear(); // 年
  var m = zeroBu(time.getMonth() + 1); // 月
  var d = zeroBu(time.getDate()); // 日
  var times = y + "." + m + "." + d;
  return times;
}

// 补零函数
function zeroBu(n) {
  if (n < 10) {
    return '0' + n;
  } else {
    return n;
  }
}

export function format(num) {
  return num ? Number(num).toLocaleString('en-US') : '';
}

export function formatTwoDigit(num) {
  return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(num);
}

// 生成随机hash 默认长度 24
export function createHash (hashLength) {
  return Array.from(Array(Number(hashLength) || 24), () => Math.floor(Math.random() * 36).toString(36)).join('');
}

let countDecimals = function (num) {
  var len = 0;
  try {
    num = Number(num);
    var str = num.toString().toUpperCase();
    if (str.split('E').length === 2) {
      var isDecimal = false;
      if (str.split('.').length === 2) {
        str = str.split('.')[1];
        if (parseInt(str.split('E')[0]) !== 0) {
          isDecimal = true;
        }
      }
      let x = str.split('E');
      if (isDecimal) {
        len = x[0].length;
      }
      len -= parseInt(x[1]);
    } else if (str.split('.').length === 2) {
      if (parseInt(str.split('.')[1]) !== 0) {
        len = str.split('.')[1].length;
      }
    }
  } catch (e) {
    throw e;
  } finally {
    if (isNaN(len) || len < 0) {
      len = 0;
    }
  }
  return len;
};
let convertToInt = function (num) {
  num = Number(num);
  var newNum = num;
  var times = countDecimals(num);
  let tempNum = num.toString().toUpperCase();
  if (tempNum.split('E').length === 2) {
    newNum = Math.round(num * Math.pow(10, times));
  } else {
    newNum = Number(tempNum.replace(".", ""));
  }
  return newNum;
};
let getCorrectResult = function (type, num1, num2, result) {
  let tempResult = 0;
  switch (type) {
    case "add":
      tempResult = num1 + num2;
      break;
    case "sub":
      tempResult = num1 - num2;
      break;
    case "div":
      tempResult = num1 / num2;
      break;
    case "mul":
      tempResult = num1 * num2;
      break;
  }
  if (Math.abs(result - tempResult) > 1) {
    return tempResult;
  }
  return result;
};
// 加法
export function accAdd(num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  var dec1, dec2, times;
  try { dec1 = countDecimals(num1) + 1; } catch (e) { dec1 = 0; }
  try { dec2 = countDecimals(num2) + 1; } catch (e) { dec2 = 0; }
  times = Math.pow(10, Math.max(dec1, dec2));
  var result = (this.accMul(num1, times) + this.accMul(num2, times)) / times;
  return getCorrectResult("add", num1, num2, result);
}
// 减法
export function accSub(num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  var dec1, dec2, times;
  try { dec1 = countDecimals(num1) + 1; } catch (e) { dec1 = 0; }
  try { dec2 = countDecimals(num2) + 1; } catch (e) { dec2 = 0; }
  times = Math.pow(10, Math.max(dec1, dec2));
  var result = Number((this.accMul(num1, times) - this.accMul(num2, times)) / times);
  return getCorrectResult("sub", num1, num2, result);
}
// 除法
export function accDiv(num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  let t1 = 0;
  let t2 = 0;
  let dec1, dec2;
  try { t1 = countDecimals(num1); } catch (e) { }
  try { t2 = countDecimals(num2); } catch (e) { }
  dec1 = convertToInt(num1);
  dec2 = convertToInt(num2);
  var result = this.accMul((dec1 / dec2), Math.pow(10, t2 - t1));
  return getCorrectResult("div", num1, num2, result);
}
// 乘法
export function accMul(num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  let times = 0;
  let s1 = num1.toString();
  let s2 = num2.toString();
  try { times += countDecimals(s1); } catch (e) { }
  try { times += countDecimals(s2); } catch (e) { }
  var result = convertToInt(s1) * convertToInt(s2) / Math.pow(10, times);
  return getCorrectResult("mul", num1, num2, result);
}

/**
 * 判断此对象是否是Object类型
 * @param {Object} obj
 */
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
/**
 * 判断此类型是否是Array类型
 * @param {Array} arr
 */
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
};
/**
 *  深度比较两个对象是否相同
 * @param {Object} oldData
 * @param {Object} newData
 */
export function equalsObj(oldData, newData) {
  // 类型为基本类型时,如果相同,则返回true
  if (oldData === newData) return true;
  if (isObject(oldData) && isObject(newData) && Object.keys(oldData).length === Object.keys(newData).length) {
    // 类型为对象并且元素个数相同

    // 遍历所有对象中所有属性,判断元素是否相同
    for (const key in oldData) {
      if (oldData.hasOwnProperty(key)) {
        if (!equalsObj(oldData[key], newData[key])) {
          // 对象中具有不相同属性 返回false
          return false;
        }
      }
    }
  } else if (isArray(oldData) && isArray(oldData) && oldData.length === newData.length) {
    // 类型为数组并且数组长度相同

    for (let i = 0, length = oldData.length; i < length; i++) {
      if (!equalsObj(oldData[i], newData[i])) {
        // 如果数组元素中具有不相同元素,返回false
        return false;
      }
    }
  } else {
    // 其它类型,均返回false
    return false;
  }

  // 走到这里,说明数组或者对象中所有元素都相同,返回true
  return true;
}

// 处理数组有重复的数据
export function deal(arr, type) {
  let i = 1;
  arr.reduce((t, v) => {
    if (t.find((k) => k[type] === v[type])) {
      if (!t[t.length - 1][type].includes(v[type])) {
        i = 1;
      }
      t.forEach(k => {
        if (k[type].includes(v[type])) {
          i = Number(k[type].replace(/\D/g, '')) + 1;
        }
      });
      v[type] = `${v[type]}${i}`;
      i++;

      t.push(v);
    } else {
      t.push(v);
    }

    return t;
  }, []);
  return arr;
}
// 转换为千位制  10000 => 10,000
export function formatCount(count) {
  if (count) {
    return (Number(count) + "").replace(
      /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,
      "$&,"
    );
  } else {
    return 0;
  }
}
