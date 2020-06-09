'use strict';

const path                  = require('path'),
    ENV                     = require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
    swaggerJsDoc            = require('swagger-jsdoc'),
    swaggerUi               = require('swagger-ui-express'),

    microservicesRoutes     = require(path.resolve('./modules/microservices/routes/routes'));



    // @swagger setup
    const swaggerOptions = {
        swaggerDefinition : {
            info : {
                title           : "CRM MODULE API'S",
                version         : `${ENV.API_VERSION}`,
                description     : "CRM modules a sub-part of Product.",
                contact         : {
                    name : "Backend Developer",
                    email: "d5@cybuzzsc.com"
                },
                servers : [`${ENV.BASE_URL}:${ENV.PORT}`]
            },
            host                : `${ENV.APP_HOST}:${ENV.PORT}`,
            basePath            : `/${ENV.API_VERSION}/${ENV.API_PATH}`,
            securityDefinitions : {
                tokenAuth : {
                    type : "apiKey",
                    name : "X-API-Key",
                    in   : "header"
                }
            }
        },
        apis : [
            `${path.resolve('./modules/microservices/routes/routes.js')}`,
        ]
    }

    module.exports = (app) => {
        var options = { explorer: true }

        const swaggerDocs = swaggerJsDoc(swaggerOptions)
        app.use('/crm_API_Doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs, options))

        // start :: routes list
        app.use(`${ENV.API_VERSION}/${ENV.API_PATH}`, microservicesRoutes.router)

        app.use((err, req, res, next) => {
            if(err.isBoom) {
                return res.status(err.output.statusCode).send({message : err.output.payload, error : "error"})
            }
        })
    }

