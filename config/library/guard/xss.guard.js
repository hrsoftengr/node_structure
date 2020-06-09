const { buildCheckFunction } = require('express-validator');
const checkBodyAndQuery = buildCheckFunction(['body', 'query']);

module.exports = (app) => {
    //@ secure application from xxs attacks
    // app.use(validator());
    //@
    app.use(function (req, res, next) {
      /*  for (var item in req.body) {
            req.sanitize(item).escape();
        }*/
        return next();
    });
}
