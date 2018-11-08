<template>
    <section class="resume-index activebg resume-active-app recommed-active">
        <app-head title="推荐好友入职"></app-head>
        <img :src="imageSrc"
             alt=""
             class="resume-img" />
        <section class="recom-type">
            <div class="recom-book clear">
                <span class="recom-title">方法一：</span>
                <div class="recom-but">
                    <button @click="commentContact">推荐通讯录好友</button>
                </div>
            </div>
            <div class="recom-book clear">
                <span class="recom-title">方法二：</span>
                <div class="recom-but clear">
                    <input type="text"
                           placeholder="请填写好友真实姓名"
                           v-model="username"
                           maxlength="10" />
                    <input type="tel"
                           maxlength="13"
                           placeholder="请填写好友手机号"
                           @input="telphone = telphone.replace(/[^\d]/g,'')"
                           v-model="telphone" />
                    <button @click="directlyRecom">直接推荐</button>
                </div>
            </div>
        </section>
        <active-rule :rule="ruleData"></active-rule>
    </section>
</template>
<script>
import { Toast } from 'mint-ui'
import os from '@/assets/api/os'
import appHead from '@/components/app-head.vue'
import activeRule from '@/components/active-rule.vue'
export default {
    components: {
        activeRule,
        appHead
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
            username: '',
            telphone: '',
            activeId: '',
            imageSrc:'',
            ruleData: []
        }
    },
    created() {
        this.imageSrc = require('@/assets/image/blue_h5_page.png')
        this.activeId = this.$route.query.id
        this.getRuleData()
    },
    mounted() {},
    methods: {
        getRuleData() {
            this.$api
                .resumeDetail({
                    params: {
                        activities_id: this.activeId
                    }
                })
                .then(res => {
                    if (res.code === 0) {
                        this.ruleData = res.data.rules
                        
                    }
                })
        },
        commentContact() {
            if (os._android()) {
                window.control.commentContact()
            } else if (os._ios()) {
                window.webkit.messageHandlers.commentContact.postMessage('')
            }
        },
        directlyRecom() {
            if (!this.username) {
                Toast('请填写好友真实姓名')
                return false
            }
            let tele = this.telphone.replace(/\s+/g, '')
            if (tele == '') {
                Toast('请填写好友手机号')
                return false
            }
            let reg = /^[1][3456789][0-9]{9}$/
            if (!reg.test(tele)) {
                Toast('请输入正确的手机号码')
                return false
            }
            let params = {
                name: this.username,
                telnum: tele
            }
            if (os._android()) {
                window.control.direatlyComment(JSON.stringify(params))
            } else if (os._ios()) {
                window.webkit.messageHandlers.direatlyComment.postMessage(
                    JSON.stringify(params)
                )
            }
        }
    }
}
</script>

<style scoped lang="less">
@import '../resume/less/activepulic.less';
.resume-index {
    .resume-img {
        display: block;
        width: 520px;
        height: auto;
        margin: 0 auto;
        padding-top: 20px;
    }
    .recom-type {
        width: 658px;
        margin: 72px auto 34px;
        .recom-book {
            padding-bottom: 60px;
            .recom-title {
                width: 30%;
                float: left;
                color: #fff;
                font-size: 38px;
                font-weight: 600;
                line-height: 82px;
                font-family: PingFangSC-Semibold;
                letter-spacing: 2px;
            }
            .recom-but {
                width: 70%;
                float: right;
                button {
                    float: right;
                    border: 0;
                    width: 448px;
                    font-size: 36px;
                    color: #fff;
                    height: 82px;
                    font-weight: 600;
                    font-family: PingFangSC-Semibold;
                    letter-spacing: 2px;
                    background: url(../../assets/image/green_but@2x.png)
                        no-repeat;
                    background-size: cover;
                }
                input {
                    float: right;
                    width: 458px;
                    height: 82px;
                    border-radius: 16px;
                    background: #fff;
                    border: 0;
                    box-sizing: border-box;
                    padding: 20px 35px;
                    margin-bottom: 28px;
                    font-size: 28px;
                }
            }
        }
    }
}
</style>

