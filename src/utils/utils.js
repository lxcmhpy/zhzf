/**
 *
 * 时间戳转日期时间
 */
export function timeStampToDate(timeStamp) {
  const time = new Date(timeStamp)
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  let hour = time.getHours()
  let minute = time.getMinutes()
  let second = time.getSeconds()
  if(hour < 10) {
    hour = `0${hour}`
  }
  if(minute < 10) {
    minute = `0${minute}`
  }
  if(second < 10) {
    second = `0${second}`
  }
  return `${year}.${month}.${day} ${hour}:${minute}:${second}`
}

/**
 *
 * 数字金额转化为汉字金额
 */
export function upMoney(n){
  let fraction = ['角', '分'];
  let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  let unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟'] ];
  let head = n < 0? '欠': '';
  n = Math.abs(n);
  let s = '';
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);

  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}
