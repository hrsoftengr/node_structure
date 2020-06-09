'use strict';

const
    path            = require('path'),
    nodemailer      = require('nodemailer'),
    Hogan           = require('hogan.js'),
    Fs              = require('fs'),
    ENV             = require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
    sendgrid        = require('sendgrid').mail,
    async           = require('async');

const Logger = require('./logger/logger'),
      logger = new Logger();


class SendMailer {

    /* *********************************************************
                 Email Send By SEND GRID
    ******************************************************** */

    SendGrid(fromEmail, toEmails, subject, textContent, htmlContent) {
        const errorEmails = [],
            successfulEmails = [],
            sg = require('sendgrid')(ENV.SENDGRID_API_KEY);

        if(fromEmail == null) {
            fromEmail = 'cybuzznoida182@gmail.com'
        }

        async.parallel([
            function (callback) {
                // Add to emails
                for (let i = 0; i < toEmails.length; i += 1) {
                    // Add from emails
                    const senderEmail = new sendgrid.Email(fromEmail);
                    // Add to email
                    const toEmail = new sendgrid.Email(toEmails[i]);
                    // HTML Content
                    const content = new sendgrid.Content('text/html', htmlContent);
                    const mail = new sendgrid.Mail(senderEmail, subject, toEmail, content);
                    var request = sg.emptyRequest({
                        method: 'POST',
                        path: '/v3/mail/send',
                        body: mail.toJSON()
                    });
                    sg.API(request, function (error, response) {

                        if (error) {
                            console.log('Error response received');
                        }
                        console.log('statusCode:: ', response.statusCode);
                        console.log(response.body);
                        console.log(response.headers);
                    });
                }
                // return
                callback(null, true);
            }
        ], function (err, results) {
            console.log('Done');
        });
        // parentCallback(null,
        //     {
        //         successfulEmails: successfulEmails,
        //         errorEmails: errorEmails,
        //     }
        // );
    }


    /********************************************************
     **  @Email Send by NODEMAILER
     *********************************************************/
    nodemailer = (Type, To, From, Subject, Contect) => {
        return new Promise((resolve, reject) => {
            var transporter = nodemailer.createTransport({
                service: ENV.MAIL_SMTP_SERVICE,
                auth: {
                    user: ENV.USER_EMAIL,
                    pass: ENV.USER_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            if (Type === 'OTP') {
                let
                    Templates = Fs.readFileSync(ENV.SUCCESS_LOGIN_EMAIL, 'utf-8'),
                    ComplieTemplate = Hogan.compile(Templates),
                    mailOptions = {
                                    from: ENV.USER_EMAIL,
                                    to: To,
                                    subject: Subject,
                                    html: ComplieTemplate.render({fullname, loginDetails})
                };
            }
            if (Type == 'SUCCESS') {
               let
                   Templates = Fs.readFileSync(ENV.SUCCESS_LOGIN_EMAIL, 'utf-8'),
                   ComplieTemplate = Hogan.compile(Templates),
                   mailOptions = {
                    from: ENV.USER_EMAIL,
                    to: To,
                    subject: Subject,
                    html: ComplieTemplate.render({fullname, loginDetails})

                };
            }
            if (Type == 'NOTIFICATION') {
               let
                   Templates = Fs.readFileSync(ENV.SUCCESS_LOGIN_EMAIL, 'utf-8'),
                   ComplieTemplate = Hogan.compile(Templates),
                   mailOptions = {
                    from: ENV.USER_EMAIL,
                    to: To,
                    subject: Subject,
                    html: ComplieTemplate.render({fullname, loginDetails})

                };
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        })
    }
}



module.exports = {
    sendMailer: SendMailer
};
