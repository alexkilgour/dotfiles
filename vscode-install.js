/**
 * Install all vscode extensions from json
 */
'use strict';

const exec = require('child_process').exec;
const extensions = require('./vscode-extensions.json').extensions;

let execution = 'code --install-extension';
let commands = extensions.map(word => `${execution} ${word}`);

function output(error, stdout, stderr) {
	if (stdout) { process.stdout.write(stdout) }
	if (stderr) { console.log(stderr) }
}

for (let command of commands) {
	exec(command, output);
}