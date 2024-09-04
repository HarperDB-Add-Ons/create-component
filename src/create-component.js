const { input, select, Separator } = require('@inquirer/prompts');
const fs = require('node:fs');
const path = require('node:path');
const child_process = require('node:child_process');

const templatesPath = path.join(__dirname, '../templates');

async function createComponent(controller) {
	const templatePath = await select({
		message: 'What type of component would you like to create?',
		choices: [
			new Separator('Application Components:'),
			{
				name: 'Next.js Application Component',
				template: path.join(templatesPath, 'nextjs'),
				disabled: false,
			},
			new Separator('Basic Components:'),
			{
				name: 'JavaScript Resource Component',
				template: path.join(templatesPath, 'js-resource'),
			},
			{
				name: 'Protocol Extension Component',
				template: path.join(templatesPath, 'protocol-extension-component'),
			},
			{
				name: 'Resource Extension Component',
				template: path.join(templatesPath, 'resource-extension-component'),
			},
		],
	}, { signal: controller.signal });

	const directory = process.argv[2] ?? await input({ message: 'What is the component directory?'}, { signal: controller.signal });

	console.log(`Creating component in ${directory}...`);

	fs.cpSync(templatePath, directory, { recursive: true });

	try {
		const stdout = child_process.execSync('npm install', { cwd: directory });
	} catch (error) {
		console.error(error);
		process.exit(1);
	}

	console.log('Component created successfully!');
	console.log(`To get started, run the following commands:`);
	console.log(`cd ${directory}`);
	console.log(`npm run dev`);
}

module.exports = {
	createComponent
}
