'use strict';
   
   const 
        unirest     = require('unirest'),
        Path        = require('path'),
        ENV         = require(Path.resolve(`./config/env/${process.env.NODE_ENV}`)),
        client      = require('twilio')(ENV.accountSid, ENV.authToken);
        var mongoose = require('mongoose')


exports.SMS = async (to, body, fileType, userId, fileTypeId) => {
    let arr = []

    var sms = unirest(ENV.SMS_TYPE_POST, ENV.SMS_URL)
    sms.headers({ "authorization": ENV.SMS_AUTH_KEY }) 

    for (let i = 0; i < to.length; i++) {

        // client.api.messages
        //     .create({
        //         body            : body,
        //         to              : '+91'.to[i].mobile,
        //         from            : ENV.twilio_number
        //     })
        //     .then((message) => {
        //         console.log('reply: ', message.sid)
        //     }).catch((e) => {
        //         console.log('error:: ', e)
        //     })
                            
       await sms.form({
            "sender_id" : ENV.SMS_SENDERID,
            "message"   : body,
            "language"  : ENV.SMS_LANGUAGE,
            "route"     : ENV.SMS_ROUTE,
            "numbers"   : to[i].mobile
        })

       await sms.end(function (results) {
            if (results.error){
                console.log(results)
                // throw new Error(results.error)
            }
        })
      
        // for save log
        if(fileType !== null) {
            let type = null
            if(fileTypeId[i] !== undefined) {
                type = fileTypeId[i]
            }
            arr.push({
                userId      : userId,
                logTypeId   : fileTypeId[i] == undefined ? null : type,
                logType     : fileType[i],
                type        : 'sms',
                log         : {
                    from    : ENV.SMS_SENDERID,
                    to      : to[i].mobile,
                    body    : body,
                    date    : new Date()
                }
            })
        }
        
    }
    return arr    
}
    
    
     