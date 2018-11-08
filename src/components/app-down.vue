<template>
    <section class="position-top"
             :class="{'positon-hide':downShow,'position-show':!downShow}">
        <div class="position-top-left">
            <img src="@/assets/image/logo_big.png"
                 alt="" />
            <span>找工作，就上口碑工作</span>
        </div>
        <div class="position-top-right">
            <span @click="downLoad">下载APP</span>
            <img src="@/assets/image/h5_delis_close@2x.png"
                 alt=""
                 @click="closeDown" />
        </div>
    </section>
</template>
<script>
export default {
    name: "app-down",
    components: {},
    props: {
        downShow: false,
        downUrl:''
    },
    data() {
        return {
        }
    },
    created() {},
    mounted() {},
    methods: {
        closeDown() {
            this.$emit('closeDown')
        },
        downLoad(){ // 下载
            window.open(this.downUrl)
        }
    }
}
</script>
<style lang="less" scoped>
.position-top {
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    border-bottom: 2px solid #ddd;
    background: #fff;
    display: flex;
    justify-content: space-between;
    height: 72px;
    padding: 0 25px 0 32px;
    align-items: center;
    box-shadow: 0px 15px 28px 0px rgba(0, 0, 0, 0.09);
    z-index: 30;
    .position-top-left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
            display: block;
            width: 48px;
            height: 48px;
            margin-right: 23px;
        }
        span {
            display: block;
            font-size: 26px;
            font-weight: 400;
            color: #222222;
        }
    }
    .position-top-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        span {
            display: block;
            padding: 7px 18px;
            box-shadow: 6px 4px 16px 1px rgba(234, 76, 86, 0.46);
            background: #ea4c56;
            font-size: 24px;
            color: #fff;
            letter-spacing: 2px;
            margin-right: 40px;
        }
        img {
            display: block;
            width: 25px;
            height: 25px;
        }
    }
}
.position-show {
    animation: fadeInDown 0.5s both;
}
.positon-hide {
    animation: fadeOutUp 0.5s both;
}
@keyframes fadeInDown {
    0% {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }

    to {
        opacity: 1;
        transform: none;
    }
}
@keyframes fadeOutUp {
    0% {
        opacity: 1;
    }

    to {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }
}
</style>

