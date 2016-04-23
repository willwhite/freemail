var fs = require('fs');
var tldjs = require('tldjs');

var disposable = fs.readFileSync(__dirname + '/data/disposable.txt').toString().split('\n');
var free = fs.readFileSync(__dirname + '/data/free.txt').toString().split('\n').concat(disposable);

function isFree(email) {
    if (typeof email !== 'string') throw new TypeError('email must be a string');
    var domain = tldjs.getDomain(email.split('@').pop());
    return free.indexOf(domain) !== -1;
}

function isDisposable(email) {
    if (typeof email !== 'string') throw new TypeError('email must be a string');
    var domain = tldjs.getDomain(email.split('@').pop());
    return disposable.indexOf(domain) !== -1;
}

// Return a copy of the full list domains serving free email accounts, including disposable email accounts
function freeList() {
  return free.slice();
}

// Return a copy of the full list of domains serving disposable email accounts
function disposableList() {
  return disposable.slice();
}

module.exports = {
    isFree: isFree,
    isDisposable: isDisposable,
    freeList: freeList,
    disposableList: disposableList
};
