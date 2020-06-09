/* eslint-disable indent,no-mixed-spaces-and-tabs,no-unused-vars */
const
    crypto      = require('crypto'),
    path        = require('path'),
    _           = require('underscore'),
    CryptoJs    = require('crypto-js'),
    ENV         = require(path.resolve(`./config/env/${process.env.NODE_ENV}`));

class Crypt {

    constructor() {
        this.key = ENV.ENCRYPTION_KEY;
        this.algo = ENV.ENCRYPTION_ALGO;
    }

    encrypt = (data) => {
        let iv          = crypto.randomBytes(16),
            cipher      = crypto.createCipheriv(this.algo, Buffer.from(this.key), iv),
            encrypted   = cipher.update(data);
            encrypted   = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    decrypt = (data) => {
        let textParts = data.split(':'),
            iv = Buffer.from(textParts.shift(), 'hex'),
            encryptedText = Buffer.from(textParts.join(':'), 'hex'),
            decipher = crypto.createDecipheriv(this.algo, Buffer.from(this.key), iv),
            decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

    hash = (data) => {
        data = crypto.createHash('md5').update(data).digest('hex');
        return data;

    }

    compareHash = (data, password) => {
        let hash = this.hash(data),
            isEqual = hash == password;
        return isEqual;

    }

    dataEncrypt = (_data) => {
        const
            _buffer = Buffer.from(JSON.stringify(_data)),
            _encrypt = this.encrypt(_buffer);
        /*_decrypt = this.decrypt(_encrypt),
        _decode = JSON.parse(_decrypt);*/
        return _encrypt;
    }

    dataDecrypt = (_data) => {
        const
            _decrypt = this.decrypt(_data),
            _decode = JSON.parse(_decrypt);

        return _decode;
    }

    //The get method is use for decrypt the value.
    get_decrypt = (value) => {
        // var key = CryptoJs.enc.Utf8.parse(key);
        var iv = CryptoJs.enc.Utf8.parse(this.key);
        var decrypted = CryptoJs.AES.decrypt(value, this.key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJs.mode.CBC,
            padding: CryptoJs.pad.Pkcs7
        });
        return decrypted.toString(CryptoJs.enc.Utf8);
    }

}


module.exports = {
    crypt: Crypt
}
