/**
 * 手机号脱敏处理
 * @param mobile 手机号
 * @returns
 */
export function maskMobile(mobile?: number | string | null) {
  return mobile?.toString().replace(/(\d{3})\d*(\d{4})/u, '$1****$2');
}
export function camelToSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export function dateFormat(fmt: string, date: Date): string {
  let newFmt = fmt;
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (const k in opt) {
    if (Object.prototype.hasOwnProperty.call(opt, k)) {
      const ret = new RegExp(`(${k})`).exec(newFmt);
      if (ret) {
        newFmt = newFmt.replace(
          ret[1],
          ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
        );
      }
    }
  }
  return newFmt;
}



/**
 * 秒转时间
 * @param second 秒数
 * @param connector 连接符号，默认中文
 * @returns string 拼接时间
 */
export function secondToDate(second: number, connector?: string) {
  const h = Math.floor(second / 3600);
  const m = Math.floor((second / 60) % 60);
  const s = Math.floor(second % 60);
  return connector
    ? `${fillGap(h)}${connector}${fillGap(m)}${connector}${fillGap(s)}`
    : `${h ? `${h}小时` : ''}${m ? `${m}分钟` : ''}${s ? `${s}秒` : ''}`;
}

export function fillGap(number: number): string {
  if (typeof number !== 'number') {
    return '00';
  }
  return number > 9 ? `${number}` : `0${number}`;
}

/**
 * @param month 当前月
 * @param year  当前年
 * @returns 当年当月有多少天
 */
export function leapYearDays(month, year) {
  const num = month;
  const temp: number[] = [];
  if (
    num === 1 ||
    num === 3 ||
    num === 5 ||
    num === 7 ||
    num === 8 ||
    num === 10 ||
    num === 12
  ) {
    //判断31天的月份
    for (let i = 1; i <= 31; i++) {
      temp.push(i);
    }
    return temp;
  } else if (num === 4 || num === 6 || num === 9 || num === 11) {
    //判断30天的月份
    for (let i = 1; i <= 30; i++) {
      temp.push(i);
    }
    return temp;
  } else if (num === 2) {
    if ((year % 400 === 0 || year % 100 !== 0) && year % 4 === 0) {
      for (let i = 1; i <= 29; i++) {
        temp.push(i);
      }
      return temp;
    }
    for (let i = 1; i <= 28; i++) {
      temp.push(i);
    }
    return temp;
  }
  return [];
}

/**
 * 将一个浮点数拆分成整数部分和小数部分
 * @param {number} number 需要拆分的浮点数
 * @param {number} decimal 小数点后的精度位数(0-99)
 */
export function splitNumberIntoIntegerAndFloat(
  number: number,
  decimal = 2
): [string, string] {
  const [_integer, _decimal] = number
    .toFixed(decimal + 1)
    .slice(0, -1)
    .split('.');
  return [_integer, _decimal];
}

function pad(number: number) {
  if (number < 10) {
    return `0${number}`;
  }
  return `${number}`;
}

export function formatPrice(price: number) {
  return price.toFixed(3).slice(0, -1);
}

//判断是否为手机号
export function isPhone(phone): boolean {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!reg.test(phone)) {
    return false;
  }
  return true;
}

/**
 * 计算剩余时间
 * @param remaining 剩余秒数
 * @returns
 */
export function calcRemainingTime(remaining: number) {
  if (remaining < 1000) {
    return {
      day: '0',
      hour: '0',
      minute: '0',
      second: '0'
    };
  }
  const day = Math.floor(remaining / 1000 / 3600 / 24);
  const hour = Math.floor((remaining / 1000 / 3600) % 24);
  const minute = Math.floor((remaining / 1000 / 60) % 60);
  const second = Math.floor((remaining / 1000) % 60);
  return {
    day: `${day}`,
    hour: pad(hour),
    minute: pad(minute),
    second: pad(second)
  };
}


export function toCamel(str: string) {
  const strArr = str.split('_');
  return strArr
    .map(item => {
      return singleWordToCamel(item);
    })
    .join('');
}

function singleWordToCamel(str) {
  return str.replace(/\b(\w)(\w*)/g, (_$0, $1, $2) => {
    return $1.toUpperCase() + $2.toLowerCase();
  });
}

