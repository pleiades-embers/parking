import { getSystemInfoSync } from '@tarojs/taro';

// 按缩放比例计算对应的px值(主要用于那些只能写死px的canvas等等，用此方法动态计算出px值)
export const getPx = (number, designWidth = 750) => {
  const sys = getSystemInfoSync();
  const scale = sys.screenWidth / designWidth; // 缩放比例
  return Number(number * scale).toFixed(0); // 返回缩放后的值
};
