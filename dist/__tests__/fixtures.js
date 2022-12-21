'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fixturePath(name) {
    return 'fixtures/' + name + '.css';
}

function readFixture(name) {
    return _fs2.default.readFileSync(fixturePath(name), 'utf8');
}

function testFixture(t, name) {
    var pluginOpts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var postcssOpts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    postcssOpts.from = fixturePath(name);
    var expected = readFixture(name + '.expected');
    return (0, _postcss2.default)([(0, _2.default)(pluginOpts)]).process(readFixture(name), postcssOpts).then(function (result) {
        t.deepEqual(result.css, expected);
        t.deepEqual(result.warnings().length, 0);
    });
}

(0, _ava2.default)('Transforms rgb() with RGB range 0-255 input', function (t) {
    return testFixture(t, 'rgb-0-255');
});

(0, _ava2.default)('Transforms rgb() with percentage input', function (t) {
    return testFixture(t, 'rgb-percentage');
});

(0, _ava2.default)('Transforms rgb() with number input instead of integer', function (t) {
    return testFixture(t, 'rgb-number-to-integer');
});

(0, _ava2.default)('Transforms rgb() using new comma-separated syntax', function (t) {
    return testFixture(t, 'alternative-syntax');
});

(0, _ava2.default)('Actual rgb() is not affected', function (t) {
    return testFixture(t, 'actual-syntax');
});

(0, _ava2.default)('Wrong rgb() does not stop the plugin', function (t) {
    return testFixture(t, 'wrong-written');
});