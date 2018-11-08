<template>
    <section class="result-but clear"
             :class="{'result-res':resultRes}">
        <button class="resultbut-left"
                @click="getSteward">联系管家</button>
        <button class="resultbut-right" @click="downLoad">下载口碑工作APP</button>
    </section>
</template>
<script>

import { Toast, MessageBox } from 'mint-ui'
export default {
    props: {
        downUrl:'',
        resultRes: false // 是否为红色
    },
    data() {
        return {}
    },
    beforeRouteLeave(to, from, next) {
        MessageBox.close(false)
        next()
    },
    created() {},
    mounted() {},
    methods: {
        getSteward() {
            if (this.$parent.stewardtel) {
                MessageBox({
                    title: '',
                    message: this.$parent.stewardtel,
                    showCancelButton: true,
                    confirmButtonText: '拨打'
                }).then(action => {
                    console.log(action)
                    if (action == 'confirm') {
                        window.location.href = `tel://${this.stewardtel}`
                    }
                })
            } else {
                Toast('未获取到管家电话')
            }
        },
        downLoad(){
            window.open(this.downUrl)
        }
    }
}
</script>
<style  scoped lang="less">
.result-but {
    width: 540px;
    margin: 56px auto 0;
    button {
        font-size: 26px;
        height: 80px;
    }
    .resultbut-left {
        float: left;
        width: 208px;
        color: #7ac2e4;
        background: #d4f1ff;
        border: 2px solid #7ac2e4;
    }
    .resultbut-left:active {
        background: #caecfd;
    }
    .resultbut-right {
        float: right;
        width: 271px;
        color: #fff;
        background: #73bde2;
        border: 2px solid #73bde2;
    }
    .resultbut-right:active {
        background: #63b8e2;
    }
}
.result-res {
    .resultbut-left {
        background: #ffd9db;
        color: #ea4c56;
        border-color: #ea4c56;
    }
    .resultbut-left:active {
        background: #fdcdd0;
    }
    .resultbut-right {
        background: #ea4c56;
        color: #fff;
        border-color: #ea4c56;
    }
    .resultbut-right:active {
        background: #e63b46;
    }
}
</style>

