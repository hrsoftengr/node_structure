/* eslint-disable indent,semi,quotes,no-unused-vars */
const path          = require('path'),
    fs              = require('fs'),
    moment          = require('moment'),
    ENV             = require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
    Crypt           = require('../../../config/library/helper/crypt').crypt,
    jwt             = require('./jwt'),
    JSON            = require('circular-json'),
    os              = require('os'),
    url             = require('url'),
    rateLimit       = require('express-rate-limit'),
    MicroConn       = require('../microservicesConnection/connection'),
    mongoose        = require('mongoose');


let
    Jwt         = new jwt(),
    crypt       = new Crypt(),
    microConn   = new MicroConn.MicroServicesConn();

class Middleware {

    //@ fetch jwt token from headers
    //@ decode jwt
    //@ insert jwt object into request
    checkAuthorization(req, res, next) {
        //var token = req.body.token || req.query.token || req.headers['x-access-token'];
        const endTime = moment().unix();

        if (!req.headers.authorization) {
            return res.status(401).send({Message: 'Missing Authorization Header', TimeZone: new Date()});
        } else {

            const _headers  = crypt.dataDecrypt(req.headers.authorization)
            let decodeToken = Jwt.verify(_headers)

            if (decodeToken === false) {
                return res.status(401).send({Message: 'Token Is Not Valid', TimeZone: new Date()});

            } else {

                if (decodeToken.exp > endTime) {

                    // return TableModel.findOne({
                    //     _id: decodeToken.user._id,
                    //     type: 'admin',
                    //     email: decodeToken.user.email
                    // })
                    // .then((admin) => {
                    //     if (admin) {
                    //         req.tokenInfo = admin
                    //         next()
                    //     }
                    //     if (!admin) {
                    //         req.tokenInfo = decodeToken
                    //         next()
                    //     }
                    // })
                    // .catch((err) => {
                    //     next(err)
                    // })

                    return req.tokenInfo = decodeToken
                } else {
                    return res.status(401).send({Message: 'Token Expired', TimeZone: new Date()});

                }
            }
        }
    }


    /********************************************
    * Micro Service Connection with token check
     * ******************************************/

    checkMicroServiceAuthorization(req, res, next) {
        //var token = req.body.token || req.query.token || req.headers['x-access-token'];
        const endTime = moment().unix();

        if (!req.headers.authorization) {
            return res.status(401).send({Message: 'Missing Authorization Header', TimeZone: new Date()});
        } else {

            const _headers  = crypt.dataDecrypt(req.headers.authorization)
            let decodeToken = Jwt.verify(_headers)

            if (decodeToken === false) {
                return res.status(401).send({Message: 'Token Is Not Valid', TimeZone: new Date()});
            } else {

                if (decodeToken.exp > endTime) {
                    microConn.connCreate('mongodb://'+ENV.MICROSERVICES_DB_USERNAME+':'+ENV.MICROSERVICES_DB_PASSWORD+'@122.160.77.46/'+ENV.MICROSERVICES_DB_NAME, 'users', {_id:mongoose.Types.ObjectId(decodeToken.id)})
                        .then((user) => {
                            if(user.length === 0){
                                return res.status(401).send({Message: 'Not a valid user', TimeZone: new Date()});
                            } else {
                                req.tokenInfo = decodeToken
                                // console.log('......', req.tokenInfo)
                                next ();
                            }
                        })
                } else {
                    return res.status(401).send({Message: 'Token Expired', TimeZone: new Date()});
                }
            }
        }
    }


    _decode(token) {
        let decodeToken = Jwt.verify(token);
        return decodeToken;
    }


    //@ validate password
    validatePassword(req, res, next) {
        let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/,
            resObj = {},
            password = req.body.password;

        resObj.status = 'failed';
        resObj.statusCode = 400;

        //@ if password not found
        if (!password) {
            resObj.message = Helper.messages.passwordNotFound;
            res.status(resObj.statusCode)
                .json(resObj);
            return;
        }

        let length = password.length,
            minLength = 5,
            maxLength = 12,
            havingSpace = /\s/g.test(password),
            havingSpecialChar = format.test(password);

        //@ check password length
        //@ password should contain a special character
        //@ password should not contain white space

        //@ if you want to add special character check you can include !havingSpecialChar in condition
        if (length < minLength || length > maxLength || havingSpace) {

            resObj.message = length < minLength
                ? 'password length shoud be not be less than ' + minLength
                : length > maxLength
                    ? 'password should not be greater than ' + maxLength
                    : havingSpace
                        ? 'password should not contain any spaces'
                        : 'password should contain minimum one special character ';

            res.status(resObj.statusCode)
                .json(resObj);

        } else {
            next();
        }

    }

