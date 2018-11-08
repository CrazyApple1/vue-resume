<template>
    <section class="resume-index activebg resume-active-app video-active">
        <app-head title="视频面试担保入职"></app-head>
        <img src="@/assets/image/orange_page@2x.png"
             alt=""
             class="resume-img" />
        <section class="record-part">
            <span class="pink-gradient" @click="lookVideoLog">查看我的面试记录&emsp;&gt;</span>
        </section>
        <rule-part :rule="ruleData"></rule-part>
    </section>
</template>
<script>
import os from '@/assets/api/os'
import appHead from '@/components/app-head.vue'
import rulePart from '@/components/rule-part.vue'
export default {
    components: {
        appHead,
        rulePart
    },
    data() {
        return {
            status: true,
            imageSrc: '',
            activeId: '',
            ruleData: []
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
                    if (res.code === 0) {
                        this.ruleData = res.data.rules
                        this.imageSrc = res.data.banner_img
                    }
                })
        },
        lookVideoLog() {
            if (os._android()) {
                window.control.videoInterviewLog()
            } else if (os._ios()) {
                window.webkit.messageHandlers.videoInterviewLog.postMessage('')
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
        width: 477px;
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

