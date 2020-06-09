/* eslint-disable no-console,no-mixed-spaces-and-tabs */
const
	mongoose = require('mongoose'),
	ora = require('ora'),
// eslint-disable-next-line no-unused-vars
	fs = require('fs'),
	chalk = require('chalk'),

	// Chalk message

	connected 		= chalk.bold.cyan,
	error 			= chalk.bold.yellow,
	disconnected 	= chalk.bold.red,
	termination 	= chalk.bold.magenta;

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('bufferCommands', false);

// eslint-disable-next-line max-lines-per-function
module.exports = function (ENV) {
	mongoose.set('debug', ENV.MONGO_DEBUG);
	// eslint-disable-next-line no-unused-vars
	let options = {
		/*	'reconnectTries': Number.MAX_VALUE, // Never stop trying to reconnect
			// eslint-disable-next-line sort-keys
			'reconnectInterval': 500, // Reconnect every 500ms*/
			// eslint-disable-next-line sort-keys
			'poolSize': 10, // Maintain up to 10 socket connections
			// If not connected, return errors immediately rather than waiting for reconnect
			// eslint-disable-next-line sort-keys
			'bufferMaxEntries': 0,
			'connectTimeoutMS': 10000, // Give up initial connection after 10 seconds
			'socketTimeoutMS': 45000, // Close sockets after 45 seconds of inactivity
			// eslint-disable-next-line sort-keys
			'family': 4, // Use IPv4, skip trying IPv6
			'ssl': false
		},

		// for local setup
		url = `mongodb://localhost:${ENV.DB_PORT}/${ENV.DB_NAME}`;

		// server db setup
		// url = `mongodb://${(ENV.DB_USERNAME)}:${(ENV.DB_PASSWORD)}@${ENV.DB_HOST}/${ENV.DB_NAME}`; // this is URL used with credentials

	/*create mongoDB connection*/
	mongoose.connect(url, options);

	/*if if connection established*/
	mongoose.connection.on('connected', () => {
		ora(connected('Mongoose default connection is open to ', url)).succeed();
	});

	/*if unable to connect to DB*/
	mongoose.connection.on('error', (err) => {
		console.log(error('Mongoose default connection has occured ' + err + ' error'));
	});

	/*if connection has been break due to any reason*/
	// eslint-disable-next-line no-unused-vars,handle-callback-err
	mongoose.connection.on('disconnected', (err) => {
		console.log(disconnected('Mongoose default connection is disconnected'));

	});

	process.on('SIGINT', function () {
		mongoose.connection.close(function () {
			console.log(termination('Mongoose default connection is disconnected due to application termination'));
			// eslint-disable-next-line no-process-exit
			process.exit(0);
		});
	});


};
