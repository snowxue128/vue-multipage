import axios from 'axios'
import qs from 'qs'
import { Indicator, Toast } from 'mint-ui'
import 'mint-ui/lib/style.css'

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://47.111.142.19:81/api'
} else {
    axios.defaults.baseURL = 'http://47.111.142.19:81/api'
}

axios.defaults.timeout = 10000;
//请求头设置
axios.defaults.headers.Accept = "'application/x-www-form-urlencoded;charset=utf-8'";

axios.interceptors.request.use((config) => {
    Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    })
    if (config.method === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config
}, (error) => {
    Indicator.close()
    Toast({
        message: '加载超时',
        position: 'middle',
        duration: 2000
    })
    return Promise.reject(error)
})

axios.interceptors.response.use((res) => {
    Indicator.close()
    return res
}, (error) => {
    Indicator.close()
    if (error) {
        let errortime = null
        clearTimeout(errortime)
        errortime = setTimeout(() => {
            Toast({
                message: error.message,
                position: 'middle',
                duration: 2000
            })
            clearTimeout(errortime)
        }, 0)
    }
    return Promise.reject(error)
})


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params, id = "") {
    return new Promise((resolve, reject) => {
        if (id != "") {
            url += "/" + id
        }
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params, id = "") {
    return new Promise((resolve, reject) => {
        if (id != "") {
            url += "/" + id
        }
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

/**
 * patch方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function patch(url, params, id = "") {
    return new Promise((resolve, reject) => {
        if (id != "") {
            url += "/" + id
        }
        axios.patch(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
/**
 * delete方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function del(url, params, id = "") {
    return new Promise((resolve, reject) => {
        if (id != "") {
            url += "/" + id
        }
        axios.delete(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
