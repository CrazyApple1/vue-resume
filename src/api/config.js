// 获取ip
const domain = process.env.domain || 'local';
const host = process.env.host || 'default';

const apiHosterName = host === 'default' ? 'ci' : host;
const apiTestHosterName = host === 'default' ? 'st1' : host;

const config = {
    local: {
        // API_BES_URL: `http://job-api.${apiHosterName}.dev.lanxinka.com`,
        API_BES_URL: `https://www.easy-mock.com/mock/5be4df3eb91c5607f14848c3/example_copy`
    },
    development: {
        API_BES_URL: `http://job-api.${apiHosterName}.dev.lanxinka.com`, //lxk接口地址
    },
    test: {
        API_BES_URL:`http://job-api.${apiHosterName}.test.lanxinka.com`,
    },
    production: {
        API_BES_URL: 'http://sign.lanxinka.com',
    },
    demo: {
        API_BES_URL: 'http://demo-sign.lanxinka.com',
    }
}[domain]

export default config
