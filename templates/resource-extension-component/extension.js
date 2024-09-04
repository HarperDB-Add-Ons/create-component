async function setupFile(contents, relativePath, filePath, resources) {}

async function setupDirectory(relativePath, directoryPath, resources) {}

async function handleFile(contents, relativePath, filePath, resources) {}

async function handleDirectory(relativePath, directoryPath, resources) {}

async function ready() {}

module.exports = {
	setupFile,
	setupDirectory,
	handleFile,
	handleDirectory,
	ready,
}