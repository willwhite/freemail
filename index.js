var fs = require('fs');
var tldjs = require('tldjs');
var crypto = require("crypto");

var disposable = fs.readFileSync(__dirname + '/data/disposable.txt').toString().split('\n');
var free = fs.readFileSync(__dirname + '/data/free.txt').toString().split('\n').concat(disposable);
var withTrDomains = fs.readFileSync(__dirname +"/data/triblio_added.txt").toString().split("\n").concat(free);
var sha1Domains = fs.readFileSync(__dirname+ "/data/mailinator_sha1.txt").toString().split("\n");


function isFree(email) {
    if(!email) return true; // handle undefined and null value to avoid throw error;
    if (typeof email !== 'string') throw new TypeError('email must be a string');
    var rawDomain = email.split('@').pop();
    var formattedDomain = tldjs.getDomain(rawDomain);

    var domain = (formattedDomain) ? formattedDomain : rawDomain;

    return (withTrDomains.indexOf(domain) !== -1 || _isInShaDomains(domain));
}

function isDisposable(email) {
    if (typeof email !== 'string') throw new TypeError('email must be a string');
    var domain = tldjs.getDomain(email.split('@').pop());
    return disposable.indexOf(domain) !== -1;
}

module.exports = {
    isFree: isFree,
    isDisposable: isDisposable
};


function _isInShaDomains(domain){
  return sha1Domains.indexOf(sha1(domain)) !== -1;
}

function sha1(string){
  var shasum = crypto.createHash('sha1');
  shasum.update(string);
  return shasum.digest('hex');
}