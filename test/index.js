'use strict';

const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');
const {inspect} = require('util');
const test = require('@charmander/test')(module);

const readNumeric = require('../');

const truncate = text =>
	text.replace(/(.{1,4}?)\1{6,}/g, '$1$1…$1$1');

test.group('decimal round trips', test => {
	const testRows = fs.readFileSync(path.join(__dirname, 'decimal.csv'), 'utf8').match(/.+/g).slice(1);

	for (const row of testRows) {
		const [testHex, expected] = row.split(',');

		test(inspect(expected), () => {
			assert.equal(readNumeric(Buffer.from(testHex, 'hex')), expected);
		});
	}
});

test.group('consistent interpretations', test => {
	const testRows = fs.readFileSync(path.join(__dirname, 'binary.csv'), 'utf8').match(/.+/g).slice(1);

	for (const row of testRows) {
		const [testHex, expected] = row.split(',');

		test(`${truncate(testHex)} ('${truncate(expected)}')`, () => {
			assert.equal(readNumeric(Buffer.from(testHex, 'hex')), expected);
		});
	}
});

test.group('errors', test => {
	test('trailing data', () => {
		assert.throws(() => {
			readNumeric(Buffer.from('00010000000000000001ff', 'hex'));
		}, /RangeError: Invalid numeric length/);
	});
});
