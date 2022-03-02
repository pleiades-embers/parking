/*
  如何限制时间处理函数频繁调用
      1.函数节流
      2.函数防抖
  */



/*
  3. 函数节流(throttle)
      1.理解:
          在函数需要频繁出发时:函数执行一次后,只有大于设定得执行周期后才会执行第二次
          适合多次事件按事件做平均分配触发
      2.场景:
          窗口调整(resize)
          页面滚动(scroll)
          DOM 元素得拖拽功能实现(mousemove)
          抢购疯狂点击(click)
  */

/*
  4. 函数防抖(debounce)
      1).理解:
         在函数需要频繁触发时:在规定事件内,只让最后一次生效,前面得不生效.
         适合多次事件一次响应得情况
      2).场景:
          输入框试试搜索联想(keyup/input)
 */
export const throttle = (callback, delay = 1000) => {
  let pre = 0;

  return function (event) {
    const current = new Date().getTime();
    if (current - pre > delay) {
      //只有离上一次调用callback得时间差大于delay
      //调用真正处理事件得函数,this是事件源
      callback.call(this, event);
      //记录此次调用得时间
      pre = current;
    }
  };
};




// 将所传入的数字转换为字符串，若字符串的长度小于所指定的长度，则在起始位置以数字 「0」 补足长度。
// 最多支持 5 位补足长度。
function fill(number, length) {
  const filler = '00000';
  let str = number.toString();

  if (str.length < length) {
    str = filler.substring(0, length - str.length) + str;
  }

  return str;
}
export function createUnique() {
  const now = new Date();
  const unique = [
    "alipay",
    '-',
    now.getFullYear(),
    fill(now.getMonth() + 1, 2),
    fill(now.getDate(), 2),
    fill(now.getHours(), 2),
    fill(now.getMinutes(), 2),
    fill(now.getSeconds(), 2),
    fill(now.getMilliseconds(), 3),
    Math.random().toFixed(20).substring(2)
  ].join('');
  return unique;
}
