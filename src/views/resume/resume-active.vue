<template>
    <section class="resume-index activebg resume-active-app">
        <app-head title="邀请好友录简历"></app-head>
        <img :src="imageSrc"
             alt=""
             class="resume-img" />
        <section class="record-part">
            <span class="buts-gradient"
                  @click="inviteLog">我的邀请记录&emsp;&gt;</span>
        </section>
        <section class="share-but">
            <h1>立即邀请</h1>
            <ul class="clear">
                <li v-for="(item,index) in shareData"
                    :key="index">
                    <img :src="item.imgSrc"
                         alt=""
                         @click="shareClick(item)" />
                    <span>{{item.text}}</span>
                </li>
            </ul>
        </section>
        <active-rule :rule="ruleData"></active-rule>
    </section>
</template>
<script>
import os from '@/assets/api/os'
import appHead from '@/components/app-head.vue'
import activeRule from '@/components/active-rule.vue'
export default {
    components: {
        activeRule,
        appHead
    },
    data() {
        return {
            status: true,
            imageSrc:'',
            ruleData: [],
            activeId:'',
            shareData: [
                {
                    imgSrc: require('../../assets/image/icon_wechat@2x.png'),
                    text: '微信好友',
                    name: 'weixin',
                    id: 1
                },
                {
                    imgSrc: require('../../assets/image/icon_cof@2x.png'),
                    text: '朋友圈',
                    name: 'wxfriend',
                    id: 2
                },
                {
                    imgSrc: require('../../assets/image/icon_qq@2x.png'),
                    text: 'QQ',
                    name: 'qq',
                    id: 3
                },
                {
                    imgSrc: require('../../assets/image/icon_qqk@2x.png'),
                    text: 'QQ空间',
                    name: 'qqroom',
                    id: 4
                },
                {
                    imgSrc: require('../../assets/image/icon_code@2x.png'),
                    text: '面对面邀请',
                    name: 'ftf',
                    id: 5
                },
                {
                    imgSrc: require('../../assets/image/icon_copy@2x.png'),
                    text: '复制',
                    name: 'copy',
                    id: 6
                }
            ]
        }
    },
    created() {
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
                    if(res.code === 0){
                        this.ruleData = res.data.rules;
                        this.imageSrc = res.data.banner_img
                    }
                })
        },
        shareClick(item) {
            let domainUrl = document.domain
            let port = location.port
            if (port && port.length > 0) {
                domainUrl = `${domainUrl}:${port}`
            }
            let params = {
                id: item.id,
                url: `${domainUrl}/share/resume`
            }
            if (os._android()) {
                window.control.shareUrl(JSON.stringify(params))
            } else if (os._ios()) {
                window.webkit.messageHandlers.shareUrl.postMessage(
                    JSON.stringify(params)
                )
            }
        },
        inviteLog() {
            // 邀请记录
            if (os._android()) {
                window.control.inviteLog()
            } else if (os._ios()) {
                window.webkit.messageHandlers.inviteLog.postMessage('')
            }
        }
    }
}
</script>

<style scoped lang="less">
@import './less/activepulic.less';
.resume-index {
    .resume-img {
        display: block;
        width: 558px;
        height: auto;
        margin: 0 auto;
        padding-top: 20px;
    }
    .record-part {
        text-align: right;
        padding: 34px 0 36px;
        span {
            display: inline-block;
            padding: 13px 18px 16px 31px;
            border-radius: 50px 0 0 50px;
            font-size: 24px;
            color: #fff;
        }
    }
    .share-but {
        background: #fff;
        border-radius: 16px;
        width: 690px;
        margin: 0 auto 60px;
        padding: 32px 0 57px;
        h1 {
            display: block;
            text-align: center;
            font-weight: 500;
            font-size: 30px;
            color: #232323;
            position: relative;
            margin: 0 50px;
        }
        h1::before {
            content: '';
            display: block;
            width: 195px;
            height: 2px;
            background: #e5e5e5;
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -1px;
        }
        h1::after {
            content: '';
            display: block;
            width: 195px;
            height: 2px;
            right: 0;
            background: #e5e5e5;
            position: absolute;
            top: 50%;
            margin-top: -1px;
        }
        ul {
            padding-top: 10px;
            li {
                float: left;
                width: 33.3%;
                margin-top: 48px;
                img {
                    display: block;
                    width: 90px;
                    height: 90px;
                    margin: 0 auto 8px;
                }
                span {
                    display: block;
                    text-align: center;
                    color: #888888;
                    font-size: 24px;
                    height: 34px;
                    line-height: 34px;
                }
            }
        }
    }
}
</style>

