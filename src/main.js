import Vue from 'vue'
import axios from '@/api/http'
import App from './App'
import router from './router/index'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.min.css'
import './assets/api/flexble'
import '@/assets/less/index.less';
import '@/api' // 全局注册请求 api-v2

//引入Mint组件
Vue.use(Mint);

Vue.prototype.$ajax = axios;


window.vue = new Vue({
    el: '#app',
    data() {
        return {}
    },
    created() {

    },
    mounted() {
    },
    router,
    render: h => h(App)
})
