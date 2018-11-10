<template>
    <section class="position-detail"
             :class="{'positon-padd':!downShow}">
        <app-down :downShow="downShow"
                  :downUrl="downUrl"
                  @closeDown="closeDown"></app-down>
        <section class="position-box">
            <div class="pb-top clear">
                <div class="pb-top-left">
                    <span :class="{'video':job_details.is_guarantee == 1}">{{job_details.name}}</span>
                </div>
                <div class="pb-top-right">
                    {{job_details.salary_scope}}
                </div>
            </div>
            <div class="pb-name">
                <div class="pb-head">
                    <img src="../../assets/image/head.jpg"
                         alt="" />
                </div>
                <span class="ellipsis">{{job_details.company_name}}</span>
            </div>
        </section>
        <section class="work-enr">
            <h1 class="position-title">工作环境</h1>
            <section class="img-part clear">
                <img v-for="(item,index) in comImg"
                     :key="index"
                     :src="item"
                     @click="openImg(index)"
                     :class="{'two-img': comImg.length % 2 == 0 && comImg.length <5,'three-img': comImg.length % 3 == 0 || comImg.length >= 5}"
                     alt="" />
            </section>
            <h1 class="position-title">岗位亮点</h1>
            <section class="bulingbuling clear">
                <span v-for="(item,index) in buling"
                      :key="index">{{item}}</span>
            </section>
            <section class="ask-three">
                <div class=""
                     v-for="(item,index) in askData"
                     :key="index">
                    <img :src="item.img"
                         alt="" />
                    <span>{{item.name}}</span>
                </div>
            </section>
            <h1 class="position-title">岗位描述</h1>
            <section class="position-dec"
                     v-html="job_details.job_brief"></section>
            <h1 class="copy-address">
                工作地点
                <a ref="btn"
                   :data-clipboard-text="job_details.job_address"
                   @click="copy">复制地址</a>
            </h1>
            <section class="position-address">{{job_details.job_address}}</section>
        </section>
        <section class="work-enr company-detail">
            <h1 class="position-title">企业详情</h1>
            <section class="company-cotent">
                <div class="company-cotent-top clear">
                    <img src="../../assets/image/head.jpg"
                         alt="" />
                    <div>
                        <p class="company-name">{{job_details.company_name}}</p>
                        <p>{{job_details.company_property_name}}&nbsp;|&nbsp;{{job_details.company_scale_name}}</p>
                    </div>
                </div>
                <div class="company-dec"
                     v-html="job_details.company_brief">
                </div>
            </section>
        </section>
        <section class="want-inter">
            <button @click="friendTel = true">我要面试</button>
        </section>
        <!-- 图片轮播 -->
        <position-swipe v-if="swipeShow"
                        @imgHide="clickHide"
                        :imgData="comImg"
                        :deIndex="deIndex"
                        ref="swipe"></position-swipe>
        <interview-part :friendTel="friendTel"
                        @closeClick="closeClick"></interview-part>
    </section>
</template>
<script>
import { Toast } from 'mint-ui'

import os from '@/assets/api/os'
import appDown from '@/components/app-down.vue'
import positionSwipe from './position-swipe.vue'
import interviewPart from './interview.vue'
import Clipboard from 'clipboard'
export default {
    components: {
        appDown,
        interviewPart,
        positionSwipe
    },
    data() {
        return {
            shareData: {},
            job_details: {},
            downUrl: '',
            pageTitle: '',
            friendTel: false, // 联系电话弹窗
            downShow: false, // 头部提示下载app
            swipeShow: false, // 图片轮播
            deIndex: 0,
            comImg: [require('@/assets/image/1.jpg'),require('@/assets/image/2.jpg'),require('@/assets/image/3.jpg')],
            askData: [
                {
                    img: require('@/assets/image/icon_details_age@2x.png'),
                    name: ''
                },
                {
                    img: require('@/assets/image/icon_details_education@2x.png'),
                    name: ''
                },
                {
                    img: require('@/assets/image/icon_details_sex@2x.png'),
                    name: ''
                }
            ],
            buling: [],
            clipboard: null
        }
    },
    created() {
        this.getJobDetail()
    },
    mounted() {
        this.clipboard = new Clipboard(this.$refs.btn)
    },
    methods: {
        getJobDetail() {
            this.$api
                .shareJob({
                    params: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(res => {
                    if (res.code === 0) {
                        this.shareData = res.data
                        // this.comImg = res.data.job_environment;
                        this.job_details = res.data.job_details
                        this.buling = res.data.job_details.tags
                        this.askData[0].name = res.data.job_details.age_scope
                        this.askData[1].name = res.data.job_details.education
                        this.askData[2].name = res.data.job_details.sex
                        this.pageTitle = res.data.title
                        document.title = res.data.title
                        if(os._ios()){ // 区分下载地址
                            this.downUrl = this.shareData.app_url_ios
                        }else if(os._android()){
                            this.downUrl = this.shareData.app_url_android
                        }
                    }
                })
        },
        closeClick() {
            this.friendTel = false
        },
        closeDown() {
            this.downShow = true
        },
        openImg(index) {
            this.swipeShow = true
            this.deIndex = index
        },
        clickHide() {
            this.swipeShow = false
        },
        copy() {
            console.log(44)

            this.clipboard.on('success', e => {
                Toast('复制成功')
                // 释放内存
                this.clipboard.destroy()
            })
            this.clipboard.on('error', e => {
                // 不支持复制
                Toast('该浏览器不支持自动复制')
                // 释放内存
                this.clipboard.destroy()
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import './less/position-detail.less';
</style>

