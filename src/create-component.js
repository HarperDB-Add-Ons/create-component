#!/usr/bin/env node

const { select, Separator } = require('@inquirer/prompts');

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

	console.log(`Creating a ${componentType} component...`);
}

createComponent().then(() => {
	process.exit(0);
}).catch((error) => {
	console.error(error);
	process.exit(1);
});