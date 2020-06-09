'use strict';

const
    FCM = require('fcm-node'),
    serverKey = 'AAAANCnxLfY:APA91bFigMPMyQSAtluPhEbNShOE5n2clY_FEzHOE99OpYJbY37jErPTbYwEsWXw0J3ipoOSSHwVRMWEXhu4LUOwZ0fZ50-cNk6vVDQG4bO0muKyd5TgRHMU9YaPoHYcRLsP233l3t8gEGzbyi17Z2NvzsPkopqUXA',
    fcm = new FCM(serverKey);


exports.PushNotification = (send2Token, fullname, profile_img, sender_name, place, time, date) => {

    /*    console.log("token" +' '+  send2Token);
        console.log("user " +'' + fullname);
        console.log("image" +' '+ profile_img);
        console.log("sender full" +' '+ sender_name);
        console.log("place" +' '+  place);
        console.log("time" +' '+  time);
        console.log("date" +' '+  date);*/

    let message = {
        to: send2Token,
        collapse_key: 'green',

        notification: {
            title: 'India Lets Play',
            sound: "default",
            color: "#53c4bc",
            click_action: "MY_BOOK",
            icon: "ic_launcher",
            body: fullname
        },
        data: {
            profile_img: `http://13.232.186.228/images/${profile_img}`,
            sender_name: sender_name,
            place: place,
            time: time,
            date: date
        }
    };
    fcm.send(message, (error, response) => {
        if (error) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    })

}
