<!--
   datepicker 日期选择器

   @require input
   @require button
   @require step-input

   @param {Boolean} isRange 是否是范围类型的日期选择器
   @param {} rangeData 传入日期范围,包括startTime和endTime
   @param {} time 传入的日期,当isRange为false时使用
   @param {String} format 日期的输出格式,现在支持 "YYYY-MM-DD hh:mm:ss"
   @param {Boolean} hasFooterProxy 是否有确定,取消两个按钮,当isRange和有时分秒的情况下不起作用
   @param {Function} disableFilter 禁用过滤器,日期根据返回值直接禁用过滤器
   @param {Boolean} isForceRefresh 是否强制刷新,为true时,每次都调用禁用过滤器
   @param {Boolean} isDisabled 日期选择器是否禁用
   @param {Function} onOk 确定按钮回调
   @param {Function} onCancel 取消按钮回调
   @param {Function} onSuccess 选中按钮回调
   @param {Function} onOpen 当日期选择器打开时触发，传入mouseEvent
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->
<template>
    <div>
        <!-- 按钮 -->
        <div :class="['vc-datepicker-btn', appendClass, {lager: isRange, hms: hasHMS && isRange, 'hms-no-range': hasHMS && !isRange, disabled: isDisabled}]"
             :style="appendStyle" @click.stop="showDatepicker">
            <span class="vc-datepicker-btn-input">
                <div class="vc-datepicker-result">{{outputStr}}</div>
            </span>
            <span class="vc-datepicker-btn-icon">
                <i class="vci vci-datepicker"></i>
            </span>
        </div>
        <!-- 按钮 end -->

        <!-- 日期选择框体1 -->
        <div class="vc-datepicker" v-show="isShowDatePicker">
            <div v-if="isReady" class="vc-datepicker-content">
                <!-- 起始日期表 -->
                <table class="vc-datepicker-table">
                    <caption>
                        <a href="javascript:void(0)" @click.stop="prevMonth(dateStart)">
                            <i class="vci vc-datepicker-prev"></i>
                        </a>
                        <div>
                            <pv-step-input date-obj="dateStart"
                                           :append-style="{'border-color': '#e5e9ec'}"
                                           :style="{width: '67px'}" :min="1970" :max="9999"
                                           :size="'xsmall'"
                                           :value="dateStart.year"
                                           :on-change="setYear"
                                           :on-up="nextYear"
                                           :on-down="prevYear"
                                           :is-only-click="true">
                            </pv-step-input>
                            年
                            <pv-step-input date-obj="dateStart"
                                           :append-style="{'border-color': '#e5e9ec'}"
                                           :style="{width: '55px'}" :size="'xsmall'"
                                           :min="1" :max="12"
                                           :value="dateStart.month"
                                           :on-change="setMonth"
                                           :on-up="nextMonth"
                                           :on-down="prevMonth"
                                           :is-only-click="true">
                            </pv-step-input>
                            月
                        </div>
                        <a href="javascript:void(0)">
                            <i class="vci vc-datepicker-next" @click.stop="nextMonth(dateStart)"></i>
                        </a>
                    </caption>
                    <thead>
                    <tr>
                        <th>日</th>
                        <th>一</th>
                        <th>二</th>
                        <th>三</th>
                        <th>四</th>
                        <th>五</th>
                        <th>六</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(it, index) in dateStart.dateList">
                        <template v-if="(index + 1) % 7 === 1">
                            <tr>
                        </template>
                        <template>
                            <td :class="{disabled: it.isDisabled, 'active': it && it.isActive
                                    , 'start': it && it.isStart, 'end': it && it.isEnd, 'cross': it && it.isCross}"
                                @click="dateSelect(dateStart, index, 'dateStart')">
                                {{it.label}}
                            </td>
                        </template>
                        <template v-if="(index + 1) % 7 === 0">
                            </tr>
                        </template>
                    </template>
                    </tbody>
                </table>
                <!-- 起始日期表 end -->
                <!-- 结束日期表 -->
                <table class="vc-datepicker-table" v-if="isRange">
                    <caption>
                        <a href="javascript:void(0)" @click.stop="prevMonth(dateEnd)">
                            <i class="vci vc-datepicker-prev"></i>
                        </a>
                        <div>
                            <pv-step-input date-obj="dateEnd"
                                           :append-style="{'border-color': '#e5e9ec'}"
                                           :style="{width: '67px'}" :min="1970" :max="9999"
                                           :size="'xsmall'"
                                           :value="dateEnd.year"
                                           :on-change="setYear"
                                           :on-up="nextYear"
                                           :on-down="prevYear"
                                           :is-only-click="true">
                            </pv-step-input>
                            年
                            <pv-step-input date-obj="dateEnd"
                                           :append-style="{'border-color': '#e5e9ec'}"
                                           :style="{width: '55px'}" :size="'xsmall'"
                                           :min="1" :max="12"
                                           :value="dateEnd.month"
                                           :on-change="setMonth"
                                           :on-up="nextMonth"
                                           :on-down="prevMonth"
                                           :is-only-click="true">
                            </pv-step-input>
                            月
                        </div>
                        <a href="javascript:void(0)">
                            <i class="vci vc-datepicker-next" @click.stop="nextMonth(dateEnd)"></i>
                        </a>
                    </caption>
                    <thead>
                    <tr>
                        <th>日</th>
                        <th>一</th>
                        <th>二</th>
                        <th>三</th>
                        <th>四</th>
                        <th>五</th>
                        <th>六</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(it, index) in dateEnd.dateList">
                        <template v-if="(index + 1) % 7 === 1">
                            <tr>
                        </template>
                        <template>
                            <td :class="{disabled: it.isDisabled, 'active': it && it.isActive
                                    , 'start': it && it.isStart, 'end': it && it.isEnd, 'cross': it && it.isCross}"
                                @click="dateSelect(dateEnd, index, 'dateEnd')">
                                {{it.label}}
                            </td>
                        </template>
                        <template v-if="(index + 1) % 7 === 0">
                            </tr>
                        </template>
                    </template>
                    </tbody>
                </table>
                <!-- 结束日期表 end -->
            </div>
            <div v-if="hasFooterProxy || hasHMS" class="vc-datepicker-footer">
                <div v-if="hasHMS" class="vc-datepicker-footer-content">
                    <div>
                        <!-- start 小时,分钟,秒 -->
                        <pv-step-input date-obj="dateStart"
                                       :append-style="{'border-color': '#e5e9ec'}"
                                       :style="{width: '55px'}" :size="'xsmall'"
                                       :min="0" :max="23"
                                       :value="dateStart.hour"
                                       :on-change="setHour"
                                       :on-up="nextHour"
                                       :on-down="nextHour"
                                       :is-only-click="true">
                        </pv-step-input>:
                        <pv-step-input date-obj="dateStart"
                                       :append-style="{'border-color': '#e5e9ec'}"
                                       :style="{width: '55px'}" :size="'xsmall'"
                                       :min="0" :max="59"
                                       :value="dateStart.minute"
                                       :on-change="setMinute"
                                       :on-up="nextMinute"
                                       :on-down="prevMinute"
                                       :is-only-click="true">
                        </pv-step-input>:
                        <pv-step-input date-obj="dateStart"
                                       :append-style="{'border-color': '#e5e9ec'}"
                                       :style="{width: '55px'}" :size="'xsmall'"
                                       :min="0" :max="59"
                                       :value="dateStart.second"
                                       :on-change="setSecond"
                                       :on-up="nextSecond"
                                       :on-down="prevSecond"
                                       :is-only-click="true">
                        </pv-step-input>
                        <!-- start 小时,分钟,秒 end -->
                        <span v-if="isRange">
                            至
                            <!-- end 小时,分钟,秒 -->
                            <pv-step-input date-obj="dateEnd"
                                           :append-style="{'border-color': '#e5e9ec'}"
                                           :style="{width: '55px'}" :size="'xsmall'"
                                           :min="0" :max="23"
                                           :value="dateEnd.hour"
                                           :on-change="setHour"
                                           :on-up="nextHour"
                                           :on-down="nextHour"
                                           :is-only-click="true">
                            </pv-step-input>:
                            <pv-step-input date-obj="dateEnd"
                                           :append-style="{'border-color': '#e5e9ec'}"
                                           :style="{width: '55px'}" :size="'xsmall'"
                                           :min="0" :max="59"
                                           :value="dateEnd.minute"
                                           :on-change="setMinute"
                                           :on-up="nextMinute"
                                           :on-down="prevMinute"
                                           :is-only-click="true">
                            </pv-step-input>:
                            <pv-step-input date-obj="dateEnd"
                                           :append-style="{'border-color': '#e5e9ec'}"
                                           :style="{width: '55px'}" :size="'xsmall'"
                                           :min="0" :max="59"
                                           :value="dateEnd.second"
                                           :on-change="setSecond"
                                           :on-up="nextSecond"
                                           :on-down="prevSecond"
                                           :is-only-click="true">
                            </pv-step-input>
                            <!-- end 小时,分钟,秒 end -->
                        </span>
                    </div>
                </div>
                <br v-if="!isRange" />
                <div :class="['vc-datepicker-footer-btns', {'range-btn': !isRange}]">
                    <pv-button :type="'primary'" :size="'small'" @click.native.stop="onOkFn">确定</pv-button>
                    <pv-button :type="'outline'" :size="'small'" @click.native.stop="onCancelFn">取消</pv-button>
                </div>
            </div>
        </div>
        <!-- 日期选择框体1 end -->
    </div>
