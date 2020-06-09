const path = require('path');

//@ require
module.exports = (server, ENV) => {
    require(path.resolve('./config/library/express/express'))(server);
    require(path.resolve('./config/library/guard'))(server, ENV);
    require(path.resolve('./config/library/routes/routes'))(server);
    require(path.resolve('./config/library/database/mongoConnection'))(ENV);
}
