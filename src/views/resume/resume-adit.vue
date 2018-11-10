<template>
    <section class="resume-adit">
        <my-head :title='title'
                 @goBack="goBack"></my-head>
        <section class="resume-center">
            <section class="resume-detail">
                <div class="resume-item">
                    <span class="item-left">姓名</span>
                    <div class="item-right">
                        <input type="text"
                               maxlength="10"
                               v-model="personname"
                               placeholder="请输入姓名"
                               class="get-name" />
                    </div>
                </div>
                <div class="resume-item">
                    <span class="item-left">性别</span>
                    <div class="item-right"
                         @click="chooseSex('sex')">
                        <span class="select-end"
                              placeholder="请选择">{{choosedsex.name}}</span>
                        <img src="@/assets/image/but_back.png"
                             alt=""
                             class="arrow-img" />
                    </div>
                </div>
                <div class="resume-item">
                    <span class="item-left">生日</span>
                    <div class="item-right"
                         @click="openDate()">
                        <span class="select-end"
                              placeholder="请选择">{{chooseBorth}}</span>
                        <img src="@/assets/image/but_back.png"
                             alt=""
                             class="arrow-img" />
                    </div>
                </div>
                <div class="resume-item">
                    <span class="item-left">最高学历</span>
                    <div class="item-right"
                         @click="chooseSex('education')">
                        <span class="select-end"
                              placeholder="请选择">{{choosededu.name}}</span>
                        <img src="@/assets/image/but_back.png"
                             alt=""
                             class="arrow-img" />
                    </div>
                </div>
                <div class="resume-item">
                    <span class="item-left">参加工作年份</span>
                    <div class="item-right"
                         @click="openDateWork()">
                        <span class="select-end"
                              placeholder="请选择">{{chooseWork ?`${chooseWork}年`:''}}</span>
                        <img src="@/assets/image/but_back.png"
                             alt=""
                             class="arrow-img" />
                    </div>
                </div>
                <div class="resume-item">
                    <span class="item-left">曾经做过</span>
                    <div class="item-right"
                         @click="getWork('old')">
                        <span class="select-end ellipsis"
                              placeholder="请选择">{{doneWorkname.join(',')}}</span>
                        <img src="@/assets/image/but_back.png"
                             alt=""
                             class="arrow-img" />
                    </div>
                </div>
                <div class="resume-item">
                    <span class="item-left">期望工作</span>
                    <div class="item-right"
                         @click="getWork('new')">
                        <span class="select-end ellipsis"
                              placeholder="请选择">{{expectWorkname.join(',')}}</span>
                        <img src="@/assets/image/but_back.png"
                             alt=""
                             class="arrow-img" />
                    </div>
                </div>
            </section>
            <section class="tel-part">
                <input v-model="telphone"
                       type="tel"
                       @input="telphone = telphone.replace(/[^\d]/g,'')"
                       maxlength="13"
                       class="username"
                       ref="inputNum"
                       required="required"
                       placeholder="请输入手机号码" />
                <div class="verify-code clear">
                    <input v-model="codetel"
                           type="number"
                           ref="inputCode"
                           placeholder="请输入验证码" />
                    <button href="javascript:;"
                            v-if="show"
                            @click="clickcode"
                            :disabled="isDisable">{{getcodetext}}(默认:123456)
                    </button>
                    <button href="javascript:;"
                            v-else>{{count}}s</button>

                </div>
            </section>
            <section class="submit-fix">
                <button @click="goSubmit"
                        :disabled="subStatus">提交</button>
            </section>
        </section>

        <!-- 生日 -->
        <mt-datetime-picker v-model="pickerVisible"
                            class="datetime-part"
                            @touchmove.prevent
                            ref="picker"
                            type="date"
                            :closeOnClickModal="closeOnClickModal"
                            year-format="{value} 年"
                            month-format="{value} 月"
                            date-format="{value} 日"
                            :startDate="startDate"
                            @confirm="handleConfirm"
                            @cancel="checkinCancel">
        </mt-datetime-picker>
        <mt-datetime-picker v-model="workVisible"
                            @touchmove.prevent
                            :closeOnClickModal="closeOnClickModal"
                            class="datetime-part year-part"
                            ref="workPicker"
                            type="date"
                            year-format="{value} 年"
                            month-format="{value} 月"
                            date-format="{value} 日"
                            :startDate="startDate"
                            @confirm="handleConfirmWork"
                            @cancel="checkinCancel">
        </mt-datetime-picker>
        <!-- 性别和学历选择 -->
        <mt-popup v-if="popupSex"
                  class="popup-sex"
                  :closeOnClickModal="closeOnClickModal"
                  v-model="popupSex"
                  @touchmove.prevent
                  position="bottom">
            <div class="popup-top">
                <span @click="cancel">取消</span>
                <span @click="query">确定</span>
            </div>
            <mt-picker v-if="chooseType === 'sex'"
                       :slots="sex"
                       value-key="name"
                       @change="onValuesChangeSex"></mt-picker>
            <mt-picker v-if="chooseType === 'education'"
                       :slots="education"
                       value-key="name"
                       @change="onValuesChangeEdu"></mt-picker>
        </mt-popup>

        <choose-position ref="getPosition"
                         :workChoose="workChoose"
                         @childBack="childBack"
                         @queryChoose="queryChoose"></choose-position>
    </section>
