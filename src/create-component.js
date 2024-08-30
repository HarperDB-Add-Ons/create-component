#!/usr/bin/env node

import { input, select, Separator } from '@inquirer/prompts';
import fs from 'node:fs';
import path from 'node:path';
import ora from 'ora';
import child_process from 'node:child_process';

const templates = path.join(import.meta.dirname, '../templates')

const CHOICES_MAP = {
	'nextjs': 'Next.js',
	'graphql-schema': 'GraphQL Schema',
	'js-resource': 'jsResource',
	'protocol-extension-component': 'Protocol Extension Component',
	'resource-extension-component': 'Resource Extension Component',
}

const CHOICES_ENABLED = [];
const CHOICES_DISABLED = [];

for (const [key, value] of Object.entries(CHOICES_MAP)) {
	if (key === 'nextjs') {
		CHOICES_ENABLED.push({ name: value, value: key });
	} else {
		CHOICES_DISABLED.push({ name: value, value: key, disabled: true });
	}
}

async function createComponent() {
	const componentType = await select({
		message: 'What type of component would you like to create?',
		choices: [
			...CHOICES_ENABLED,
			new Separator('Coming Soon:'),
			...CHOICES_DISABLED
		],
	});

	const directory = process.argv[2] ?? await input({ message: 'What is the component directory?'});

	const spinner = ora(`Creating ${CHOICES_MAP[componentType]} component`);

	spinner.start();

	fs.cpSync(path.join(templates, componentType), directory, { recursive: true });

	spinner.text = `Installing Dependencies`;

	try {
		const stdout = child_process.execSync('npm install', { cwd: directory });
	} catch (error) {
		spinner.fail('Failed to install dependencies');
		console.error(error);
		process.exit(1);
	}

	spinner.succeed(`Component created at ${directory}`);

	console.log(`To get started, run the following commands:`);
	console.log(`cd ${directory}`);
	console.log(`npm run dev`);
}

createComponent().then(() => {
	process.exit(0);
}).catch((error) => {
	console.error(error);
	process.exit(1);
});