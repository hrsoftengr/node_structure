if (process.env.NODE_ENV === 'test') {
    module.exports = {
        JWT_SECRET: 'dataGardener_is____@#',
        oauth: {
            google: {
                clientID: '953751877303-app5alpqa0jlhd4evog5ujcvl174cdrc.apps.googleusercontent.com',
                clientSecret: 'BULE-4rbHFU7jB4QImsAWJfH',
            },
            facebook: {
                clientID: '1227761744039623',
                clientSecret: 'd0c619e951ee9d8e00a06492a6b65a1c',
            },
        },
    };
} else {
    module.exports = {
        JWT_SECRET: 'dataGardener_is____@#',
        oauth: {
            google: {
                clientID: '953751877303-app5alpqa0jlhd4evog5ujcvl174cdrc.apps.googleusercontent.com',
                clientSecret: 'BULE-4rbHFU7jB4QImsAWJfH',
            },
            facebook: {
                clientID: '1227761744039623',
                clientSecret: 'd0c619e951ee9d8e00a06492a6b65a1c',
            },
        },
    };
}
