import * as fs from 'fs';
const tldjs = require('tldjs');

const disposable = fs.readFileSync(__dirname + '/data/disposable.txt').toString().split('\n');
const free = fs.readFileSync(__dirname + '/data/free.txt').toString().split('\n').concat(disposable);

function isFree(email: string) {
    if (typeof email !== 'string') throw new TypeError('email must be a string');
    const parsedEmail = String(email.split('@').pop());
    const domain = tldjs.getDomain(parsedEmail);
    return free.indexOf(String(domain)) !== -1;
}

function isDisposable(email: string) {
    if (typeof email !== 'string') throw new TypeError('email must be a string');
    const parsedEmail = String(email.split('@').pop());
    const domain = tldjs.getDomain(parsedEmail);
    return disposable.indexOf(String(domain)) !== -1;
}

module.exports = {
    isFree: isFree,
    isDisposable: isDisposable
};
