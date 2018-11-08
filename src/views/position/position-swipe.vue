<template>
    <transition name="router-show" >
        <section class="position-swipe" @touchmove.prevent>
            <section class="position-swipe-bg"
                     @click="clickHide"></section>
            <section class="position-swipe-content">
                <mt-swipe :auto="0"
                          :defaultIndex="deIndex"
                          ref="swipeChild"
                          @change="handleChange">
                    <mt-swipe-item v-for="(item,index) in imgData"
                                   :key="index">
                        <img :src="item"
                             alt="" />
                    </mt-swipe-item>
                </mt-swipe>
            </section>
            <section class="img-num">
                {{pageNum}}/{{imgData.length}}
            </section>
        </section>
    </transition>

</template>
<script>
export default {
    props: {
        imgData: {
            type: Array,
            default: () => []
        },
        deIndex: 0
    },
    data() {
        return {
            pageNum:0,
        }
    },
    created() {},
    mounted() {
        this.pageNum = this.deIndex+1;
    },
    methods: {
        clickHide() {
            this.$emit('imgHide')
        },
        handleChange(index) {
            this.pageNum = index+1
        }
    }
}
</script>

<style lang="less" scoped>
.router-show-enter-active,
.router-show-leave-active {
    transition: all 0.4s;
}
.router-show-enter,
.router-show-leave-active {
    transform: translateX(100%);
}

.position-swipe {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    color: #fff;
    .position-swipe-bg {
        position: fixed;
        width: 100%;
        height: 100%;
        background: #000;
        top: 0;
        left: 0;
         z-index: 101;
        color: #fff;
    }
    .position-swipe-content {
        position: fixed;
        width: 100%;
        height: 500px;
        top: 50%;
        margin-top: -250px;
        color: #fff;
        left: 0;
        z-index: 102;
        img {
            width: 100%;
            height: 500px;
        }
    }
    .img-num {
        position: fixed;
        width: 100%;
        padding: 21px;
        text-align: center;
        color: #fff;
        z-index: 102;
        font-size:26px;
        bottom: 0;
    }
}
</style>
<style lang="less">
.position-swipe-content .mint-swipe-indicators {
    display: none !important;
}
</style>