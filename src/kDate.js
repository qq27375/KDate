const Config = {
    valueErrorNotice: 'value必须是数字',
    weekdayText: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
};

/**
 * 判断对象类型
 * @param {Object} object
 * @returns {string} - Null、Undefined、String、Number、Boolean、Function、Date、Array、Object
 */
function getType(object) {
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

class KDate {
    constructor(para0, month, day, hour, minute, second) {
        const type = getType(para0);
        switch (type) {
            case 'Date':
                this.$date = para0;
                break;
            case 'String':
                this.$date = KDate.parse(para0);
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

    /**
     * string转化为Date
     * @param str
     * @returns {Date}
     */
    static parse(str) {
        //去除.后面部分，并将/转换成-
        str = str.split('.')[0].replace(/\//g, '-');

        //去除T，并将数据分隔为日期和时间部分
        const dateStr = str.replace('T', ' ').split(' ');

        const arrDate = dateStr[0].split('-');
        if (arrDate.length !== 3) {
            console.log('KDate parse error（' + str + '）');
            return new Date();
        }
        let hour = 0, minute = 0, second = 0;
        if (dateStr.length > 1) {
            const arrTime = dateStr[1].split(':');
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
    }

    addDays(value) {
        if (typeof value !== 'number') {
            throw 'KDate.addDays:' + Config.valueErrorNotice;
        }
        this.$date.setDate(this.$date.getDate() + value);
        return this;
    }

    addMonths(value) {
        if (typeof value !== 'number') {
            throw 'KDate.addMonths:' + Config.valueErrorNotice;
        }
        this.$date.setMonth(this.$date.getMonth() + value);
        return this;
    }

    addYears(value) {
        if (typeof value !== 'number') {
            throw 'KDate.addYears:' + Config.valueErrorNotice;
        }
        this.$date.setFullYear(this.$date.getFullYear() + value);
        return this;
    }

    addWeeks(value) {
        if (typeof value !== 'number') {
            throw 'KDate.addWeeks:' + Config.valueErrorNotice;
        }
        return this.addDays(value * 7);
    }

    addHours(value) {
        if (typeof value !== 'number') {
            throw 'KDate.addHours:' + Config.valueErrorNotice;
        }
        this.$date.setHours(this.$date.getHours() + value);
        return this;
    }

    addMinutes(value) {
        if (typeof value !== 'number') {
            throw 'KDate.addMinutes:' + Config.valueErrorNotice;
        }
        this.$date.setMinutes(this.$date.getMinutes() + value);
        return this;
    }

    addSeconds(value) {
        if (typeof value !== 'number') {
            throw 'KDate.addSeconds:' + Config.valueErrorNotice;
        }
        this.$date.setSeconds(this.$date.getSeconds() + value);
        return this;
    }

    year() {
        return this.$date.getFullYear();
    }

    month() {
        return this.$date.getMonth() + 1;
    }

    day() {
        return this.$date.getDate();
    }

    weekDay() {
        return this.$date.getDay() || 7;
    }

    weekDayText() {
        return Config.weekDayText[this.$date.getDay()];
    }

    hour() {
        return this.$date.getHours();
    }

    minute() {
        return this.$date.getMinutes();
    }

    second() {
        return this.$date.getSeconds();
    }

    milliSeconds() {
        return this.$date.getMilliSeconds();
    }

    timeStamp(long = false) {
        return long ? this.$date.valueOf() : parseInt(this.$date.valueOf() / 1000)
    }

    dateStr() {
        return this.toString('yyyy-MM-dd')
    }

    timeStr() {
        return this.toString('hh:mm:ss')
    }

    shortTime() {
        return this.toString('hh:mm')
    }

    toString(fmt = 'yyyy-MM-dd hh:mm:ss') {
        const o = {
            "M+": this.month(),                 //月份
            "d+": this.day(),                    //日
            "h+": this.hour(),                   //小时
            "m+": this.minute(),                 //分
            "s+": this.second(),                 //秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.year() + "").substr(4 - RegExp.$1.length));
        }
        for (const k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
}

export default KDate;

export {
    KDate,
    Config,
    getType
}
