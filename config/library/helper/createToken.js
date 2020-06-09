
const
    Path = require('path'),
    JWT = require('jsonwebtoken'),
    ENV = require(Path.resolve(`./config/env/${process.env.NODE_ENV}`));

let
    Crypt = require('./crypt').crypt;
    // _edFun = new ED();

class CreateToken {
    _token (data){
        // const
        //     SECRET_1 = constants.JWT_KEY_1 + data.password,
        //     SECRET_2 =  constants.JWT_KEY_2 + data.password;
        let JwtToken = JWT.sign({
            "_id": data._id,
            "createdAt": data.createdOn,
            "username": data.username,
            "plan": data.plan
        }, ENV.JWT_KEY, {
            //	expiresIn:'365d' ,
            "expiresIn": '24h' // expires in 24 hours
            // expiresIn : 60 * 6,
        }),
         EncryptToken = Crypt.encrypt(JwtToken);
        return EncryptToken
    }

    /*refresh_token(data){
        let JwtToken = JWT.sign({
            "_id": data._id,
            "createdAt": data.createdOn,
            "username": data.username,
            "plan": data.plan
        }, SECRET_1, {
            //	expiresIn:'365d' ,
            "expiresIn": '24h' // expires in 24 hours
            // expiresIn : 60 * 6,
        }),
         EncryptToken = _edFun.encrypt(JwtToken);
        return EncryptToken
    }*/
}

module.exports = CreateToken;