    //@ append logs into file in json form
    //@ file name will be current date (.log)
    writeErrorIntoFile(req, error) {
        let dateObj = new Date(),
            year = `/${dateObj.getFullYear()}/`,
            month = dateObj.toLocaleString('en-us', {month: 'short'}),
            date = `${dateObj.getDate()}.log`,
            dirArray = [
                ENV.CREATE_LOGS_PATH,
                year,
                month
            ],
            tempDir = '';

        dirArray.forEach((n, i) => {
            tempDir += dirArray[i];

            // if directory does not exist
            // create directory
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir);
            }
        });

        // delete password from body
        //   req.body.password = undefined;
        let OS = {
            'type': os.type(),
            'release': os.release(),
            'platform': os.platform()
        };


        // noinspection JSAnnotator
        let errObj = JSON.stringify({
            Time: dateObj,
            IP: req.ip,
            OS: OS,
            Method: req.method,
            Params: req.params,
            Query: req.query,
            Body: req.body,
            Headers: req.headers,
            Error: error,
            Message: error.message,
            Stack: error.stack
        }) + '\n' + '\n' + '\n' + '\n' + '\n';

        let file = `${tempDir}/${date}`;

        if (!fs.existsSync(file)) {

            // file does not exist
            // create file and insert error
            fs.writeFileSync(file, errObj);
        } else {

            // if file already exist
            fs.appendFileSync(file, errObj);
        }
    }


    //@ change status type string to integer
    statusStrToInt(req, res, next) {
        //@ change status to number
        if (req.body.status == 0 || req.body.status) {
            req.body.status = parseInt(req.body.status);
            //@ send failed response if status is not number
            if (!Number.isInteger(req.body.status)) {
                let resObj = {
                    statusCode: 400,
                    message: 'status should be number'
                };
                //@ send response
                res.status(resObj.statusCode)
                    .json(resObj);
            } else {

                //@ OK
                next();
            }
        } else {
            next();
        }


    }

    createAccountLimiter() {
        let AccountLimiter = rateLimit({
            windowMs: 60 * 60 * 1000, // 1 hour window
            max: 6, // start blocking after 5 requests
            message: "Too many Request, please try again after an 1 hour"
        });
        return AccountLimiter;
    }

    // isUserCheckPlan(req, res, next) {
    // 	if (!req.headers.xaccesstoken || req.headers.xaccesstoken.indexOf('X ') === -1) {
    // 		return res.status(401).send({ error: 'Missing x-Access-Token Header' });
    // 	} else {
    // 		// const EnToken = req.headers['xaccesstoken'];
    // 		const _headers = req.headers.xaccesstoken.split(' ')[1];
    // 		const token = _edFun.get_decrypt(_headers);
    // 		let newId = token.split(":");
    // 		PlanModel.findById(req.user.plan).exec((error, result) => {
    // 			let expDate = new Date(result.endDate).setHours(0, 0, 0, 0);
    // 			let CurrentTime = new Date().setHours(0, 0, 0, 0);
    // 			if (CurrentTime > expDate) {
    // 				return res.status(400).json('Plan Expired')
    // 			} else {
    // 				if (newId[0] == req.user.plan && newId[1] == req.user._id.toString()) {
    // 					next()
    // 				} else {
    // 					return res.status(400).json('This Plan have no features')
    // 				}
    // 			}
    // 		});
    // 	}
    // }

    // isLoginOrNot(req, res, next) {
    // 	UserLoginDetails.findOne({
    // 		user_email: req.body.email,
    // 		isLogIn: true
    // 	},(error , result) =>{
    // 		if(result === null){
    // 			next ();
    // 		}else {
    // 			return res.status(406).json('You already have an active session with this Account')
    // 		}
    // 	});
    // }

    // isCheckTokenNull(req, res, next) {
    // 	// const EnToken = req.headers['authorization'];
    // 	const _headers = req.headers.authorization.split(' ')[1];
    // 	if(_headers.toString().length == _constans.WITH_OUT_LOGIN_TOKEN_LENGTH){
    // 		next ();
    // 	} else {
    // 		UserLoginDetails.findOne({
    // 			JwtLogInToken : _headers,
    // 			isLogIn: true
    // 		}).exec((error, result)=>{
    // 			if(result === null){
    // 				return res.status(403).json('User Logout  this session');
    // 			}
    // 			if(result){
    // 				next();
    // 			}
    // 		})
    // 	}
    // }

    checkOrigin(req, res, next) {
        let ref = req.headers.referer;
        if (ref) {
            // We got a referer
            let u = url.parse(ref);
            if (u && u.hostname == ENV.WEB_HOST_NAME) {
                return next();
            }
        }
        return res.send(403, 'Invalid origin');
    }

    checkProtocall(req, res, next) {
        if(req.protocol === ENV.PROTOCALL){
            return next ()
        }else {
            return res.status(403).json({"Message": "Your request is not secure please Check your request .."})
        }
    }


}

module.exports = Middleware;
