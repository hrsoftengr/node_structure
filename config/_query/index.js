/****
 * @by Himanshu Rajput
 * ****/

const
	path = require('path'),
	readDir = require(path.resolve('./config/library/helper/read_directory')).readDirectory;

const
	ReadDirectory = new readDir(),
	skipFiles = ['index'],
	fileObj = ReadDirectory.requireFiles(__dirname, skipFiles);

module.exports = fileObj;

