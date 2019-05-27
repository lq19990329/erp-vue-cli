import axios from 'axios'
import qs from 'qs'
import common from 'assets/js/common'

console.info(common.env)

const instance = axios.create({
    baseURL: common.serverUrl,
    timeout: 4000,
    // withCredentials: true, // 跨域请求时是否需要使用凭证
    paramsSerializer: params => {
        // 序列化 GET 请求参数 -> a: [1, 2] => a=1&a=2
        return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    transformRequest: [data => {
        // 在向服务器发送前修改请求数据，只适用于 POST
        return qs.stringify(data, { arrayFormat: 'repeat' })
    }],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

/**
 * 向后台请求数据的 API 接口
 */

// 登录接口
export const doLogin = params => instance.get('http://123.57.140.115:2080/api/newsList', {params})

// 获取应用导航接口
export const getNavList = () => instance.get('http://123.57.140.115:2080/api/newsList')


