#!/usr/bin/env -S node --experimental-modules

import path from 'path';
import resolve from 'resolve';
import glob from 'glob';
import fs from 'fs';

const moduleDeclRegex = /^((?:import|export)\s[^'";]*['"])(\.\.?\/[^'"]+)(['"];)$/gm;

const codePaths = glob.sync('**/*.mjs');

for (const codePath of codePaths) {
	const origCode = fs.readFileSync(codePath, 'utf8');
	const baseDir = path.dirname(codePath);

	const newCode = origCode.replace(moduleDeclRegex, (_, start, origTarget, end) => {
		const newTarget = rewriteTarget(origTarget, baseDir);

		return `${start}${newTarget}${end}`;
	});

	if (newCode !== origCode)
		fs.writeFileSync(codePath, newCode, 'utf8');
}

function rewriteTarget(original, baseDir) {
	const absolute = resolve.sync(original, {
		basedir: baseDir,
		extensions: ['.js', '.node', '.mjs', '.cjs', '.json'],
	});

	const relative = path.relative(baseDir, absolute);

	return `./${relative}`.replace(/^\.\/\.\./, '..');
}
