const path = require('path');

module.exports = (server, ENV) => {
    require(path.resolve('./config/library/guard/jwt.guard'))(server, ENV);
    require(path.resolve('./config/library/guard/xss.guard'))(server, ENV);
}
