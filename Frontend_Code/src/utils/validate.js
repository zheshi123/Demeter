/**
 * Created by zyt5668 on 18/6/18.
 */

export function validUsername(str) {
  // var reg = /^[A-Z]|[a-z]|[_+\.=@]|[1-9]+$/
  var reg = /^[a-zA-Z0-9$-_+\.=@]+$/
  return reg.test(str)
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 是否包含中文*/
export function isContainChinese(str) {
  var lst = /[\u4e00-\u9fa5]/
  return lst.test(str)
}

/* 是否是手机号*/
export function isMobilePhone(str) {
  var reg = new RegExp('^[\\d+-]*$')
  return reg.test(str)
}

export function isPhoneNoAvailable(pone) {
  var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  if (!myreg.test(pone)) {
    return false
  } else {
    return true
  }
}

export function checkPhone(str) {
  /* let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
  return reg.test(str);*/
  var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  if (!myreg.test(str)) {
    return false
  } else {
    return true
  }
}

export function checkSixNumber(str) {
  // var str = $("#numr").val().trim();
  if (str.length === 6) {
    var reg = /^\d{6}$/
    if (!reg.test(str)) {
      return false
    }
  } else {
    return false
  }
  return true
}

export function check4Number(str) {
  // var str = $("#numr").val().trim();
  if (str.length === 4) {
    var reg = /^\d{4}$/
    if (!reg.test(str)) {
      return false
    }
  } else {
    return false
  }
  return true
}

export function isPriceNumber(_keyword) {
  if (_keyword === '0' || _keyword === '0.' || _keyword === '0.0' || _keyword === '0.00') {
    _keyword = '0'
    return true
  } else {
    var index = _keyword.indexOf('0')
    var length = _keyword.length
    if (index === 0 && length > 1) { /* 0开头的数字串*/
      var reg = /^[0]{1}[.]{1}[0-9]{1,2}$/
      if (!reg.test(_keyword)) {
        return false
      } else {
        return true
      }
    } else { /* 非0开头的数字*/
      const reg = /^[1-9]{1}[0-9]{0,10}[.]{0,1}[0-9]{0,2}$/
      if (!reg.test(_keyword)) {
        return false
      } else {
        return true
      }
    }
  }
}

export function deepClone(obj) {
  const objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key])
        } else {
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}

/**
 * 判断是否为空
 * @param param 参数
 * @returns {boolean} 为空返回true，否则返回false
 */
export function isEmpty(param) {
  // null or undefined
  if (param === null || param === undefined) return true

  if (typeof param === 'boolean') return false

  if (typeof param === 'number') return false

  if (param instanceof Error) return param.message === ''

  switch (Object.prototype.toString.call(param)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !param.length
    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]':
      return !param.size
    // Plain Object
    case '[object Object]': {
      return !Object.keys(param).length
    }
  }
  return false
}

export function isNotEmpty(obj) {
  return !isEmpty(obj)
}

/**
 * 校验经度
 * @returns {string|boolean}
 */
export function checkLongitude(longitude) {
  const longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,}|180)$/
  return longrg.test(longitude)
}

/**
 * 校验纬度
 * @returns {string|boolean}
 */
export function checkLatitude(latitude) {
  const latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,}|90\.0{0,}|[0-8]?\d{1}|90)$/
  return latreg.test(latitude)
}

/**
 * 校验是否图片
 * @param file File
 * @returns {boolean}
 */
export function isImage(file) {
  if (file.type.toLowerCase().indexOf('image/jpg') === -1 && file.type.toLowerCase().indexOf('image/jpeg') === -1 && file.type.toLowerCase().indexOf('image/png') === -1) {
    return false
  }
  return true
}

/**
 * 校验不超过500kb
 * @param file File
 * @returns {boolean}
 */
export function isImageNoMoreThan500(file) {
  console.log('file', file)
  if (file.size >= 500 *1024) {
    return false
  }
  return true
}

/**
 *  去字符串左右两端空格
 */
export function strTrim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * 校验身份证号码是否合规 只要结果
 */
export function validTouristCardId(cardId) {
  if (cardId.length !== 18) {
    return false
  }
  const format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
  // 号码规则校验
  if (!format.test(cardId)) {
    return false
  }
  // 区位码校验
  // 出生年月日校验   前正则限制起始年份为1900;
  const year = cardId.substr(6, 4) // 身份证年
  const month = cardId.substr(10, 2) // 身份证月
  const date = cardId.substr(12, 2) // 身份证日
  const time = Date.parse(month + '-' + date + '-' + year) // 身份证日期时间戳date
  const now_time = Date.parse(new Date()) // 当前时间戳
  const dates = (new Date(year, month, 0)).getDate() // 身份证当月天数
  if (time > now_time || date > dates) {
    return false
  }
  // 校验码判断
  const c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 系数
  const b = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']  // 校验码对照表
  const id_array = cardId.split('')
  let sum = 0
  for (let k = 0; k < 17; k++) {
    sum += parseInt(id_array[k]) * parseInt(c[k])
  }
  if (id_array[17].toUpperCase() !== b[sum % 11].toUpperCase()) {
    return false
  }
  return true
}

/**
 *  校验机构号
 * @param orgNo
 */
export function validateOrgNo(orgNo) {
  const reg = /^[A-Za-z0-9]+$/
  return reg.test(orgNo)
}

/**
 * 使用*号格式化字符串
 * formatByStar("15012341688", 4, 7) ==> 150****1688
 * formatByStar("110101199003071276", 7, 14) ==> 110101********1276
 * @param str 字符串
 * @param start 开始位置(从1开始)
 * @param end 结束位置
 * @returns {string|*}
 */
export function formatByStar(str, start, end) {
  if (str === "" || str === null || str === undefined) {
    return "";
  }

  if (start > str.length || end > str.length) {
    return str;
  }

  let len = end - start;
  let starStr = '';
  for (let i = 0; i <= len; i++) {
    starStr += '*';
  }

  return str.substring(0, start - 1) + starStr + str.substring(end);
}
