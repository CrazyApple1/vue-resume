<template>
    <section class="submit-part">
        <my-head :title='title'
                 @goBack="goBack"></my-head>
        <get-result :subtext="subtext"
                    :resultText="resultText"
                    :imgSrc="imgSrc">
        </get-result>
        <steward-part :stewardName="stewardName"
                      :stewardtel="stewardtel"></steward-part>
        <result-but resultRes="true"
                    :downUrl="downUrl"></result-but>
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
            title: '',
            resultData: {},
            downUrl: '',
            imgSrc: '',
            subtext: '',
            resultText: '',
            stewardName: '', // 管家名字
            stewardtel: '' // 管家电话
        }
    },
    created() {
        this.getData()
    },
    beforeRouteLeave(to, from, next) {
        localStorage.removeItem('pageTitle')
        localStorage.removeItem('positionData')
        next()
    },
    mounted() {},
    methods: {
        getData() {
            this.resultData = JSON.parse(localStorage.getItem('positionData'))
            this.stewardName = this.resultData.name // 管家名字
            this.stewardtel = this.resultData.mobile // 管家电话
            if (os._ios()) {
                // 区分下载地址
                this.downUrl = this.resultData.app_url_ios
            } else if (os._android()) {
                this.downUrl = this.resultData.app_url_android
            }
            this.title = localStorage.getItem('pageTitle')
            document.title = this.title
            if (this.resultData.status == 1) {
                // 提交成功
                this.imgSrc = require('@/assets/image/icon_ok.png')
                this.subtext = '提交成功'
                this.resultText = '工作管家稍后会电话联系你'
            } else if (this.resultData.status == 2) {
                // 提交失败
                this.imgSrc = require('@/assets/image/icon_no.png')
                this.subtext = '提交失败'
                this.resultText = '可以主动联系管家哦！'
            } else if (this.resultData.status == 3) {
                // 已提交
                this.imgSrc = require('@/assets/image/icon_repeat@2x.png')
                this.subtext = '您已经提交过咯'
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

