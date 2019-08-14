'use strict';

const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');
const util = require('util');
const test = require('@charmander/test')(module);

const readNumeric = require('../');

const testRows = fs.readFileSync(path.join(__dirname, 'decimal.csv'), 'utf8').match(/.+/g);

for (const row of testRows) {
	const [testHex, expected] = row.split(',');

	test(util.format('decimal %O round trip', expected), () => {
		assert.equal(readNumeric(Buffer.from(testHex, 'hex')), expected);
	});
}
