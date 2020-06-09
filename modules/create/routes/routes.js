const
    path        = require('path'),
    router      = require('express-promise-router')(),
    dir         = `${path.dirname(__dirname)}/controllers`,
    helper      = require(path.resolve('./config/library/helper'));
const GT = require('../controllers/CreateCtrl')

const ENV       = require(path.resolve(`./config/env/${process.env.NODE_ENV}`));


let ReadDirectory   = new helper.read_directory.readDirectory();
let Middleware      = new helper.middleware();

let fileObj        = ReadDirectory.requireFiles(dir);
let Ticket         = new fileObj['CreateCtrl']()



router.post('/demo',GT.getTest)




module.exports = {
    router: router,
    base: `/${ENV.API_VERSION}/${ENV.API_PATH}`
};
