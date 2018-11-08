<template>
    <section class="submit-part">
        <my-head :title='title'
                 @goBack="goBack"></my-head>
        <get-result :subtext="subtext"
                    :resultText="resultText"
                    :imgSrc="imgSrc">
            <p v-if="submitStatus == 1">预计奖励1元</p>
        </get-result>
        <steward-part :headImg="headImg"
                      :stewardName="stewardName"
                      :stewardtel="stewardtel"></steward-part>
        <result-but :downUrl="downUrl"></result-but>
    </section>

</template>
<script>
import os from '@/assets/api/os'
import myHead from '@/components/head.vue'
import getResult from '@/components/get-result.vue'
import stewardPart from '@/components/steward-part.vue'
import resultBut from '@/components/result-but.vue'
export default {
    components: {
        myHead,
        getResult,
        stewardPart,
        resultBut
    },
    data() {
        return {
            title: '录简历赚钱',
            submitData: {},
            submitStatus: 0,
            imgSrc: '',
            subtext: '',
            resultText: '',
            headImg: '', // 头像图片
            stewardName: '', // 管家名字
            stewardtel: '', // 管家电话
            downUrl: ''
        }
    },
    created() {
        this.getData()
    },
    beforeRouteLeave(to, from, next) {
        localStorage.removeItem('resumeBackData')
        next()
    },
    mounted() {
        
    },
    methods: {
        getData() {
            this.submitData = JSON.parse(localStorage.getItem('resumeBackData'))
            this.submitStatus = this.submitData.status
            this.headImg = require('@/assets/image/lmg_tx@2x.png')
            this.stewardName = this.submitData.name
            this.stewardtel = this.submitData.mobile
            if (os._ios()) {
                // 区分下载地址
                this.downUrl = this.submitData.app_url_ios
            } else if (os._android()) {
                this.downUrl = this.submitData.app_url_android
            }
            
            if (this.submitStatus == 1) {
                // 提交成功
                this.imgSrc = require('@/assets/image/icon_ok.png')
                this.subtext = '提交成功'
                this.resultText = '管家确认后会短信通知你'
            } else if (this.submitStatus == 2) {
                // 提交失败
                this.imgSrc = require('@/assets/image/icon_no.png')
                this.subtext = '提交失败'
                this.resultText = '可以主动联系管家哦！'
            }
        },
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>
<style  scoped lang="less">
.submit-part {
    padding-top: 90px;
}
</style>

