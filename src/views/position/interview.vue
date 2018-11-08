<template>
    <section class="share-telphone"
             v-if="friendTel"
             @touchmove.prevent>
        <section class="share-telphone-bg"
                 @click="closeClick"></section>
        <section class="share-telphone-con">
            <section class="st-top">
                <img src="@/assets/image/but_close@2x.png"
                     alt=""
                     class="but_close"
                     @click="closeClick" />
                <h1>请留下联系方式</h1>
                <h2>以便我们尽快为您安排面试</h2>
            </section>
            <section class="st-btm">
                <section class="tel-part">
                    <input v-model="telphone"
                           type="tel"
                           @input="telphone = telphone.replace(/[^\d]/g,'')"
                           maxlength="13"
                           class="username"
                           @focus="telInput = true"
                           @blur="telInput = false"
                           :class="{'name-active':telInput}"
                           ref="inputNum"
                           required="required"
                           placeholder="请输入手机号码" />
                    <div class="verify-code clear"
                         :class="{'code-active':codeInput}">
                        <input v-model="codetel"
                               type="number"
                               ref="inputCode"
                               @focus="codeInput = true"
                               @blur="codeInput = false"
                               placeholder="请输入收到的验证码" />
                        <button href="javascript:;"
                                v-if="show"
                                @click="clickcode"
                                :disabled="isDisable">{{getcodetext}}
                        </button>
                        <button href="javascript:;"
                                v-else>{{count}}s</button>
                    </div>
                </section>
                <button class="position-submit"
                        @click="telSubmit">提交</button>
            </section>
        </section>
    </section>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    name: 'interview',
    components: {},
    props: {
        friendTel: false
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
        }
    },
    data() {
        return {
            telInput: false,
            codeInput: false,
            telphone: '', //手机号
            codetel: '', //验证码
            getcodetext: '获取验证码',
            count: '', //计时
            show: true,
            isDisable: false
        }
    },
    created() {},
    mounted() {},
    methods: {
        closeClick() {
            this.$emit('closeClick')
        },
        telSubmit() {
            // 提交
            let reg = /^[1][3456789][0-9]{9}$/
            let teleph = this.telphone.replace(/\s+/g, '')
            if (teleph == '') {
                Toast('请输入手机号码')
            } else if (this.codetel == '') {
                Toast('请输入验证码')
            } else if (!reg.test(teleph)) {
                Toast('请输入正确的手机号码')
            } else {
                this.$api
                    .jobApplication({
                        job_id: this.$parent.shareData.job_id,
                        sharer_id: this.$parent.shareData.sharer_id,
                        mobile: teleph,
                        captcha: this.codetel
                    })
                    .then(res => {
                        console.log(res)
                        if (res.code === 0) {
                            localStorage.setItem(
                                'positionData',
                                this.$parent.pageTitle
                            )
                            localStorage.setItem(
                                'positionData',
                                JSON.stringify(res.data)
                            )
                            localStorage.setItem(
                                'pageTitle',
                                this.$parent.shareData.title
                            )
                            this.$router.push({ name: 'position-result' })
                        }
                    })
            }
        },
        clickcode() {
            //发送验证码
            let tele = this.telphone.replace(/\s+/g, '')
            if (tele == '') {
                Toast('请输入手机号码')
                return false
            }
            let reg = /^[1][3456789][0-9]{9}$/
            if (!reg.test(tele)) {
                Toast('请输入正确的手机号码')
                return false
            }
            this.isDisable = true
            this.$api
                .captchaSend({
                    mobile: tele
                })
                .then(res => {
                    this.isDisable = false
                    if (res.code === 0) {
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
                    }
                })
        }
    }
}
</script>
<style lang="less" scoped>
.share-telphone {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    color: #fff;
    .share-telphone-bg {
        position: fixed;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.3;
        top: 0;
        left: 0;
        z-index: 101;
        color: #fff;
    }
    .share-telphone-con {
        position: fixed;
        width: 605px;
        left: 50%;
        top: 50%;
        margin-left: -304px;
        margin-top: -274px;
        color: #fff;
        z-index: 102;
        .st-top {
            width: 605px;
            height: 174px;
            background: url(../../assets/image/h5_bg_information@2x.png)
                no-repeat;
            background-size: 100% 100%;
            position: relative;
            padding-top: 40px;
            box-sizing: border-box;
            .but_close {
                position: absolute;
                top: 18px;
                right: 21px;
                width: 28px;
                height: 28px;
            }
            h1 {
                display: block;
                text-align: center;
                font-size: 30px;
                font-weight: 500;
                margin-bottom: 23px;
            }
            h2 {
                display: block;
                text-align: center;
                font-size: 26px;
                font-weight: 500;
            }
        }
        .st-btm {
            width: 605px;
            height: 372px;
            background: #fff;
            border-radius: 0 0 16px 16px;
            box-sizing: border-box;
            padding: 14px 40px 37px;
            .tel-part {
                box-sizing: border-box;
                background: #fff;
                .username {
                    width: 100%;
                    border: 0;
                    border-bottom: 2px solid #c8c8c8;
                    color: #232323;
                    font-size: 30px;
                    padding: 20px 0;
                    height: 56px;
                    line-height: 56px;
                }
                .name-active {
                    border-color: #ea4c56;
                }
                .verify-code {
                    width: 100%;
                    border-bottom: 2px solid #c8c8c8;
                    padding: 20px 0;
                    input {
                        width: 70%;
                        outline: none;
                        -webkit-appearance: none;
                        float: left;
                        font-size: 30px;
                        height: 68px;
                        line-height: 68px;
                        border: none;
                    }
                    button {
                        outline: none;
                        background: none;
                        border: 0;
                        width: 30%;
                        float: left;
                        font-size: 30px;
                        text-align: center;
                        color: #ea4c56;
                        height: 68px;
                    }
                    button:active {
                        color: #e63b46;
                    }
                }
                .code-active {
                    border-color: #ea4c56 !important;
                }
            }
            .position-submit {
                margin-top: 37px;
                display: block;
                width: 100%;
                height: 80px;
                font-size: 26px;
                color: #fff;
                background: #ea4c56;
                letter-spacing: 2px;
                border: 0;
            }
            .position-submit:active {
                background: #e63b46;
            }
        }
    }
}
</style>