</template>

<script>
    import pvInput from '../input';
    import pvButton from '../button';
    import pvStepInput from '../step-input';
    import {componentBaseParamConfig} from '../base-config';
    import DateX from './dateUtils';
    import Vue from 'vue';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            isRange: {
                type: Boolean,
                default: false
            },
            rangeData: {
                type: Object
            },
            value: {
                type: [String, Number]
            },
            format: {
                type: String,
                default: 'YYYY-MM-DD'
            },
            hasFooter: {
                type: Boolean,
                default: false
            },
            disableFilter: {
                type: Function
            },
            isForceRefresh: {
                type: Boolean,
                default: false
            },
            isDisabled: {
                type: Boolean,
                default: false
            },
            onOk: {
                type: Function
            },
            onCancel: {
                type: Function
            },
            onSuccess: {
                type: Function
            },
            onOpen: {
                type: Function
            }
        }),
        data() {
            // 范围选择,将展示两个月历
            if(this.isRange) {
                return {
                    dateRes: Date.now(),
                    dateStart: new DateX({date: this.rangeData.startTime, format: this.format, disableFilter: this.disableFilter}),
                    dateEnd: new DateX({date: this.rangeData.endTime, format: this.format, disableFilter: this.disableFilter}),
                    isReady: false,
                    tableName: '',
                    tableNameEnd: '',
                    startDate: -1,
                    endDate: -1,
                    outputStr: '',
                    outputStart: '',
                    outputEnd: '',
                    hasHMS: this.format.split(' ')[1],
                    isShowDatePicker: false,
                    hasFooterProxy: this.hasFooter
                }
            }

            return {
                dateRes: Date.now(),
                dateStart: new DateX({date: this.value, format: this.format, disableFilter: this.disableFilter}),
                isReady: false,
                tableName: '',
                startDate: -1,
                endDate: -1,
                outputStr: '',
                hasHMS: this.format.split(' ')[1],
                isShowDatePicker: false,
                hasFooterProxy: this.hasFooter
            }
        },
        components: {
            pvInput,
            pvStepInput,
            pvButton
        },
        methods: {
            // 展示
            showDatepicker(ev) {
                if(this.isDisabled) return;

                this.isShowDatePicker = true;
                this.onOpen && this.onOpen(ev);
            },

            // 确定按钮
            onOkFn() {
                this.resultOutput(true);
                this.onOk && this.onOk();
                this.isShowDatePicker = false;
            },

            // 取消按钮
            onCancelFn() {
                this.onCancel && this.onCancel();
                this.isShowDatePicker = false;
            },

            // step-input,无法传入具体参数,所以通过属性的方式传递
            getDateObj(vm) {
                return vm.$parent[vm.$el.getAttribute('date-obj')]
            },

            // 年
            nextYear(value, stepVm) {
                let dateObj = this.getDateObj(stepVm);
                dateObj.nextYear();
                this.clearSelectDate(dateObj);
            },
            prevYear(value, stepVm) {
                let dateObj = this.getDateObj(stepVm);
                dateObj.prevYear();
                this.clearSelectDate(dateObj);
            },
            setYear(value, stepVm) {
                let dateObj = this.getDateObj(stepVm);
                dateObj.setYear(value);
            },

            // 月
            prevMonth(dateObj, stepVm) {
                // 双框联动
                if(this.isRange && dateObj && dateObj.nextDateX) dateObj.nextDateX.prevMonth();
                if(stepVm) dateObj = this.getDateObj(stepVm);
                dateObj.prevMonth();

                this.clearSelectDate(dateObj);
            },
            nextMonth(dateObj, stepVm) {
                // 双框联动
                if(this.isRange && dateObj && dateObj.prevDateX) dateObj.prevDateX.nextMonth();
                if(stepVm) dateObj = this.getDateObj(stepVm);
                dateObj.nextMonth();

                this.clearSelectDate(dateObj);
            },
            setMonth(value, stepVm) {
                let dateObj = this.getDateObj(stepVm);
                dateObj.setMonth(value - 1);
            },

            // 小时
            nextHour(val, stepVm) {
                this.setHour(val, stepVm);
            },
            prevHour(val, stepVm) {
                this.setHour(val, stepVm);
            },
            setHour(val, stepVm) {
                let dateObj = this.getDateObj(stepVm);
                dateObj.setTime('Hours', val);
                this.resultOutput();
            },

            // 分钟
            nextMinute(val, stepVm) {
                this.setMinute(val, stepVm);
            },
            prevMinute(val, stepVm) {
                this.setMinute(val, stepVm);
            },
            setMinute(val, stepVm) {
                let dateObj = this.getDateObj(stepVm);
                dateObj.setTime('Minutes', val);
                this.resultOutput();
            },

            // 秒
            nextSecond(val, stepVm) {
                this.setSecond(val, stepVm);
            },
            prevSecond(val, stepVm) {
                this.setSecond(val, stepVm);
            },
            setSecond(val, stepVm) {
                let dateObj = this.getDateObj(stepVm);
                dateObj.setTime('Seconds', val);
                this.resultOutput();
            },

            // 日期选择后的样式输出,初始化时不进行值输出
            dateSelect(dateObj, index, dateObjName, isInit = false) {
                let dateList = dateObj.dateList;
                let date = dateList[index];
                if(date.isDisabled && !isInit) return;

                // 多选
                if(this.isRange) {
                    this.clearSelectStyle(dateObj);

                    // 范围选择
                    if(this.startDate === -1) {
                        this.startDate = dateObjName + ',' + index;
                        this.nextSelectIndex = 'endDate';
                        date.isActive = true;
                        return;
                    } else if(this.endDate === -1) {
                        this.endDate = dateObjName + ',' + index;
                        this.nextSelectIndex = 'startDate';
                    } else {
                        this.nextSelectIndex = this.nextSelectIndex === 'startDate' ? 'endDate' : 'startDate';
                        this[this.nextSelectIndex] = dateObjName + ',' + index;
                    }

                    // 当选择端点时
                    if(this.startDate === this.endDate && this.startDate !== -1 && this.endDate != -1) {
                        let tmpArr = this.startDate.split(',');
                        this[tmpArr[0]].dateList[tmpArr[1]].isActive = true;

                        this.resultOutputWithDate(isInit);
                        return;
                    }

                    let startDateArr = this.startDate.split(',');
                    let endDateArr = this.endDate.split(',');
                    let start = '';
                    let end = '';

                    // 展示,同一日历
                    if(startDateArr[0] === endDateArr[0]) {
                        start = parseInt(startDateArr[1]);
                        end = parseInt(endDateArr[1]);
                        if (start > end) [start, end] = [end, start];

                        dateList[start].isStart = true;
                        dateList[end].isEnd = true;
                        for (let i = start + 1; i < end; i++) {
                            if(!dateList[i].isDisabled) dateList[i].isCross = true;
                        }
                    } else {
                        if(startDateArr[0] === 'dateEnd') {
                            [startDateArr, endDateArr] = [endDateArr, startDateArr];
                        }

                        // dateStart处理
                        start = parseInt(startDateArr[1]);
                        end = parseInt(this.dateStart.lastCanSelect);
                        this.dateStart.dateList[start].isStart = true;
                        for (let i = start + 1; i <= end; i++) {
                            if(!this.dateStart.dateList[i].isDisabled) this.dateStart.dateList[i].isCross = true;
                        }

                        // date2处理
                        start = parseInt(this.dateEnd.firstCanSelect);
                        end = parseInt(endDateArr[1]);
                        this.dateEnd.dateList[end].isEnd = true;
                        for (let i = start; i < end; i++) {
                            if(!this.dateEnd.dateList[i].isDisabled) this.dateEnd.dateList[i].isCross = true;
                        }
                    }

                    // 输出
                    this.resultOutputWithDate(isInit);
                } else {
                    if(this.startDate != -1) dateList[this.startDate].isActive = false;
                    this.startDate = +index;
                    // 重置输出数据,刷新数据对象
                    dateObj.refresh(dateObj.dateOrigin.setDate(dateList[this.startDate].label));

                    if(isInit) this.outputStr = dateObj.outPutRes;

                    date.isActive = true;
                    if(!this.hasFooterProxy && !isInit) {
                        this.outputStr = dateObj.outPutRes;
                        // 输出结果
                        this.$emit('input', this.outputStr);
                        this.isShowDatePicker = false;
                        this.onSuccess && this.onSuccess(this.value);
                    }
                }
            },
            clearSelectDate(dateObj) {
                this.startDate = -1;
                this.endDate = -1;

                this.clearSelectStyle(dateObj);
            },

            clearSelectStyle(dateObj) {
                // 先清空样式
                dateObj.clearAllState();
                dateObj.nextDateX && dateObj.nextDateX.clearAllState();
                dateObj.prevDateX && dateObj.prevDateX.clearAllState();
            },

            // 结果输出
            resultOutput(onOk) {
                if(!onOk && this.hasFooterProxy) return;

                if(this.isRange) {
                    this.rangeData.startTime = this.outputStart = this.startDateX.outPutRes;
                    this.rangeData.endTime = this.outputEnd = this.endDateX.outPutRes;
                    this.outputStr = this.rangeData.startTime + ' 至 ' + this.rangeData.endTime;
                    return;
                }

                this.outputStr = this.dateStart.outPutRes;

                if(onOk && !this.isRange) {
                    // 输出结果
                    this.$emit('input', this.outputStr);
                }
            },
            resultOutputWithDate(isInit) {
                if(this.isRange) {
                    // 起始日期
                    let startArr = this.startDate.split(',');
                    let startYear = this[startArr[0]].year;
                    let startMonth = this[startArr[0]].month;
                    let startDate = this[startArr[0]].dateList[+startArr[1]].label;
                    let startDateX = new DateX({
                        date: [startYear, startMonth, startDate].join('/'),
                        format: this.format,
                        isInit: false
                    });
                    // 结束日期
                    let endArr = this.endDate.split(',');
                    let endYear = this[endArr[0]].year;
                    let endMonth = this[endArr[0]].month;
                    let endDate = this[endArr[0]].dateList[+endArr[1]].label;
                    let endDateX = new DateX({
                        date: [endYear, endMonth, endDate].join('/'),
                        format: this.format,
                        isInit: false
                    });
                    // 输出值
                    if(endDateX.dateOrigin.getTime() < startDateX.dateOrigin.getTime()) [startDateX, endDateX] = [endDateX, startDateX];
                    if(isInit || (!this.hasFooterProxy)) {
                        this.outputStart = startDateX.outPutRes;
                        this.outputEnd = endDateX.outPutRes;
                        this.outputStr = startDateX.outPutRes + ' 至 ' + endDateX.outPutRes;
                    }

                    this.startDateX = startDateX;
                    this.endDateX = endDateX;

                    if(!this.hasFooterProxy && !isInit) {
                        this.resultOutput(true);
                    }

                    return;
                } else {
                    this.outputStr = this.dateStart.outPutRes;
                }
            },

            // 初始化日期对象和日期组件渲染
            initDataAndRender(isInit) {
                // 选中
                if(this.isRange) {
                    // 两个月历联系起来
                    this.dateStart.setNextDateX(this.dateEnd);
                    this.dateEnd.setPrevDateX(this.dateStart);

                    // 初始化
                    if(this.dateStart.month === this.dateEnd.month && this.dateStart.year === this.dateEnd.year) {
                        this.dateSelect(this.dateStart, this.getSelectIndexWithDate(this.dateStart), 'dateStart', isInit);
                        this.dateSelect(this.dateStart, this.getSelectIndexWithDate(this.dateEnd), 'dateStart', isInit);
                    } else {
                        this.dateSelect(this.dateStart, this.getSelectIndexWithDate(this.dateStart), 'dateStart', isInit);
                        this.dateSelect(this.dateEnd, this.getSelectIndexWithDate(this.dateEnd), 'dateEnd', isInit);
                    }
                } else {
                    this.resultOutputWithDate();
                    this.dateSelect(this.dateStart, this.getSelectIndexWithDate(this.dateStart), undefined, isInit);
                }
            },
            // 根据当前日期获取选择日期的位置
            getSelectIndexWithDate(dateObj) {
                return dateObj.dateList.findIndex((it, index) => {
                    if(index <= dateObj.lastCanSelect && index >= dateObj.firstCanSelect) {
                        return +it.label === parseInt(dateObj.date, 10);
                    }
                });
            }
        },

        watch: {
            // 外部时间变化,重新初始化选择器
            value(val) {
                let time = new DateX({date: val, format: this.format, isInit: false});
                if(time.outPutRes !== this.dateStart.outPutRes) {
                    this.dateStart = new DateX({date: val, format: this.format, disableFilter: this.disableFilter});
                    this.initDataAndRender();
                }
            },

//            startTime(val) {
//                if(val !== this.outputStart) {
//                    this.dateStart = new DateX({date: val, format: this.format, disableFilter: this.disableFilter});
//                    this.initDataAndRender(true);
//                }
//            },
//
//            endTime(val) {
//                let time = new DateX({date: val, format: this.format, isInit: false});
//                if(val !== this.outputEnd) {
//                    this.dateEnd = new DateX({date: val, format: this.format, disableFilter: this.disableFilter});
//                    this.initDataAndRender(true);
//                }
//                if(this.isRange && time.year === this.rangeData.startTime.year && time.month === this.rangeData.endTime()) {
//                    this.dateEnd.nextMonth();
//                }
//            },
            isShowDatePicker(val) {
                if(!val || !this.isForceRefresh) return;

                if(this.isRange) {
                    this.dateStart = new DateX({date: this.rangeData.startTime, format: this.format, disableFilter: this.disableFilter});
                    this.dateEnd = new DateX({date: this.rangeData.endTime, format: this.format, disableFilter: this.disableFilter});
                } else {
                    this.dateStart = new DateX({date: this.value, format: this.format, disableFilter: this.disableFilter});
                }

                this.initDataAndRender(true);
            }
        },

        mounted() {
            this.isReady = true;

            if(this.hasHMS) this.hasFooterProxy = true;
            if(this.isRange) this.hasFooterProxy = true;

            this.initDataAndRender(true);

            document.addEventListener('click', () => {
                if(!this.hasFooterProxy) {
                    this.isShowDatePicker = false;
                }
            });
        }
    }
</script>

<style lang="sass">
    @import "style.scss";
</style>