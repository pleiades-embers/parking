import {
  getFileSystemManager,
  General,
  showToast,
  CanvasContext
} from '@tarojs/taro';

interface ReadFileCallbackResult extends General.CallbackResult {
  data: string;
}
/**
 * url 转为base64
 */
export function urlToBase64(
  imagePath: string,
  ctx?: CanvasContext
): Promise<string>;

// eslint-disable-next-line no-redeclare
export function urlToBase64(imgPath, ctx?) {
  return new Promise(resolve => {
    if (ctx) {
      ctx.drawImage(imgPath, 0, 0, 300, 225);
      ctx.draw(false, () => {
        ctx.toDataURL({}).then(dataURL => {
          resolve(dataURL);
        });
      });
    } else {
      getFileSystemManager().readFile({
        filePath: imgPath,
        encoding: 'base64',
        success: (res: ReadFileCallbackResult) => {
          const base64 = `data:image/png;base64,${res.data}`;
          resolve(base64);
        },
        fail: () => {
          showToast({
            title: '上传失败，请检查网络！',
            icon: 'none'
          });
        }
      });
    }
  });
}
