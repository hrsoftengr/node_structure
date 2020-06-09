/* eslint-disable indent,no-console,no-mixed-spaces-and-tabs */
const path      = require('path'),
    jwtToken    = require('jsonwebtoken'),
    Crypt       = require('./crypt').crypt,
    ENV         = require(path.resolve(`./config/env/${process.env.NODE_ENV}`));

let crypt       = new Crypt();

class Jwt {

    constructor() {
        this.key =  Buffer.from(ENV.JWT_KEY).toString('base64');
    }

    sign = (data) => {
        let crypt   = new Crypt();
        let payload = crypt.encrypt(data);
        let token   = jwtToken.sign(payload, this.key);
        return token;
    }

    verify = (token) => {
        try {
            let decoded = jwtToken.decode(token, {complete: true});
            if (decoded === null) {
                return false;
            } else {
                let payload = decoded.payload;
                // let decrypt = crypt.decrypt(payload);
                // let _final  = JSON.parse(decrypt);
                // payload     = jwtToken.decode(_final);
                return payload;
            }
        } catch (e) {
            (e);
        }
        return payload;
    }
}

module.exports = Jwt;
