#!/usr/bin/env node

const util = require('node:util');
const pkg = require('../package.json');
const { createComponent } = require('./create-component');

const { values } = util.parseArgs({
	options: {
		help: {
			type: 'boolean',
			default: false,
		},
		version: {
			type: 'boolean',
			default: false,
		},
	},
	allowPositionals: true
});

if (values.version) {
	console.log(pkg.version);
	process.exit(0);
}

if (values.help) {
	const help = `Usage: npx @harperdb/create-component <component-directory> [options]

Options:
  --help      Show this help message
  --version   Show CLI version
`;

	console.log(help);
	process.exit(0);
}

const controller = new AbortController();

process.on('beforeExit', () => {
	controller.abort();
});

createComponent(controller).then(() => {
	process.exit(0);
}).catch((error) => {
	if (error instanceof Error) {
		console.error(error.message);
	}
	process.exit(1);
});