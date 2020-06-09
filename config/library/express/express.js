const
    helmet      = require('helmet'),
    path        = require('path'),
    morgan      = require('morgan'),
    xss = require('xss-clean'),
    //csrf = require('csurf'),
    hpp         = require('hpp'),
    cors        = require('cors'),
    lusca       = require('lusca'),
    RateLimit = require('express-rate-limit'),
    mongoSanitize = require('express-mongo-sanitize'),
    bodyParser  = require('body-parser');


const
    Helper = require(path.resolve('./config/library/helper')),
    Middleware = new Helper.middleware(),
    ENV         = require(path.resolve(`./config/env/${process.env.NODE_ENV}`));


module.exports = function (app) {
    app.use(cors());
    app.use(xss());
    app.use(mongoSanitize());
    app.use(mongoSanitize({
        replaceWith: '_'
    }))
    app.use(bodyParser.json({limit: '10kb'}));
    app.use(helmet()); //helps you secure your Express apps by setting various HTTP headers.
    // app.use(csrf()); // csurf protection middleware , cookie-parser to be initialized first.
    app.use(bodyParser.urlencoded({limit: '10kb', extended: false})); //parse application/x-www-form-urlencoded
    app.use(hpp());  //Express middleware to protect against HTTP Parameter Pollution attacks
    app.use(bodyParser.json());  // parse application/json
    app.disable('x-powered-by'); // disable X-Powered-By header
    app.use(helmet.hidePoweredBy({setTo: 'DummyServer 1.0'})); //change value of X-Powered-By header to given value
    app.use(helmet.noSniff());    // set X-Content-Type-Options header
    app.use(helmet.frameguard()); // set X-Frame-Options header
    app.use(helmet.xssFilter());  // set X-XSS-Protection header
    app.use(helmet.ieNoOpen())
    //Object, or an Array - Object definition of policy. Valid policies examples include:
    // app.use(lusca.csp({policy: 'default-src \'none\'; img-src \'self\'; script-src \'self\'; style-src \'self\'; object-src \'none\''}));
    app.use(lusca.csp({policy: 'default-src \'none\'; img-src \'self\'; script-src \'self\'; style-src \'self\'; object-src \'none\''}));
    app.use(lusca.xframe('SAMEORIGIN')); //The value for the header, e.g. DENY, SAMEORIGIN or ALLOW-FROM uri.
    app.use(lusca.p3p('ABCDEF'));  //value String - Required. The compact privacy policy
    app.use(lusca.hsts({maxAge: 7200000})); //Enables HTTP Strict Transport Security for the host domain.
    app.use(lusca.xssProtection(true)); //If the header is enabled or not (see header docs)
    app.use(lusca.nosniff()); //Enables X-Content-Type-Options header to prevent MIME-sniffing a response away from the declared content-type
    app.use(lusca.referrerPolicy('same-origin')); //The value for the header, e.g. origin, same-origin, no-referrer. Defaults to `` (empty string).
    app.set('trust proxy', 1);
    app.use(helmet({
        frameguard: {
            action: 'deny'
        }
    }));
    const limiter = new RateLimit({
        windowMs: 15*60*1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        delayMs: 0 // disable delaying — full speed until the max limit is reached
    });
    app.use(limiter);


    /****
     * Validate NODE_ENV existence
     *@by Yogesh Dubey
     * ****/
    //allow/enable cross origin request
    app.use(function (req, res, next) {
        res.header('X-XSS-Protection', '1; mode=block');
        res.header('X-Frame-Options', 'deny');
        res.header('X-Content-Type-Options', 'nosniff');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE , HEAD , OPTIONS ');
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept,Authorization'
        );
        // res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");   // this content security policy
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        // res.locals.csrfToken = req.csrfToken();
        next();
    });



    app.use(morgan('dev')); //HTTP request logger

    app.use((err, req, res, next) => {
        reject(new Error('Bad Gateway!, err:' + err))
        res.status(401).send('url not found!')
        next()
    })

// Make sure you run "npm install helmet" to get the Helmet package.
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'"]
        }
    }))


    //@ global error handling middleware
    // app.use((req, error, res, next) => {
    // 	//@ write error logs into file
    // 	Middleware.writeErrorIntoFile(req, error);
    //  res.status(500).send({error: error.message});
    // 	next ();
    // });
    //enable logging
    app.use(require('express-bunyan-logger')({
        name: 'Logs File',
        streams: [{
            format: ':remote-address - :user-agent[major] custom logger',
            type: 'rotating-file',
            level: 'info', // loging level
            path: `${ENV.CREATE_LOGS_PATH}/logs.logs`,
            period: '1d', // daily rotation
            count: 3, // keep 3 back copies
        }]
    }));

    // app.use(function(err, req, res, next) {
    // 	console.error(err.message); // Log error message in our server's console
    // 	if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    // 	res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
    // });

};
