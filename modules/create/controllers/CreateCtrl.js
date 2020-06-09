require('node-emoji');

const Path    = require('path')
// const Helper  = require(Path.resolve('./config/library/helper'))
const Message = require(Path.resolve('./config/library/message/httpMessage'))
const InterFace = require(Path.resolve('./config/_interface/InterFace'))
const RequestHandler = require(Path.resolve('./config/library/helper/RequestHandler'))
const Logger = require(Path.resolve('./config/library/logger/logger'))


const logger = new Logger();
const requestHandler = new RequestHandler(logger);
// const Common  = new Helper.common.common()

// const valid   = new Helper.validation.validation();
const mongoose = require('mongoose')

class CreateCtrl extends InterFace{
  static async getTest (req, res){
    try {
        console.log('-------', req.headers.host.split(':')[0])

        console.log('============= >>>>> =======',req.subdomain)
        console.log("<<<<<<<<<<<<<< Create Controller >>>>>>>>>>>>>>>>>>")
        const R = await super.CreateDynamicSubDomain(req)
        requestHandler.sendSuccess(res, 'True true' , 200)();

    } catch (e) {
        console.log('Error : ', e)
    }
}




}
module.exports = CreateCtrl
