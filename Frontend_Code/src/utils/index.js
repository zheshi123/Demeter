// import calendar from "solarday2lunarday"
import {Solar} from 'lunar-javascript'

/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 格式化时间；
function formatDate(date, fmt) { // author: meizz
  var o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    'S': date.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}
// 获取当前时间点日期及时间
export function getCurrentTime() {
  const curDate = new Date()
  curDate.setTime(curDate.getTime())
  const trandt = formatDate(curDate, 'yyyyMMdd')
  const trantm = formatDate(curDate, 'hhmmss')
  return {
    'trandt': trandt,
    'trantm': trantm
  }
}

// 当前时间往前推length天，通过毫秒计算
export function getTestToExpireDateMinus(length) {
  const testDay = new Date() // 获取今天时间
  const expireDay = new Date() // 获取今天时间
  testDay.setTime(testDay.getTime()) // 当天
  expireDay.setTime(expireDay.getTime() - length * 24 * 3600 * 1000) // 前365天

  const testDate = formatDate(testDay, 'yyyyMMddhhmm')
  const expireDate = formatDate(expireDay, 'yyyyMMddhhmm')
  return {
    'testDate': testDate,
    'expireDate': expireDate
  }
}

// 将yyyyMMddhhmm 更改为yyyy-MM-dd格式
export function formatTimeIntoDate(x) {
  return x.substring(0, 4) + '-' + x.substring(4, 6) + '-' + x.substring(6, 8)
}
export function stringify(content) {
  const stringifiedRegexp = /^'|".*'|"$/
  if (typeof content === 'string' && stringifiedRegexp.test(content)) {
    return content
  }
  return JSON.stringify(content, null, 2)
}

// 将yyyy-MM-dd 更改为yyyy年MM月dd日格式
export function formatTimeIntoChineseDate(x) {
  return x.substring(0, 4) + '年' + x.substring(5, 7) + '月' + x.substring(8, 10) + '日'
}

/**
 * 对象数组排序比较函数（sort方法的参数）
 * @param prop 用来比较的属性
 */
export function compare(prop) {
  return function(obj1, obj2) {
    let val1 = obj1[prop]
    let val2 = obj2[prop]
    // 如果该属性识别为数字，则使用数字比较
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1)
      val2 = Number(val2)
    }
    // 排序规则：从小到大。（前排 - 后排 < 0）
    if (val1 < val2) {
      return -1
    } else if (val1 > val2) {
      return 1
    } else {
      return 0
    }
  }
}

// 避免浮点数精度丢失格式化方法2
export function formatFloat(f, exp) {
  var pow = Math.pow(10, exp)
  return Math.round(f * pow) / pow
}
// 设置cookie JESSIONID
export function setSessionCookie(key, val, times, path) {
  var exp = new Date()
  exp.setTime(exp.getTime() + times * 24 * 60 * 60 * 1000)
  var cookiePath = path || '/'
  document.cookie = key + '=' + val + ' expires=' + exp.toGMTString() + ' path = ' + cookiePath
}
// 删除cookie
export function delSessionId(key, path) {
  var cookiePath = path || '/'
  setSessionCookie(key, '', -1, cookiePath)
}
// 获取cookie 里面的JESSIONID
export function getSessionId(key) {
  var a = document.cookie.split(' ')
  for (var i = 0; i < a.length; i++) {
    var b = a[i].split('=')
    if (b[0] === key) {
      if (b[1] === null || b[1] === '') {
        continue
      }
      return b[1]
    }
  }
}
// 日志打印方法
export function logger(isEnabled, logs) {
  if (isEnabled) {
    console.log(...logs)
  }
}

export function getRandomUuid() { // 生成32位随机uuid
  const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let res = ''
  for (let i = 0; i < 32; i++) {
    const id = Math.floor(Math.random() * 35)
    res += chars[id]
  }
  return res
}

export function getCurDate() {  // 获取当前日期，以yyyy-mm-dd的形式返回
  const date = new Date()
  let month = date.getMonth() + 1
  let day = date.getDate()
  if (month >= 1 && month <= 9) {
    month = "0" + month
  }
  if (day >= 0 && day <= 9) {
    day = "0" + day
  }
  return (date.getFullYear() + '-' + month + '-' + day)
}