</template>
<script>
import { Toast } from 'mint-ui'
import myHead from '@/components/head.vue'
import choosePosition from './choose-position.vue'
import pulgin from '@/assets/api/pulgin'

export default {
    components: {
        myHead,
        choosePosition
    },
    watch: {
        telphone(newValue, oldValue) {
            if (newValue > oldValue) {
                var mLength = newValue.length
                if (mLength <= 3) {
                    this.telphone = newValue
                } else {
                    if (mLength <= 7) {
                        this.telphone =
                            newValue.substring(0, 3) +
                            ' ' +
                            newValue.substring(3, mLength)
                    } else {
                        this.telphone =
                            newValue.substring(0, 3) +
                            ' ' +
                            newValue.substring(3, 7) +
                            ' ' +
                            newValue.substring(7, mLength)
                    }
                }
            }
        },
        signReasonVisible: function(newvs, oldvs) {
            //picker关闭没有回调函数，所以侦听该属性替代
            if (newvs) {
                this.closeTouch()
            } else {
                this.openTouch()
            }
        }
    },
    data() {
        return {
            closeOnClickModal:false,
            handler: function(e){
                e.preventDefault()
            },
            subStatus: false, // 提交按钮
            telphone: '', // 手机号
            codetel: '', // 验证码
            getcodetext: '获取验证码',
            count: '', // 计时
            show: true,
            isDisable: false, //点击验证码按钮之后
            personname: '', //姓名
            doneWorkid: [], //曾经做过
            expectWorkid: [], // 期望工作
            doneWorkname: [], //曾经做过
            expectWorkname: [], // 期望工作
            workChoose: false,
            pickerVisible: new Date('1990/1/1'), // 生日
            workVisible: new Date(), // 工作年份
            chooseWork: '',
            chooseBorth: '',
            startDate: new Date('1950/1/1'),
            title: '录简历赚钱',
            popupSex: false, // 性别选择
            choosedsex: {}, // 性别选择
            choosededu: {}, // 学历选择
            chooseType: '',
            value: '',
            sex: [
                {
                    values: [
                        { name: '男', index: 1 },
                        { name: '女', index: 2 }
                    ],
                    defaultIndex: 0
                }
            ],
            education: [
                {
                    values: [],
                    defaultIndex: 0
                }
            ]
        }
    },
    created() {
        this.getEducation()
        this.queryChoose();
    },
    beforeRouteLeave(to, from, next) {
        this.removeItemPart()
        next()
    },
    mounted() {
        this.removeItemPart()
    },
    methods: {

        removeItemPart() {
            localStorage.removeItem('expect')
            localStorage.removeItem('newArry')
            localStorage.removeItem('already')
            localStorage.removeItem('alreadyArry')
        },
        getEducation() {
            this.$api.resumeEducation().then(res => {
                console.log(res)
                let eduData = res.data
                Object.keys(eduData).forEach(key => {
                    this.education[0].values.push({
                        name: eduData[key],
                        index: key
                    })
                })
            })
        },
        goSubmit() {
            // 提交
            if (!this.personname) {
                Toast('请输入姓名')
                return
            }
            if (!this.choosedsex.name) {
                Toast('请选择性别')
                return
            }
            if (!this.chooseBorth) {
                Toast('请选择生日')
                return
            }
            if (!this.choosededu.name) {
                Toast('请选择最高学历')
                return
            }
            if (!this.chooseWork) {
                Toast('请选择参加工作年份')
                return
            }
            if (!this.chooseWork) {
                Toast('请选择参加工作年份')
                return
            }
            if (this.doneWorkid.length == 0) {
                Toast('请选择曾经做过的工作')
                return
            }
            if (this.expectWorkid.length == 0) {
                Toast('请选择期望的工作')
                return
            }
            this.testTel()
            if (!this.codetel) {
                Toast('请输入验证码')
                return
            }
            let params = {
                name: this.personname,
                sex_id: this.choosedsex.index,
                birthday: this.chooseBorth,
                education_id: this.choosededu.index,
                work_year: this.chooseWork,
                ever_worked: this.doneWorkid.join(','),
                expect_work: this.expectWorkid.join(','),
                mobile: this.telphone.replace(/\s+/g, ''),
                captcha: this.codetel,
                sharer_id: localStorage.getItem('resumeId')
            }
            this.subStatus = true
            this.$api
                .resumeDeliver(params)
                .then(res => {
                    this.subStatus = false
                    console.log(res)
                    if (res.code === 0) {
                        localStorage.setItem(
                            'resumeBackData',
                            JSON.stringify(res.data)
                        )
                        this.$router.replace({ name: 'submit-result' })
                    }
                })
                .catch(err => {
                    this.subStatus = false
                })
        },
        testTel() {
            //校验手机号
            let tele = this.telphone.replace(/\s+/g, '')
            if (tele == '') {
                Toast('请输入手机号码')
                return false
            } else {
                return true
            }
            let reg = /^[1][3456789][0-9]{9}$/
            if (!reg.test(tele)) {
                Toast('请输入正确的手机号码')
                return false
            } else {
                return true
            }
        },
        clickcode() {
            //发送验证码
            if (this.testTel()) {
                // this.isDisable = true
                // this.$api
                //     .captchaSend({
                //         mobile: this.telphone.replace(/\s+/g, '')
                //     })
                //     .then(res => {
                        // this.isDisable = false
                        // if (res.code === 0) {
                            Toast('发送成功')
                            const TIME_COUNT = 60
                            if (!this.timer) {
                                this.count = TIME_COUNT
                                this.show = false
                                this.timer = setInterval(() => {
                                    if (
                                        this.count > 0 &&
                                        this.count <= TIME_COUNT
                                    ) {
                                        this.count--
                                    } else {
                                        this.show = true
                                        this.getcodetext = '重新发送'
                                        clearInterval(this.timer)
                                        this.timer = null
                                    }
                                }, 1000)
                            }
                        // }
                    // })
            }
        },
        childBack(value) {
            //子级返回
            console.log(value)
            this.workChoose = false
            this.refetchTitle()
        },
        refetchTitle() {
            document.title = '录简历赚钱'
        },
        queryChoose() {
            this.workChoose = false
            if (localStorage.getItem('expect')) {
                this.expectWorkid = JSON.parse(localStorage.getItem('expect'))
                this.expectWorkname = JSON.parse(
                    localStorage.getItem('newArry')
                )
            }
            if (localStorage.getItem('already')) {
                this.doneWorkid = JSON.parse(localStorage.getItem('already'))
                this.doneWorkname = JSON.parse(
                    localStorage.getItem('alreadyArry')
                )
            }
        },
        getWork(type) {
            //岗位选择
            this.workChoose = true
            if (type === 'new') {
                // 期望
                this.$refs.getPosition.$data.paramsId = 1
            } else if (type === 'old') {
                // 曾经
                this.$refs.getPosition.$data.paramsId = 2
            }
            this.$refs.getPosition.getParamsId()
        },
        /*解决iphone页面层级相互影响滑动的问题*/
        closeTouch() {
            document
                .getElementsByTagName('body')[0]
                .addEventListener('touchmove', this.handler, { passive: false }) //阻止默认事件
        },
        openTouch(e) {
            document
                .getElementsByTagName('body')[0]
                .removeEventListener('touchmove', this.handler, {
                    passive: false
                }) //打开默认事件
        },
        handleConfirm() {
            //生日确认
            this.openTouch();
            console.log(this.pickerVisible)
            this.chooseBorth = pulgin.getTime(this.pickerVisible)
        },
        handleConfirmWork() {
            //工作年份确认
            this.openTouch();
            if (this.workVisible) {
                this.chooseWork = this.workVisible.getFullYear().toString()
            }
        },
        checkinCancel(){
            this.openTouch();
        },
        openDate() {
            // 打开日历
            this.closeTouch();
            this.$refs.picker.open()
        },
        openDateWork() {
            // 打开参加工作年份
            this.closeTouch();
            this.$refs.workPicker.open()
        },
        query() {
            //确定
            this.popupSex = false
            this.openTouch();
            if (this.chooseType === 'sex') {
                this.choosedsex = this.value
                return
            }
            if (this.chooseType === 'education') {
                this.choosededu = this.value
                return
            }
        },
        cancel() {
            //取消
            this.openTouch();
            this.popupSex = false
        },
        onValuesChangeSex(picker, values) {
            // 下拉菜单
            this.value = values[0]
            if (this.choosedsex && this.choosedsex.name) {
                // console.log(55);
                this.sex[0].defaultIndex = this.choosedsex.index - 1
            }
        },
        onValuesChangeEdu(picker, values) {
            // 下拉菜单
            this.value = values[0]
            if (this.choosededu && this.choosededu.name) {
                // console.log(55);
                this.education[0].defaultIndex = this.choosededu.index - 1
            }
        },
        chooseSex(value) {
            // 列表点击
            this.chooseType = value
            this.popupSex = true;
            this.closeTouch();
        },
        goBack() {
            this.$router.push({ name: 'share-resume' })
        }
    }
}
</script>
<style scoped lang="less">
@import './less/resumeadit.less';
</style>
<style lang="less">
.popup-sex {
    .picker-slot-center {
        width: 100%;
        .picker-slot-wrapper {
            width: 100%;
            .picker-item {
                width: 100%;
            }
        }
    }
    .popup-top {
        background: #f3f3f3;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        span {
            display: block;
            width: 130px;
            text-align: center;
            color: #73bde2;
            font-size: 30px;
            line-height: 94px;
        }
        span:active {
            color: #65b9c9;
        }
    }
}
</style>

