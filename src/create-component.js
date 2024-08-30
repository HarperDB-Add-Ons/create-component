#!/usr/bin/env node

const { input, select, Separator } = require('@inquirer/prompts');
const fs = require('node:fs');
const path = require('node:path');

const templates = path.join(__dirname, '../templates')

async function createComponent() {
	const componentType = await select({
		message: 'What type of component would you like to create?',
		choices: [
			{ name: 'Next.js', value: 'nextjs' },
			new Separator('Coming Soon:'),
			{ name: 'GraphQL', value: 'graphql-schema', disabled: true },
			{ name: 'jsResource', value: 'js-resource', disabled: true },
			{ name: 'Protocol Extension Component', value: 'protocol-extension-component', disabled: true },
			{ name: 'Resource Extension Component', value: 'resource-extension-component', disabled: true },
		],
	});

	const directory = process.argv[2] ?? await input({ message: 'What is the component directory?'});

	fs.cpSync(path.join(templates, componentType), directory, { recursive: true });
}

createComponent().then(() => {
	process.exit(0);
}).catch((error) => {
	console.error(error);
	process.exit(1);
});