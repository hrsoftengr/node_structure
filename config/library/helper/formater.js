'use strict';

class Formatter {

    data_formate(data) {
        let d_1;
        if (data.planName) {
            d_1 = data.planName;
        }
        if (data.name) {
            d_1 = data.name;
        }
        return d_1;
    }

    formatDate(date) {
        const Receiveddate = new Date(date),
            year = Receiveddate.getFullYear(),
            month = (Receiveddate.getMonth() + 1).toString(),
            formatedMonth = (month.length === 1) ? ('0' + month) : month,
            day = Receiveddate.getDate().toString(),
            formatedDay = (day.length === 1) ? ('0' + day) : day,
            hour = Receiveddate.getHours().toString();
        // const formattedDate = year + '-' + formatedMonth + '-' + formatedDay + ' ' ;
        // const formattedDate = formatedDay + '-' + formatedMonth + '-' + year + ' ' ;
        const formattedDate = year + '-' + formatedMonth + '-' + formatedDay + ' ';
        return formattedDate;
    }

    formatDateWithTIme(date) {
        const Receiveddate = new Date(date),
            year = Receiveddate.getFullYear(),
            month = (Receiveddate.getMonth() + 1).toString(),
            formatedMonth = (month.length === 1) ? ('0' + month) : month,
            day = Receiveddate.getDate().toString(),
            formatedDay = (day.length === 1) ? ('0' + day) : day,
            hour = Receiveddate.getHours().toString(),
            formatedHour = (hour.length === 1) ? ('0' + hour) : hour,
            minute = Receiveddate.getMinutes().toString(),
            formatedMinute = (minute.length === 1) ? ('0' + minute) : minute,
            second = Receiveddate.getSeconds().toString(),
            formatedSecond = (second.length === 1) ? ('0' + second) : second;
        // tslint:disable-next-line:max-line-length
        const formattedDate = formatedDay + '-' + formatedMonth + '-' + year + ' ' + formatedHour + ':' + formatedMinute + ':' + formatedSecond;
        return formattedDate;
    }

    calculate_days(date1, date2) {
        // const dt1 = new Date(new Date().toDateString());
        const dt1 = new Date(date1.toDateString());
        const dt2 = new Date(date2.toDateString());
        const one_day = 1000 * 60 * 60 * 24;
        const timeDiff = Math.abs(dt2.getTime() - dt1.getTime());
        const Days = Math.ceil(timeDiff / one_day);
        return Days + 1;
    }

    days_between(date1, date2) {
        // Here are the two dates to compare
        /*   var date1 = '2019-01-01';
        var date2 = '2019-01-35';*/

        // First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
        date1 = date1.split('-');
        date2 = date2.split('-');

        // Now we convert the array to a Date object, which has several helpful methods
        date1 = new Date(date1[0], date1[1], date1[2]);
        date2 = new Date(date2[0], date2[1], date2[2]);

        // We use the getTime() method and get the unixtime (in milliseconds, but we want seconds, therefore we divide it through 1000)
        let date1_unixtime = parseInt(date1.getTime() / 1000);
        let date2_unixtime = parseInt(date2.getTime() / 1000);

        // This is the calculated difference in seconds
        var timeDifference = date2_unixtime - date1_unixtime;

        // in Hours
        var timeDifferenceInHours = timeDifference / 60 / 60;

        // and finaly, in days :)
        var timeDifferenceInDays = timeDifferenceInHours / 24;
        return timeDifferenceInDays + 1;

    }

    addressFormat_1(address) {
        const rx = /[a-z]/gi;
        const rx2 = /[.,\s]/g;
        const m = address.address.match(rx);
        const COuntchar = address.address.slice(0, 30);
        return COuntchar;
    }

    addressFormat_2(address) {
        const regx = /[.,\s]/g;
        // const char = address.address.slice(25).replace(regx,'');
        const char = (address.city + ',' + address.county);

        return (char);
    }

    addressFormat_3(address) {
        return (address.postalcode + ',' + address.country);
    }

    array2json(data) {
        if (data.length > 0) {
            const json = data [0];
            return json;
        } else {
            return data;
        }
    }

    cleanString(str) {
        return str.replace(/[^\w\s]|_/g, '')
            .replace(/\s+/g, ' ')
            .toLowerCase();
    }

    extractSubstr(str, regexp) {
        return this.cleanString(str).match(regexp) || [];
    }

    getWordsByNonWhiteSpace(str) {
        return this.extractSubstr(str, /\S+/g);
    }

    getWordsByWordBoundaries(str) {
        return this.extractSubstr(str, /\b[a-z\d]+\b/g);
    }

    spaceRemove(companyNos) {
        return companyNos.filter((el) => {
            return el != '';
        });
    }

    hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

    TwoDaysDiff(date1, dat2) {
        var d1 = new Date(date1);
        var d2 = new Date(dat2);
        var timeDiff = d2.getTime() - d1.getTime();
        var DaysDiff = timeDiff / (1000 * 3600 * 24);
        return DaysDiff;
    }
    
    TimeAmPm(){
        let today = new Date();
        let options = {  
                    hour: "2-digit", minute: "2-digit"  
                    };  
                    const Time = today.toLocaleTimeString("en-us", options);
            console.log(Time);
            return Time
    }
        

}

module.exports = Formatter;
