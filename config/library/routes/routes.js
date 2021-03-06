const path = require('path'),
    fs = require('fs'),
    Helper = require(path.resolve('./config/library/helper')),
    location = path.resolve('./modules');


module.exports = (app) => {

    //@ require all controllers here
    fs.readdirSync(location)
        .filter((dir) => {
            return fs.statSync(`${location}/${dir}`).isDirectory();
        })
        .forEach((dir) => {
            let fileObj = require(path.resolve(`./modules/${dir}/routes/routes`));
            app.use(fileObj.base, fileObj.router);
        });


}