export function getAge(strAge) {
  var birArr = strAge.split("-");
  var birYear = birArr[0];
  var birMonth = birArr[1];
  var birDay = birArr[2];

  d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1; //记得加1
  var nowDay = d.getDate();
  var returnAge;

  if (birArr == null) {
    return false
  };
  var d = new Date(birYear, birMonth - 1, birDay);
  if (d.getFullYear() == birYear && (d.getMonth() + 1) == birMonth && d.getDate() == birDay) {
    if (nowYear == birYear) {
      returnAge = 0; //
    } else {
      var ageDiff = nowYear - birYear; //
      if (ageDiff > 0) {
        if (nowMonth == birMonth) {
          var dayDiff = nowDay - birDay; //
          if (dayDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        } else {
          var monthDiff = nowMonth - birMonth; //
          if (monthDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        }
      } else {
        return  "出生日期晚于今天，数据有误"; //返回-1 表示出生日期输入错误 晚于今天
      }
    }
    return returnAge;
  } else {
    return ("输入的日期格式错误！");
  }
}

/**
 * date转字符串 转换后格式为 2021-02-14
 * @param date
 * @returns {string}
 */
export function date2string(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1 + "";
  let day = date.getDate() + "";
  return year + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0");
}

/**
 * 毫秒值转合适的时间差
 * @param millis
 * @returns {{}}
 */
export function millis2FitTime(millis) {
  let time = {}
  let unitLen = [86400000, 3600000, 60000, 1000, 1]
  let units = ["day", "hour", "minutes", "seconds", "millis"];
  for (let i = 0; i < 5; i++) {
    if (millis >= unitLen[i]) {
      let mode = Math.floor(millis / unitLen[i])
      millis -= mode * unitLen[i]
      time[units[i]] = mode
    }
  }
  return time
}

// 阳历转农历
export function solar2Lunar(sDate, type = 1) {
  // let lunarResult = calendar.solar2lunar(parseInt(sDate.substring(0, 4)), parseInt(sDate.substring(5, 7)), parseInt(sDate.substring(8, 10)))
  let lunarResult = Solar.fromYmd(parseInt(sDate.substring(0, 4)), parseInt(sDate.substring(5, 7)), parseInt(sDate.substring(8, 10))).getLunar()
  if (type === 1) {
    // 辛丑年(2021)四月初十
    return lunarResult.getYearInGanZhi() + '年(' + sDate.substring(0, 4) + ')' + lunarResult.getMonthInChinese() + '月' + lunarResult.getDayInChinese()
  } else if (type === 2) {
    // 辛丑年四月初十
    return lunarResult.getYearInGanZhi() + lunarResult.getMonthInChinese() + '月' + lunarResult.getDayInChinese()
  }
}

// 获取对象指定属性的值
export function getValue(obj, propertyName) {
  let value = ""
  if (obj.hasOwnProperty(propertyName) && obj[propertyName] != null && obj[propertyName].length !== 0) {
    value = obj[propertyName]
  }
  return value
}

/**
 * 判断是否微信浏览器
 * @returns {Boolean}
 */
export function isWeixin() {
  return (/micromessenger/i).test(navigator.userAgent)
  // var ua = navigator.userAgent.toLowerCase()
  // return ua.match(/MicroMessenger/i) === 'micromessenger'
}

/**
 * 存储localStorage/sessionStorage/Cookie
 */
export function setGlobalItem(key, value) {
  localStorage.setItem(key, value)
  sessionStorage.setItem(key, value)
  setCookie(key, value, 1)
}

/**
 * 获取localStorage/sessionStorage/Cookie
 */
export function getGlobalItem(key) {
  return localStorage.getItem(key) ? localStorage.getItem(key) : (sessionStorage.getItem(key) ? sessionStorage.getItem(key) : getCookie(key))
}

function getCookie(key) {
  if(document.cookie.length > 0){
    let c_start = document.cookie.indexOf(key + "=");
    if(c_start != -1){
      c_start = c_start + key.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if(c_end == -1){
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return ""
}

function setCookie(key, value, exday) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + exday)
  document.cookie = key + "=" + escape(value) + ";expires=" + exdate.toGMTString()
}
