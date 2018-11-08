<template>
    <header class="public-head">
        <img src="@/assets/image/nav_back.png"
             alt=""
             @click="goBack" />
        <div class="ellipsis">
            {{title}}
        </div>
    </header>
</template>
<script>
export default {
    components: {},
    props:{
        title:''
    },
    data() {
        return {
            
        }
    },
    created() {},
    mounted() {},
    methods: {
        goBack() {
            this.$emit('goBack')
        }
    }
}
</script>
<style scoped lang="less">
.public-head {
    position: fixed;
    background: #fff;
    top:0;
    width: 100%;
    padding: 26px 37px;
    box-sizing: border-box;
    height: 90px;
    border-bottom: 2px solid #ededef;
    display: flex;
    box-sizing: border-box;
    justify-content: flex-start;
    img {
        display: block;
        width: 21px;
        height: 38px;
        padding-right: 32px;
    }
    div {
        width: 90%;
        height: 38px;
        line-height: 38px;
        font-weight:500;
        font-size: 34px;
        color: rgba(35, 35, 35, 1);
    }
}
</style>
