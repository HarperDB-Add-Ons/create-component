#!/usr/bin/env node

const { input } = require('@inquirer/prompts');

input({ message: 'Can I pet that dawg?' }).then((answer) => {
	console.log('Your answer:', answer);
});