const
    expressJWT      = require('express-jwt'),
    path            = require('path'),
    unlessRoutes    = require(path.resolve('./config/library/routes/unless.routes'));

const
    Helper          = require(path.resolve('./config/library/helper')),
    Middleware      = new Helper.middleware();

module.exports = (app, ENV) => {

    // @ validate api with express-jwt
    /*app.use(expressJWT({
        secret: new Buffer(ENV.JWT_KEY).toString('base64')
    }).unless({

        //@ pass api without validating
        path: unlessRoutes
    }));*/


    //@ global error handling middleware
    app.use((err, req, res, next) => {
        //@ write error logs into file
        //@ write error logs into file
        Middleware.writeErrorIntoFile(req, err);
        return res.status(401).json({"message": err.name + ": " + err.message});
        next()

    });


    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            //@ write error logs into file
            Middleware.writeErrorIntoFile(req, err);
            return res.status(401).json({"message": err.name + ": " + err.message});
            next()
        }

    });

    app.use(function (err, req, res, next) {
        if (err.name === 'TypeError') {
            //@ write error logs into file
            Middleware.writeErrorIntoFile(req, err);
            return res.status(401).json({"message": err.name + ": " + err.message});
            next()
        }

    });


}
