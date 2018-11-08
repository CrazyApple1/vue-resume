import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routers = [
    { path: '/', redirect: '/index' }, //重定向
    {
        path: '/index',
        name: 'index',
        meta: {
            requireAuth: true,
            keepAlive: true,
            title: '活动'
        },
        component: function(resolve) {
            require(['@/views/index.vue'], resolve)
        }
    },
    {
        path: '/resume-active',
        name: 'resume-active',
        meta: {
            requireAuth: true,
            keepAlive: true,
            title: '邀请好友录简历'
        },
        component: function(resolve) {
            require(['@/views/resume/resume-active.vue'], resolve)
        }
    },
    {
        path: '/recommend-active',
        name: 'recommend-active',
        meta: {
            requireAuth: true,
            keepAlive: true,
            title: '推荐好友入职'
        },
        component: function(resolve) {
            require(['@/views/active-detail/recommend-active.vue'], resolve)
        }
    },
    {
        path: '/scene-active',
        name: 'scene-active',
        meta: {
            requireAuth: true,
            keepAlive: true,
            title: '到现场面试'
        },
        component: function(resolve) {
            require(['@/views/active-detail/scene.vue'], resolve)
        }
    },
    {
        path: '/video-active',
        name: 'video-active',
        meta: {
            requireAuth: true,
            keepAlive: true,
            title: '视频面试担保入职'
        },
        component: function(resolve) {
            require(['@/views/active-detail/video-active.vue'], resolve)
        }
    },
    {
        path: '/share/resume',
        name: 'share-resume',
        meta: {
            requireAuth: true,
            keepAlive: true,
            title: '录简历赚钱'
        },
        component: function(resolve) {
            require(['@/views/resume/resume-index.vue'], resolve)
        }
    },
    {
        path: '/share/resume-adit',
        name: 'resume-adit',
        meta: {
            requireAuth: true,
            keepAlive: true,
            title: '录简历赚钱'
        },
        component: function(resolve) {
            require(['@/views/resume/resume-adit.vue'], resolve)
        }
    },
    {
        path: '/share/submit-result',
        name: 'submit-result',
        meta: {
            requireAuth: true,
            keepAlive: true,
            title: '录简历赚钱'
        },
        component: function(resolve) {
            require(['@/views/resume/submit-result.vue'], resolve)
        }
    },
    {
        path: '/share/position',
        name: 'share-position',
        meta: {
            requireAuth: true,
            keepAlive: true,
            title: ''
        },
        component: function(resolve) {
            require(['@/views/position/position-detail.vue'], resolve)
        }
    },
    {
        path: '/share/position/result',
        name: 'position-result',
        meta: {
            requireAuth: true,
            keepAlive: true,
            title: ''
        },
        component: function(resolve) {
            require(['@/views/position/position-result.vue'], resolve)
        }
    }
]
export default routers
