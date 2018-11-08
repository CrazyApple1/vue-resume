<template>
    <section class="rule-wipe">
        <section class="active-rule">
            <img src="@/assets/image/blue_rule.png"
                 alt=""
                 class="rule-img" />
            <div class="rule-list">
                <img src="@/assets/image/rule_page_blue.png"
                     alt=""
                     class="head-img" />
                <ul>
                    <li class="clear"
                        v-for="(item,index) in rule"
                        :key="index">
                        <span class="sort-num">{{index+1}}</span>
                        <div class="sort-text">
                            <h2>{{item.title}}</h2>
                            <div>
                                <span v-for="(value, i) in item.content" :key="i"
                                      :class="{'has-cicle':item.content.length > 1}">{{value}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </section>
</template>
<script>
export default {
    components: {},
    props: {
        rule: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            status: true
        }
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>

<style lang="less" scoped>
.rule-wipe {
    padding-bottom: 35px;
    .active-rule {
        position: relative;
        background: #fff;
        width: 658px;
        margin: 0 auto;
        box-sizing: border-box;
        min-height: 100px;
        border-radius: 0 0 16px 16px;
        padding: 0 19px 40px 27px;
        .rule-img {
            display: block;
            width: 719px;
            height: auto;
            position: absolute;
            left: -31px;
            top: 0;
        }
        .rule-list {
            padding-top: 60px;
            .head-img {
                width: 214px;
                height: auto;
                display: block;
                margin: 0 auto;
            }
            ul {
                li {
                    margin-top: 20px;
                    .sort-num {
                        float: left;
                        width: 30px;
                        height: 30px;
                        background: url(../assets/image/h5_oval.png)
                            no-repeat;
                        background-size: cover;
                        margin-right: 15px;
                        font-size: 24px;
                        text-align: center;
                        line-height: 30px;
                        color: #fff;
                        font-family: PingFangSC-Semibold;
                        margin-top: 6px;
                    }
                    .sort-text {
                        width: 552px;
                        float: left;
                        font-size: 30px;
                        font-weight: 400;
                        color: #232323;

                        line-height: 42px;
                        h2 {
                            color: #222222;
                            font-size: 30px;
                            font-weight:500;
                        }
                        span {
                            display: block;
                            position: relative;
                            font-size: 30px;
                            line-height: 42px;
                            text-align: justify;
                            margin-bottom: 10px;
                        }
                        .has-cicle {
                            text-indent: 20px;
                            list-style: disc;
                        }
                        .has-cicle:before {
                            content: '';
                            width: 10px;
                            height: 10px;
                            position: absolute;
                            background: url(../assets/image/circle.png) no-repeat;
                            background-size: 100% 100%;
                            left: 0;
                            top:16px;
                        }
                    }
                }
            }
        }
    }
}
</style>


