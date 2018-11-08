<template>
    <section class="resume-index activebg">
        <img :src="imgSrc"
             alt=""
             class="resume-img" />

        <section class="resume-active"
                 v-if="status == 1">
            <div class="resume-but"
                 @click="goAdit">录简历赚钱</div>
            <p>一定要认真填写才有效哦～</p>
            <active-rule :rule="ruleData"></active-rule>
        </section>
        <section class="resume-active no-active"
                 v-if="status == 2">
            <img src="@/assets/image/h5_over_bg.png"
                 alt=""
                 class="no-activeimg" />
            <div class="resume-but">下载口碑工作</div>
            <p>更多机会，尽在口碑工作～</p>
        </section>
    </section>
</template>
<script>
import activeRule from '@/components/active-rule.vue'
export default {
    components: {
        activeRule
    },
    data() {
        return {
            status: 1,
            ruleData: [],
            imgSrc:'',
        }
    },
    created() {
        this.imgSrc = require('@/assets/image/blue_h5_page.png')
        this.getResumeData();
    },
    mounted() {},
    methods: {
        getResumeData() {
            this.$api.shareResume({
                params: {
                    token: localStorage.getItem('token')
                }
            }).then( res =>{
                if( res.code === 0){
                    // this.imgSrc = res.data.banner_img;
                    this.status = res.data.status
                    this.ruleData = res.data.rules
                    localStorage.setItem('resumeId',res.data.sharer_id)
                }
            })
        },
        goAdit() {
            this.$router.push({ name: 'resume-adit' })
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

    .resume-active {
        margin-top: 63px;
        .resume-but {
            width: 354px;
            height: 82px;
            background: url(../../assets/image/blue_h5_but.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 88px;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            color: #fff;
            font-size: 36px;
            letter-spacing: 2px;
            margin: 0 auto 12px;
        }
        p {
            display: block;
            text-align: center;
            color: #232323;
            font-size: 20px;
            margin-bottom: 58px;
        }
    }
    .no-active {
        margin-top: 32px;
        .no-activeimg {
            display: block;
            width: 627px;
            height: 520px;
            margin: 0 auto;
        }
        .resume-but {
            margin-top: 57px;
        }
        p {
            font-size: 26px;
        }
    }
}
</style>

