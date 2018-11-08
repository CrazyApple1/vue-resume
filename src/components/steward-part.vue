<template>
    <section class="steward-part clear">
        <div class="steward-head">
            <img src="@/assets/image/lmg_tx@2x.png"
                 alt="">
        </div>
        <div class="steward-info">
            <p class="clear">
                <span>管家姓名</span>
                <b>{{stewardName}}</b>
            </p>
            <p class="clear">
                <span>联系电话 </span>
                <b>{{stewardtel}}</b>
            </p>
        </div>
    </section>
</template>
<script>
export default {
    props: {
        headImg: '',
        stewardName: '',
        stewardtel: ''
    },
    data() {
        return {}
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>
<style  scoped lang="less">
.steward-part {
    width: 592px;
    margin: 60px auto 54px;
    box-shadow: 0px 13px 35px 0px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    padding: 30px 16px 30px 28px;
    .steward-head {
        float: left;
        width: 114px;
        height: 114px;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 40px;
        img {
            display: block;
            width: 114px;
            height: 114px;
        }
    }
    .steward-info {
        float: left;
        width: 72%;
        p {
            span {
                font-size: 26px;
                color: #232323;
                float: left;
                line-height: 37px;
                margin-right: 30px;
                width: 30%;
            }
            b {
                font-size: 26px;
                color: #232323;
                float: left;
                width: 62%;
                font-weight: 500;
                line-height: 37px;
            }
        }
        p:first-child {
            margin-bottom: 20px;
            margin-top: 10px;
        }
    }
}
</style>

