import Vue from 'vue'
import Router from 'vue-router'
import { Toast } from 'mint-ui';

import routers from './routers'

Vue.use(Router);

const vueRouter = new Router({
    mode: 'history',
    routes: routers,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
});
vueRouter.beforeEach((to, from, next) => {
    document.title = to.meta.title;   //title修改
    // let token = to.query.token;
    // let token = 'QrhZhVNOzPq';
    let token = 'mMnt0hbkR1VQ';
     
    if(navigator.onLine){
        if(token){
            localStorage.setItem('token',token) // 存储token信息
        }
      next();
    }else{
      Toast('您的网络已断开连接！');
      next(false)
    }
  });

export default vueRouter
