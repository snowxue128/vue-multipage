/* eslint-disable */
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 存储cookie
 */
export const setCookie = (objName, objValue, objHours = 30) => {
    var str = objName + "=" + escape(objValue);
    if (objHours != null) {
        var date = new Date();
        var ms = objHours * 3600 * 1000 * 24;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}

/**
 * 获取cookie
 */
export const getCookie = (objName) => {
        var search = objName + "=";
        if (document.cookie.length > 0) {
            var offset = document.cookie.indexOf(search);
            if (offset != -1) {
                offset += search.length;
                var end = document.cookie.indexOf(";", offset);
                if (end == -1) end = document.cookie.length;
                return unescape(document.cookie.substring(offset, end));
            } else {
                return '';
            }
        }
    }
    /**
     * 删除cookie
     */
export const delCookie = (name) => {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
    }
    /**
     * 删除所有cookie
     */
export const clearCookie = () => {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    }
}

//去掉传入的后缀单位
Object.keys(target).forEach(attr => {
    if (unit[attr] == 'rem') {
        target[attr] = Math.ceil(parseInt(target[attr]) * rootSize);
    } else {
        target[attr] = parseInt(target[attr]);
    }
});

export const changetitle = (title = '釜帝商城') => {
    window.document.title = title
};

/**
 * 去除空格
 * @param  {str}
 * @param  {type}
 *       type:  1-所有空格  2-前后空格  3-前空格 4-后空格
 * @return {String}
 */
export const trim = function(str, type) {
    type = type || 1
    switch (type) {
        case 1:
            return str.replace(/\s+/g, "");
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s*)/g, "");
        case 4:
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}



/**
 * 字符串数字保留的小数位数
 * value:需要转化的数字或者字符串
 * scale：需要保留的位数
 * **/
export const toFixedDecimal = function(value, scale) {
    var defaultValue = 0.0;

    if (!value || isNaN(parseFloat(value))) {
        value = defaultValue;
    }

    if (!scale) {
        scale = 2;
    }

    value = parseFloat(value.replace(',', ''));
    return value.toFixed(scale);
}

/**
 * 格式化时间
 * @param  {time} 时间
 * @param  {cFormat} 格式
 * @return {String} 字符串
 * @example formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}') // -> 2018/01/29 00:00:00
 */
export const formatTime = function(time, cFormat) {
    if (arguments.length === 0) return null
    if ((time + '').length === 10) {
        time = +time * 1000
    }

    var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}',
        date
    if (typeof time === 'object') {
        date = time
    } else {
        date = new Date(time)
    }

    var formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        var value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

//秒转化成时间：h:m:s
export const timeTohhmmss = function(seconds) {
    var hh;
    var mm;
    var ss;
    if (seconds == null || seconds < 0) {
        return;
    }
    var pseconds = parseInt(seconds);
    //得到小时
    hh = pseconds / 3600 | 0;
    pseconds = parseInt(pseconds) - parseInt(hh) * 3600;
    if (parseInt(hh) < 10) {
        hh = "0" + hh;
    }
    if (parseInt(hh) >= 24) {
        hh = "00";
    }
    //得到分钟
    mm = parseInt(pseconds) / 60 | 0;
    //得到秒
    ss = parseInt(pseconds) - parseInt(mm) * 60;
    if (parseInt(mm) < 10) {
        mm = "0" + mm;
    }
    if (parseInt(ss) < 10) {
        ss = "0" + ss;
    }
    return hh + ":" + mm + ":" + ss;
}

//身份证校验
export const IdCodeValid = function(code) {
    //身份证号合法性验证
    //支持15位和18位身份证号
    //支持地址编码、出生日期、校验位验证
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    var row = {
        'pass': true,
        'msg': '验证成功'
    };
    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)) {
        row = {
            'pass': false,
            'msg': '身份证号格式错误'
        };
    } else if (!city[code.substr(0, 2)]) {
        row = {
            'pass': false,
            'msg': '身份证号地址编码错误'
        };
    } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            if (parity[sum % 11] != code[17].toUpperCase()) {
                row = {
                    'pass': false,
                    'msg': '身份证号校验位错误'
                };
            }
        }
    }
    return row;
}


/**
 * 手机号中间四位为****
 * @param value 手机号
 * */
export const handelMobile = function(value) {
    if (!value) return '';
    if (typeof value !== 'string') value = value.toString();
    return value.replace(/^(\d{3})\d*(\d{4})$/, '$1****$2');
}

//是否是手机号码
export const isPhoneNumber = function(str) {
    return /^1[3|4|5|6|7|8][0-9]{9}$/.test(str)
}


/**
 * 防抖动
 * @param  {Function} fn        [执行的函数]
 * @param  {[type]}   delay     [多少秒之后执行]
 * @param  {[type]}   immediate [是否立即执行]
 * @return {[type]}             []
 */
export const debounce = function(fn, delay, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) fn.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, delay);
        if (callNow) fn.apply(context, args);
    };
}

/**
 * 节流
 * @param  {[type]} func  [执行的函数]
 * @param  {[type]} delay [多少秒之内执行一次]
 * @return {[type]}       [description]
 */
export const throttle = function(func, delay) {
    var prev = Date.now();
    return function() {
        var context = this;
        var args = arguments;
        var now = Date.now();
        if (now - prev >= delay) {
            func.apply(context, args);
            prev = Date.now();
        }
    }
}

export const ToBase64 = function(path) {
    const getLocalFilePath = function(path) {
        if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf('_downloads') === 0) {
            return path
        }
        if (path.indexOf('file://') === 0) {
            return path
        }
        if (path.indexOf('/storage/emulated/0/') === 0) {
            return path
        }
        if (path.indexOf('/') === 0) {
            var localFilePath = plus.io.convertAbsoluteFileSystem(path)
            if (localFilePath !== path) {
                return localFilePath
            } else {
                path = path.substr(1)
            }
        }
        return '_www/' + path
    }
    return new Promise(function(resolve, reject) {
        plus.io.resolveLocalFileSystemURL(getLocalFilePath(path), function(entry) {
            entry.file(function(file) {
                var fileReader = new plus.io.FileReader()
                fileReader.onload = function(data) {
                    resolve(data.target.result)
                }
                fileReader.onerror = function(error) {
                    reject(error)
                }
                fileReader.readAsDataURL(file)
            }, function(error) {
                reject(error)
            })
        }, function(error) {
            reject(error)
        })
    })
}
