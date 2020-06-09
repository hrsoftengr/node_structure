'use strict';
const
	fs = require('fs'),
	path = require('path'),
	message = require('../message/httpMessage');

class FolderCreate {
	/*Create Folder function */
	createDirectory(directoryPath) {
		const directory = path.normalize(directoryPath);
		return new Promise((resolve, reject) => {
			fs.stat(directory, (error) => {
				if (error) {
					if (error.code === 'ENOENT') {
						fs.mkdir(directory, (error) => {
							if (error) {
								reject(error);
							} else {
								resolve(`${message.customMessage.createfolder}: ${directory}`);
							}
						});
					} else {
						reject(error);
					}
				} else {
					if (error === null){
						resolve(`${message.customMessage.exitsfolder} : ${directory}`);
					} else {
						resolve(`${message.customMessage.createfolder} : ${directory}`);
					}
				}
			});
		});
	}
	mkDirByPathSync(targetDir, opts) {
		const isRelativeToScript = opts && opts.isRelativeToScript;
		const sep = path.sep;
		const initDir = path.isAbsolute(targetDir) ? sep : '';
		const baseDir = isRelativeToScript ? __dirname : '.';

		return targetDir.split(sep).reduce((parentDir, childDir) => {
			const curDir = path.resolve(baseDir, parentDir, childDir);
			try {
				fs.mkdirSync(curDir);
				console.log(`Directory ${curDir} created!`);
			} catch (err) {
				if (err.code === 'EEXIST') { // curDir already exists!
					console.log(`Directory ${curDir} already exists!`);
					return curDir;
				}

				// To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows
				if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
					throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
				}

				const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
				if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
					throw err; // Throw if it's just the last created dir.
				}
			}

			return curDir;
		}, initDir);
	}

}

module.exports = {FolderCreate:FolderCreate}
