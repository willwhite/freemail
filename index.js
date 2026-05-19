var fs = require('fs');
var tldjs = require('tldjs');

var disposable = fs.readFileSync(__dirname + '/data/disposable.txt').toString().split('\n');
var free = fs.readFileSync(__dirname + '/data/free.txt').toString().split('\n').concat(disposable);
var reserved = fs.readFileSync(__dirname + '/data/reserved.txt').toString().split('\n').filter(Boolean);

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

function isReserved(email) {
    if (typeof email !== 'string') throw new TypeError('email must be a string');
    var host = email.split('@').pop().toLowerCase();
    // tldjs returns null for single-label hosts such as localhost, so fall back to the raw host.
    var domain = tldjs.getDomain(host) || host;
    if (reserved.indexOf(domain) !== -1) return true;
    return reserved.indexOf(domain.split('.').pop()) !== -1;
}

module.exports = {
    isFree: isFree,
    isDisposable: isDisposable,
    isReserved: isReserved
};
