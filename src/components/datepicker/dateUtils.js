// date帮助类
class DateX {
    constructor({date = Date.now(), format = 'YYYY-MM-DD', isRange = false, disableFilter, isInit = true}) {
        if(!this.isDate()) return console.error('传入date对象非法!');
        this.disableFilter = disableFilter;
        this.format = format;
        this.isRange = isRange;
        this.isInit = isInit;
        this.init(date);
    }

    // 初始化对象
    init(date) {
        // 浏览器兼容
        if(/-/.test(date)) date = date.replace('/-/g', '/');

        this.refresh(date, this.isInit);
        this.dateList = this.getDateList(this.dateOrigin.getTime());
    }

    // date校验
    isDate(date) {
        return isNaN(new Date(+date).getTime());
    }

    // 小于10的日期补0
    appendZero(str) {
        const s = parseInt(str);
        if(isNaN(s)) return console.error('传入字符串数据非法');

        return s < 10 ? '0' + s : s;
    }

    // 获取渲染用的日期数据
    getDateList(dateTime) {
        let res = [];
        // 获取当前月天数
        let thisMonthDates = this.getMonthDays(new Date(dateTime));

        while(thisMonthDates > 0) {
            res.unshift({
                label: thisMonthDates,
                isActive: false,
                isStart: false,
                isEnd: false,
                isCross: false,
                isDisabled: false
            });

            thisMonthDates--;
        }

        // 向前补足缺口
        // 计算需要补足的天数
        let preMonth = new Date(dateTime);
        preMonth.setDate(1);
        let preDays = preMonth.getDay();
        let preMonthDays = this.getMonthDays(new Date().setMonth(new Date(dateTime).getMonth() - 1));
        // 记录能选择的第一个索引
        this.firstCanSelect = preDays;
        while(preDays > 0) {
            res.unshift({
                label: preMonthDays--,
                isDisabled: true
            });

            preDays--;
        }

        // 记录能选择的最后一个索引
        this.lastCanSelect = res.length - 1;

        // 向后补足缺口
        let appendDate = 1;
        // 需要向后补足的天数
        let appendDays = res.length % 7 === 0 ? 0 : 7 - res.length % 7;
        while(appendDate <= appendDays) {
            res.push({
                label: appendDate,
                isDisabled: true
            });

            appendDate++;
        }

        let tmpDate = new Date(this.dateOrigin.getTime());
        if(this.disableFilter) {
            res.forEach((it) => {
                if(it.isDisabled) return;

                tmpDate.setDate(+it.label);
                it.isDisabled = this.disableFilter(tmpDate);
            })
        }

        return res;
    }

    // 获取月份数
    getMonthDays(date) {
        let d = new Date(date);
        d.setMonth(d.getMonth() + 1);
        d.setDate(0);

        return d.getDate();
    }

    setMonth(month) {
        this.dateOrigin.setYear(this.year);
        this.dateOrigin.setMonth(month);

        this.init(this.dateOrigin);
        this.renderTable && this.renderTable();

        return this;
    }

    setYear(year) {
        this.dateOrigin.setYear(year);

        this.init(this.dateOrigin);
        this.renderTable && this.renderTable();

        return this;
    }

    setTime(type, value) {
        this.dateOrigin['set' + type](value);
        this.refresh(this.dateOrigin);

        return this;
    }

    // 前一月
    prevMonth() {
        return this.setMonth(this.month - 2);
    }

    // 后一月
    nextMonth() {
        return this.setMonth(this.month);
    }

    nextYear() {
       return this.setYear(this.year + 1);
    }

    prevYear() {
       return this.setYear(this.year - 1);
    }

    // 获取输出
    getOutput(date) {
        // 年月日格式化输出
        let formatArr = this.format.split(' ');
        let ymd = this.getOutputYMD(formatArr[0]);
        let hms = '';
        if(formatArr[1]) {
            hms = this.getOutputHMS(formatArr[1])
        }

        return hms ? ymd + ' ' + hms : ymd;
    }

    // 年月日格式化输出
    getOutputYMD(format) {
        return format.replace(/(\w*)(\W)?(\w*)\W(\w*)/, ($0, $1, $2, $3, $4) => {
            let str = [];
            if($1) str.push(this.year);
            if($3) str.push(this.month);
            if($4) str.push(this.date);

            return str.join($2);
        });
    }

    // 时分秒格式化输出
    getOutputHMS(format) {
        return format.replace(/(\w*)(\W)?(\w*)\W(\w*)/, ($0, $1, $2, $3, $4) => {
            let str = [];
            if($1) str.push(this.hour);
            if($3) str.push(this.minute);
            if($4) str.push(this.second);

            return str.join($2);
        });
    }

    // 根据传入时间刷新数据对象
    refresh(date, isInit) {
        this.dateOrigin = new Date(date);
        // reset hms
        if(isInit) this.resetHMS(date);

        // y-m-d
        this.year = this.dateOrigin.getFullYear();
        this.month = this.appendZero((this.dateOrigin.getMonth() + 1));
        this.date = this.appendZero(this.dateOrigin.getDate());

        // h:m:s
        this.hour = this.appendZero(this.dateOrigin.getHours());
        this.minute = this.appendZero(this.dateOrigin.getMinutes());
        this.second = this.appendZero(this.dateOrigin.getSeconds());

        this.outPutRes = this.getOutput(this.dateOrigin);
    }

    // 清除所有样式标识
    clearAllState() {
        this.dateList.forEach((it) => {
            it.isCross = false;
            it.isActive = false;
            it.isStart = false;
            it.isEnd = false;
        });
    }

    // 设置下一个关联的dateX对象
    setNextDateX(dateObj) {
        this.nextDateX = dateObj;
    }

    // 设置下一个关联的dateX对象
    setPrevDateX(dateObj) {
        this.prevDateX = dateObj;
    }

    hasHMS() {
        return this.format.split(' ')[1];
    }

    resetHMS(date) {
        if(this.hasHMS() && !/\W/.test(date)) return;

        this.dateOrigin.setHours('00');
        this.dateOrigin.setMinutes('00');
        this.dateOrigin.setSeconds('00');
    }
}

export default DateX;