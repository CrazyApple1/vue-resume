<template>
    <section class="submit-result">
        <img :src="imgSrc"
             alt=""
             class="result-img" />
        <p>{{subtext}}</p>
        <slot></slot>
        <div>{{resultText}}</div>
    </section>
</template>
<script>
export default {
    props: {
        subtext: '',
        resultShow: false,
        imgSrc: '',
        resultText:''
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
.submit-result {
    padding-top: 45px;
    color: #232323;
    .result-img {
        width: 250px;
        height: auto;
        display: block;
        margin: 0 auto 16px;
    }
    p {
        display: block;
        text-align: center;
        font-size: 34px;
        line-height: 48px;
        font-weight: 500;
    }
    div {
        display: block;
        text-align: center;
        font-size: 26px;
        font-weight: 400;
        margin-top: 20px;
    }
}
</style>

