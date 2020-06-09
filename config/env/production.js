const
	_path = require('../const/path');

module.exports = {
	// eslint-disable-next-line sort-keys
	'MODE_TYPE'         : 'production',
	'BASE_URL'        	: 'http://122.160.46.77',
	'WEB_HOST_NAME'     : 'localhost',
	'APP_HOST'          : '122.160.46.77',
	'PROTOCALL'         : 'https',
	'MICROSERVICES_PORT': 8081,
	'PORT'              :  8082,
	'DB_HOST'           : 'localhost',
	'DB_PORT'           : 27017,
	'DB_NAME'           : 'crmDB',
	'DB_USERNAME'       : 'crm_db',
	'DB_PASSWORD'       : 'ThIs_iS^CiPL!nOidA_crM',
	'MONGO_DEBUG'       : true,
	'JWT_KEY'           : 'Secure!<_--@>#?$:%"+(^^{+_)JwT:KeY(&*[]./,01sre;,___private.jwt.key',
	'ENCRYPTION_KEY'    : 'SeCuRe!/*.%,#3@+__EnCrYpTiOn_KeY',
	'ENCRYPTION_ALGO'   : 'aes-256-cbc',
	'JWT_GEN_KEY'       : 'This!iS&gOOd%tHiNk_AboUTCipL!18@$&>',
	'SUCCESS_LOGIN_EMAIL': _path.LOGIN_SUCCESS_PATH,
	'OTP_EMAIL_'        : _path.OTP_PATH,
	'INVOICE'           : '../library/Templates/invoice/invoice.html',
	'API_VERSION'       : 'V.1.0',
	'API_PATH'          : 'API',
	'CREATE_LOGS_PATH'  : _path.LOGS_PATH,

	/*********************
	 * @Microservices Data Base credentials
	 * *******************/
	'MICROSERVICES_DB_NAME'           : 'usermanagement',
    'MICROSERVICES_DB_USERNAME'       : 'user_management_db',
	'MICROSERVICES_DB_PASSWORD'       : 'ThIs_iS^CiPL!nOidA',
	
	/*********************
	 * @SMS credentials
	 * *******************/
	'SMS_TYPE_GET' 		: 'GET',
	'SMS_TYPE_POST'		:'POST',
	'SMS_URL'      		: 'https://www.fast2sms.com/dev/bulk',
	'SMS_AUTH_KEY' 		: 'n7mKDakHwCZgL4jbvsTp8UESRtX5J9BuhWYf1N0GFql6A3oMQxpDlLSd96PqGNAYRXBtbOoU1EjyrZe3',
	'SMS_SENDERID' 		: 'FSTSMS',
	'SMS_LANGUAGE' 		: 'english',
	'SMS_ROUTE'    		: 'p',

	/*********************
	 * @Twilio credentials
	 * *******************/
	'accountSid'		: 'AC3cf7cb6b7621268060d81ef18a80a4ca',
	'authToken' 		: '5a9bd50e9d995d35b64110c3cd81c569',

	/*********************
	 * @Email sendgrid secret key
	 * *******************/
	'SENDGRID_API_KEY' 	: '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',

};
