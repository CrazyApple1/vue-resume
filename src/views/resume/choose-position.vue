<template>
    <transition name="router-show">
        <section class="chose-position"
                 v-if="workChoose">
            <my-head :title='title'
                     @goBack="goBack"></my-head>
            <section class="position-item clear">
                <span v-for="(item,index) in position"
                      :key="index"
                      :class="{'span-choosed':choosed(item)}">
                    {{item.name}}
                    <input type="checkbox"
                           :value="item.id"
                           v-model="choose"
                           @change="choosePosition"
                           class="choose-input" />
                </span>
            </section>
            <section class="position-alert">请选择1-5个岗位</section>
            <section class="buts">
                <button :disabled="canbut"
                        @click="chooseAchieve">我选好了</button>
            </section>
        </section>
    </transition>
</template>
<script>
import myHead from '@/components/head.vue'
import { Toast } from 'mint-ui'
export default {
    components: {
        'my-head': myHead
    },
    props: {
        workChoose: false
    },
    data() {
        return {
            title: '',
            paramsId: 0,
            position: [],
            choose: [],
            choosealready: [],
            alreadyArry: [],
            choosealnew: [],
            newArry: []
        }
    },
    created() {
        this.resumeJob()
    },
    mounted() {},
    computed: {
        canbut() {
            if (this.paramsId == 1) {
                return this.choosealnew.length == 0
            } else if (this.paramsId == 2) {
                return this.choosealready.length == 0
            }
        }
    },
    methods: {
        resumeJob() {
            this.$api.resumeJob().then(res => {
                console.log(res);
                if (res.code === 0) {
                    this.position = res.data
                }
            })
        },
        getParamsId() {
            this.choosealready = this.choosealnew = this.choose = []
            if (this.paramsId == 1) {
                this.title = '期望岗位'
                document.title = '期望岗位'
                if (localStorage.getItem('expect')) {
                    this.choosealnew = this.choose = localStorage.getItem(
                        'expect'
                    )
                        ? JSON.parse(localStorage.getItem('expect'))
                        : []
                }
                return
            } else if (this.paramsId == 2) {
                document.title = '曾经做过'
                this.title = '曾经做过'
                if (localStorage.getItem('already')) {
                    this.choosealready = this.choose = localStorage.getItem(
                        'already'
                    )
                        ? JSON.parse(localStorage.getItem('already'))
                        : []
                }
                return
            }
        },
        goBack() {
            this.$emit('childBack')
        },
        choosePosition() {
            if (this.paramsId == 1) {
                this.choosealnew = this.choose
                if (this.choosealnew.length > 5) {
                    Toast({
                        message: '请选择1-5个岗位'
                    })
                    this.choosealnew.pop()
                    return
                }
                console.log(this.choosealnew)
            } else if (this.paramsId == 2) {
                this.choosealready = this.choose
                if (this.choosealready.length > 5) {
                    Toast({
                        message: '请选择1-5个岗位'
                    })
                    this.choosealready.pop()
                    return
                }
            }
        },
        choosed(item) {
            if (this.paramsId == 1) {
                return this.choosealnew.indexOf(item.id) >= 0
            } else if (this.paramsId == 2) {
                return this.choosealready.indexOf(item.id) >= 0
            }
        },
        chooseAchieve() {
            // 我选好了
            if (this.paramsId == 1) {
                this.position.forEach((item, index) => {
                    this.choosealnew.forEach(value => {
                        if(item.id == value){
                            this.newArry.push(item.name)
                        }
                    })
                })
                console.log(this.newArry);
                localStorage.setItem('newArry', JSON.stringify(this.newArry))
                localStorage.setItem('expect', JSON.stringify(this.choosealnew))
            } else if (this.paramsId == 2) {
                this.position.forEach((item, index) => {
                    this.choosealready.forEach(value => {
                        if(item.id == value){
                            this.alreadyArry.push(item.name)
                        }
                    })
                })
                localStorage.setItem('alreadyArry',JSON.stringify(this.alreadyArry))
                localStorage.setItem('already', JSON.stringify(this.choosealready))
            }
            this.$emit('queryChoose')
        }
    }
}
</script>
<style scoped lang="less">
.router-show-enter-active,
.router-show-leave-active {
    transition: all 0.4s;
}
.router-show-enter,
.router-show-leave-active {
    transform: translateX(100%);
}
.chose-position {
    width: 100%;
    padding-top: 90px;
    background: #fff;
    min-height: calc(100vh - 90px);
    position: absolute;
    width: 100%;
    top: 0;
    .position-item {
        padding: 65px 28px 0 56px;
        box-sizing: border-box;
        span {
            float: left;
            padding: 12px 18px;
            margin-right: 70px;
            color: #232323;
            background: #ededef;
            margin-bottom: 32px;
            font-size: 28px;
            position: relative;
        }
        .span-choosed {
            background: #7ac2e4;
            color: #ffffff;
        }
        .choose-input {
            position: absolute;
            width: 100%;
            height: 100%;
            display: block;
            top: 0;
            left: 0;
            opacity: 0;
        }
    }
    .position-alert {
        padding-left: 60px;
        font-size: 24px;
        color: #232323;
        padding-bottom: 54px;
    }
    .buts {
        padding: 0 56px;
        box-sizing: border-box;
        button {
            display: block;
            height: 86px;
            width: 100%;
            background: #7ac2e4;
            border: 0;
            color: #ffffff;
        }
        button:active {
            background: #65b9c9;
        }
        button[disabled] {
            background: #a9a9a9;
        }
    }
}
</style>
