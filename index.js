var fs = require('fs');
var tldjs = require('tldjs');

var disposable = new Set(fs.readFileSync(__dirname + '/data/disposable.txt').toString().split('\n'));
var free = new Set(fs.readFileSync(__dirname + '/data/free.txt').toString().split('\n').concat(disposable));

function isFree(email) {
    if (typeof email !== 'string') throw new TypeError('email must be a string');
    var domain = tldjs.getDomain(email.split('@').pop());
    return free.has(domain);
}

function isDisposable(email) {
    if (typeof email !== 'string') throw new TypeError('email must be a string');
    var domain = tldjs.getDomain(email.split('@').pop());
    return disposable.has(domain);
}

module.exports = {
    isFree: isFree,
    isDisposable: isDisposable
};
