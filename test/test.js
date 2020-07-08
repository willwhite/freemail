var test = require('tape');
var freemail = require('..');

test('gmail.com should be free', function(t) {
    t.plan(1);
    t.equal(freemail.isFree('smith@gmail.com'), true);
});

test('gmail.com should be free with domain only', function(t) {
    t.plan(1);
    t.equal(freemail.isFree('gmail.com'), true);
});

test('fb.com should not be free', function(t) {
    t.plan(1);
    t.equal(freemail.isFree('fb.com'), false);
});

test('mailinater.com should be free', function(t) {
    t.plan(1);
    t.equal(freemail.isFree('smith@mailinater.com'), true);
});

test('mailinater.com should be disposable', function(t) {
    t.plan(1);
    t.equal(freemail.isDisposable('smith@mailinater.com'), true);
});

test('gmail.com should not be disposable', function(t) {
    t.plan(1);
    t.equal(freemail.isDisposable('smith@gmail.com'), false);
});

test('freeList() should return an array', function(t) {
    t.plan(1);
    t.equal(Array.isArray(freemail.freeList()), true);
});

test('freeList() should return an array containing gmail.com', function(t) {
    t.plan(1);
    t.notEqual(freemail.freeList().indexOf('gmail.com'), -1);
});

test('freeList() should return an array containing mailinater.com', function(t) {
    t.plan(1);
    t.notEqual(freemail.freeList().indexOf('mailinater.com'), -1);
});

test('disposableList() should return an array', function(t) {
    t.plan(1);
    t.equal(Array.isArray(freemail.disposableList()), true);
});

test('disposableList() should return an array containing mailinater.com', function(t) {
    t.plan(1);
    t.notEqual(freemail.disposableList().indexOf('mailinater.com'), -1);
});

test('disposableList() should return an array not containing gmail.com', function(t) {
    t.plan(1);
    t.equal(freemail.disposableList().indexOf('gmail.com'), -1);
});
