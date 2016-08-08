var fs = require('fs');
var tldjs = require('tldjs');

var disposable = load('/data/disposable.txt');
var free = extend(load('/data/free.txt'), disposable);

function isFree(email) {
    if (typeof email !== 'string') throw new TypeError('email must be a string');
    var split = email.split('@');
    var domain = getDomain(split[1] || split[0]);
    return !!(domain && free[domain]);
}

function isDisposable(email) {
    if (typeof email !== 'string') throw new TypeError('email must be a string');
    var split = email.split('@');
    var domain = getDomain(split[1] || split[0]);
    return !!(domain && disposable[domain]);
}

function getDomain(host) {
  var split = host.split('.');
  // Performance optimization for .com TLD
  if (split.length >= 2 && split[split.length - 1] === 'com') {
    return split.slice(-2).join('.');
  }
  return tldjs.getDomain(host);
}

function load(path) {
  return fs.readFileSync(__dirname + path, 'utf8')
    .split('\n')
    .reduce(function(res, cur) {
      res[cur] = true;
      return res;
    }, {});
}

function extend(a, b) {
  var res = {};
  var key;

  for (key in a) {
    res[key] = a[key];
  }

  for (key in b) {
    res[key] = b[key];
  }

  return res;
}

module.exports = {
    isFree: isFree,
    isDisposable: isDisposable
};
