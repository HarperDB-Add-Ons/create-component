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
				value: path.join(templatesPath, 'nextjs'),
			},
			new Separator('Basic Components:'),
			{
				name: 'JavaScript Resource Component',
				value: path.join(templatesPath, 'js-resource'),
			},
			{
				name: 'Protocol Extension Component',
				value: path.join(templatesPath, 'protocol-extension-component'),
			},
			{
				name: 'Resource Extension Component',
				value: path.join(templatesPath, 'resource-extension-component'),
			},
		],
	}, { signal: controller.signal });

	const directory = process.argv[2] ?? await input({ message: 'What is the component directory?'}, { signal: controller.signal });

	console.log(`Creating component in ${directory}...`);

	fs.cpSync(templatePath, directory, { recursive: true });

	const componentPackageJSONPath = path.join(directory, 'package.json');
	const componentPackageJson = JSON.parse(fs.readFileSync(componentPackageJSONPath, 'utf8'));

	componentPackageJson.name = path.basename(directory);
	fs.writeFileSync(componentPackageJSONPath, JSON.stringify(componentPackageJson, null, 2));

	if (componentPackageJson.dependencies || componentPackageJson.devDependencies) {
		console.log(`Installing dependencies...`);
		child_process.execSync('npm install', { cwd: directory, stdio: 'ignore' });
	}

	console.log('Component created successfully!');
}

module.exports = {
	createComponent
}
