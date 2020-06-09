/* eslint-disable no-mixed-spaces-and-tabs,indent */
const
    Moment = require('moment');


class Common {

    // eslint-disable-next-line max-params
    generateResponses(status, error, message, data , timeZone) {
        let resObj = {};
        resObj.status   = status;
        resObj.error    = error;
        resObj.message  = message;
        resObj.timeZone     =  timeZone;
        if (data !== null) resObj.data = data;

        return resObj;
    }

    validateArgument(obj, requiredParams) {
        if (typeof obj === 'object' && Array.isArray(requiredParams)) {
            let notFound = [];
            let property = Object.keys(obj);
            requiredParams.forEach((p) => {
                if (property.indexOf(p) == -1) {
                    notFound.push(p);
                }
            });
            return notFound;
        } else {
            return 'ERROR: First argument should be object and second array';
        }
    }

    /*  Create Time function*/
    TimeZone() {
        const TimeZone = Moment().format('YYYY-MM-DD HH:mm:ss Z');
        return TimeZone;
    }



}

module.exports = {
    common: Common
};
