/**
 * 判断对象类型
 * @param {Object} object
 * @returns {string} - Null、Undefined、String、Number、Boolean、Function、Date、Array、Object
 */
function getType(object) {
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}


function KDate(para0, month, day, hour, minute, second) {
    this.valueErrorNotice = 'value必须是数字';
    this.weekdayText = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var type = getType(para0);
    switch (type) {
        case 'Date':
            this.$date = para0;
            break;
        case 'String':
            this.$date = this.parse(para0);
            break;
        case 'Number':
            if (para0 < 10000) {
                this.$date = new Date(para0, month || 1 - 1, day || 1, hour || 0, minute || 0, second || 0);
            } else if (para0 < 1000000000000) {
                this.$date = new Date(para0 * 1000);
            } else {
                this.$date = new Date(para0);
            }
            break;
        default:
            this.$date = new Date();
            break;
    }

}

KDate.prototype.parse = function (str) {
    //去除.后面部分，并将/转换成-
    str = str.split('.')[0].replace(/\//g, '-');

    //去除T，并将数据分隔为日期和时间部分
    var dateStr = str.replace('T', ' ').split(' ');

    var arrDate = dateStr[0].split('-');
    if (arrDate.length !== 3) {
        console.log('KDate parse error（' + str + '）');
        return new Date();
    }
    var hour = 0, minute = 0, second = 0;
    if (dateStr.length > 1) {
        var arrTime = dateStr[1].split(':');
        hour = parseInt(arrTime[0]) || 0;
        minute = parseInt(arrTime[1]) || 0;
        second = parseInt(arrTime[2]) || 0;
    }
    return new Date(
        parseInt(arrDate[0]),
        parseInt(arrDate[1]) - 1,
        parseInt(arrDate[2]),
        hour,
        minute,
        second
    );
};

KDate.prototype.addDays = function (value) {
    if (typeof value !== 'number') {
        throw 'KDate.addDays:' + this.valueErrorNotice;
    }
    this.$date.setDate(this.$date.getDate() + value);
    return this;
};

KDate.prototype.addMonths = function (value) {
    if (typeof value !== 'number') {
        throw 'KDate.addMonths:' + this.valueErrorNotice;
    }
    this.$date.setMonth(this.$date.getMonth() + value);
    return this;
};

KDate.prototype.addYears = function (value) {
    if (typeof value !== 'number') {
        throw 'KDate.addYears:' + this.valueErrorNotice;
    }
    this.$date.setFullYear(this.$date.getFullYear() + value);
    return this;
};

KDate.prototype.addWeeks = function (value) {
    if (typeof value !== 'number') {
        throw 'KDate.addWeeks:' + this.valueErrorNotice;
    }
    return this.addDays(value * 7);
};

KDate.prototype.addHours = function (value) {
    if (typeof value !== 'number') {
        throw 'KDate.addHours:' + this.valueErrorNotice;
    }
    this.$date.setHours(this.$date.getHours() + value);
    return this;
};

KDate.prototype.addMinutes = function (value) {
    if (typeof value !== 'number') {
        throw 'KDate.addMinutes:' + this.valueErrorNotice;
    }
    this.$date.setMinutes(this.$date.getMinutes() + value);
    return this;
};

KDate.prototype.addSeconds = function (value) {
    if (typeof value !== 'number') {
        throw 'KDate.addSeconds:' + this.valueErrorNotice;
    }
    this.$date.setSeconds(this.$date.getSeconds() + value);
    return this;
};

KDate.prototype.year = function () {
    return this.$date.getFullYear();
};

KDate.prototype.month = function () {
    return this.$date.getMonth() + 1;
};

KDate.prototype.day = function () {
    return this.$date.getDate();
};

KDate.prototype.weekDay = function () {
    return this.$date.getDay() || 7;
};

KDate.prototype.weekDayText = function () {
    return this.weekDayText[this.$date.getDay()];
};

KDate.prototype.hour = function () {
    return this.$date.getHours();
};

KDate.prototype.minute = function () {
    return this.$date.getMinutes();
};

KDate.prototype.second = function () {
    return this.$date.getSeconds();
};

KDate.prototype.milliSeconds = function () {
    return this.$date.getMilliSeconds();
};

KDate.prototype.timeStamp = function (longValue) {
    return longValue ? this.$date.valueOf() : parseInt(this.$date.valueOf() / 1000)
};

KDate.prototype.dateStr = function () {
    return this.toString('yyyy-MM-dd')
};

KDate.prototype.timeStr = function () {
    return this.toString('hh:mm:ss')
};

KDate.prototype.shortTime = function () {
    return this.toString('hh:mm')
};

KDate.prototype.toString = function (fmt) {
    fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
    var o = {
        "M+": this.month(),                 //月份
        "d+": this.day(),                    //日
        "h+": this.hour(),                   //小时
        "m+": this.minute(),                 //分
        "s+": this.second()                 //秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.year() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
