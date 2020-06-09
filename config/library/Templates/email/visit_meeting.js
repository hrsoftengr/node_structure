'use strict';

module.exports.template = (message) => {
    return `<body>
            <div style="background-repeat: no-repeat, repeat;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                background-image:url('');
                height: 420px!important;">

                <center style="padding-top: 45px;">
                    <div style="max-width: 350px; background-color: white;padding: 10px 30px;">
                        <div style="color:#204351;text-align:center;font-weight:600;font-size:12px;">
                            Welcome to CybuzzSC Pvt. Ltd.
                        </div>
                        <br>
                        <div style="font-size:20px; font-weight: 300;margin-top: 10px;color: black;text-align: center;font-weight:600;">
                            Your `+message.visitMeetingType+` has been `+message.visitMeetingStatus+`
                        </div>
                        <hr style="border-top: 1px solid #d9d7d7">
                        <p style="text-align: left;font-size:10px;color: black;">

                            <strong>Subject : </strong> `+message.subject+` <br>
                            <strong>Description : </strong> `+message.description+` <br>
                            <b>Company : </b> `+message.companyName+` <br>
                            <b>Location : </b> `+message.location+` <br>
                            <b>Date : </b> `+message.date+` <br>
                            <b>Time : </b> `+message.timeTo+' '+message.timeFrom+`
                        </p>
                        
                        <hr style="border-top: 1px solid #d9d7d7">
                        <center>  
                            <div style="margin-top:10px">
                                <span style="font-size:10px;"><span>&nbsp;</span><span  ><span  >A Product of</span>&nbsp;<span><a href="http://cybuzzsc.com/" style="color:#313131!important;" target="_blank"><span style="color:green">C</span >y<span  style="color:Blue">B</span>uzzSC Infotech Pvt. Ltd. </a></span></span></span>
                            </div>
                        </center>
                    </div>
                </center>
            </div>
        </body>`
}