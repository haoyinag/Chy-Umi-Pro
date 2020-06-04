// import { RcFile } from "@/types";
import qs from 'qs';
import html2canvas from 'html2canvas';

import { API } from '@/services/host';

import { message } from 'antd';

export function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

/** 避免驼峰命名在React中引起属性命名冲突，key值全部换成小写 */
export const setKeystoLocaleLowerCase = (list: any) => {
  const arr: any[] = [];
  for (const iterator of list) {
    const item: any = {};
    for (const key in iterator) {
      if (iterator.hasOwnProperty(key)) {
        let lowStr = key.toLocaleLowerCase();
        const element = iterator[key];
        item[lowStr] = element;
      }
    }
    arr.push(item);
  }

  return arr;
};

/** 过滤非0无效属性 */
export const filterObjectNull = (obj: any) => {
  const o: any = {};
  let count = 0;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] || obj[key] === 0) {
        o[key] = obj[key];
        count++;
      }
    }
  }

  return count ? o : false;
};

/** 获取对象所有键的值 */
export const getKeyValueArray = (obj: any): any[] => {
  let arr: any[] = [];
  Object.keys(obj).forEach((key: any) => {
    arr = arr.concat(obj[key]);
  });
  return arr;
};

/**
 * 导出
 * @param url 导出接口
 * @param params 参数 可选
 * @param api 接口前缀 可选 默认当前 x-api.xxx.com
 */
export const exportData = (
  url: string,
  params: any = {},
  api: string = API,
) => {
  let userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}') || {};
  params['X-Auth-Token'] = userInfo.token;
  let query = qs.stringify(params);
  window.open(`${api}${url}?${query}`);
};

/**
 * 导出图片
 * @param container dom节点，需要通过ref获取
 * @param type 导出的图片格式，默认png 可选
 * @param name 导出的图片名称 可选
 * @param isExport 是否导出，默认true 可选
 * @param options html2canvas的配置项 可选
 *
 * Exp: exporDomToImage({ container: mapDiv.current, });
 */
export const exporDomToImage = ({
  container,
  name = 'photo',
  options,
  type = 'png',
  isExport = true,
}: {
  container: any;
  name?: string;
  options?: Object;
  type?: string;
  isExport?: boolean;
}) => {
  // console.log(container, type, name, options);
  return new Promise(async (resolve, reject) => {
    html2canvas(container, options)
      .then((canvas: any) => {
        const src: string = canvas?.toDataURL(`image/${type}`) || '';
        if (isExport && src) {
          let image = new Image();
          image.src = src;
          // 解决跨域 Canvas 污染问题
          image.setAttribute('crossOrigin', 'anonymous');
          image.onload = () => {
            let canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            let context: any = canvas.getContext('2d');
            context.drawImage(image, 0, 0, image.width, image.height);
            let url = canvas.toDataURL(`image/${type}`); //得到图片的base64编码数据
            let a = document.createElement('a'); // 生成一个a元素
            let event = new MouseEvent('click'); // 创建一个单击事件
            a.download = name; // 设置图片名称
            a.href = url; // 将生成的URL设置为a.href属性
            a.dispatchEvent(event); // 触发a的单击事件
          };
          image.onerror = (err) => {
            console.log(err);
            message.error('图片加载错误导致无法导出');
            reject('图片加载错误导致无法导出');
          };
        }
        resolve(src);
      })
      .catch((err: any) => {
        console.log(err);
        message.error('请传入有效的ref节点');
        reject();
      });
  });
};
