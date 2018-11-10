import axios from './http'
import apiUrl from './config'
import Vue from 'vue'
const apiVersions = '/1.0';
Vue.prototype.$api = {
    // 职位分享
    shareJob: params => axios.get(`${apiUrl.API_BES_URL}/share/job`,params),
    // 发送验证码
    captchaSend: params => axios.post(`${apiUrl.API_BES_URL}${apiVersions}/user/share/captcha_send`,params),
    // 分享申请岗位
    jobApplication: params => axios.post(`${apiUrl.API_BES_URL}${apiVersions}/user/share/job/application`,params),
    // 分享简历首页
    shareResume:params => axios.get(`${apiUrl.API_BES_URL}/share/resume`,params),

    // 填写简历最高学历字典
    resumeEducation: () => axios.get(`${apiUrl.API_BES_URL}/resume/education`),
    // 岗位字典
    resumeJob: () => axios.get(`${apiUrl.API_BES_URL}/resume/job`), 
    // 分享填写简历
    resumeDeliver: params => axios.post(`${apiUrl.API_BES_URL}/resume/deliver`,params),
    // 简历活动分享页
    resumeDetail: params => axios.get(`${apiUrl.API_BES_URL}/resume/detail`,params),
}