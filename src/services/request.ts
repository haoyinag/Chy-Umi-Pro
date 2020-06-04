import { extend, ResponseError } from 'umi-request';
import { history } from 'umi';
import { message } from 'antd';

import { codeMapsError } from './errorMaps';

import { API, API_ADMIN as ADMIN, API_DELIVERY as DELIVERY } from './host';

export type MethodType = 'get' | 'post' | 'put' | 'delete';

export enum ErrorShowType {
  SILENT = 0, // 不提示错误
  WARN_MESSAGE = 1, // 警告信息提示
  ERROR_MESSAGE = 2, // 错误信息提示
  NOTIFICATION = 4, // 通知提示
  REDIRECT = 9, // 页面跳转
}

export interface RequestProps {
  (url: string, options: object, method?: MethodType): Promise<any>;
}

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  const { response, data = {} } = error;
  console.log(response);
  if (!response) {
    message.error('不明原因导致请求失败,请联系技术人员解决', 3);
    return response;
  }

  const errortext =
    codeMapsError[response?.status] || data?.message || response?.statusText;
  const { status } = response;
  message.error(errortext);
  console.log(status, response?.statusText, data?.message);
  if (status === 401) {
    return history.push('/user/login');
  }
  // 返回加一层是为了统一正确错误格式
  return { data };
};

export const isEmptyString = (str: any) => {
  return (
    typeof str === 'undefined' || str === null || str === '' || str.length < 0
  );
};

// 获取token
export const getAuthToken = () => {
  let _userInfo: any = sessionStorage.getItem('userInfo')
    ? sessionStorage.getItem('userInfo')
    : '';
  _userInfo = isEmptyString(_userInfo) ? '' : JSON.parse(_userInfo).token;
  return _userInfo;
};

/**
 * 配置request请求时的默认参数
 */
const requestNative = extend({
  timeout: 5000,
  prefix: API, // 前缀
  suffix: '', // 后缀
  // useCache: false, // 是否使用缓存（仅支持浏览器客户端），默认false
  ttl: 60000, // 缓存时长, 0 为不过期
  requestType: 'json', // post请求时数据类型  json / form
  parseResponse: true, //	是否对 response 做处理简化
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  getResponse: true, // 是否获取源response, 返回结果将包裹一层
});

/**
 * 请求拦截器 添加loading
 */
requestNative.interceptors.request.use((url, options) => {
  // message.loading({ content: "1Loading...", duration: 0 });
  return { url, options };
});

/**
 *
 * @param url url地址
 * @param options 选项
 * @param method 请求方法
 */
const request: RequestProps = (url, options, method = 'get') => {
  // message.loading("Loading...", 0);
  return new Promise((resolve, reject) => {
    requestNative[method](url, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-System-Id': '1',
        'X-Auth-Token': getAuthToken(),
      },
      ...options,
    })
      .then((response) => {
        if (response?.data?.status === 200) {
          /** 哪怕请求成功，后台经常会返回null，所以页面为了处理，显式返回true */
          resolve(response?.data?.data || true);
        } else {
          reject(response?.data);
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

/**
 * get请求
 * @param url url
 * @param params 请求参数
 */
export const Get = (url: string, params: object = {}) => {
  return request(url, {
    params,
  });
};

/**
 * post请求
 * @param url url
 * @param data 请求参数
 */
export const Post = (url: string, data: object = {}) => {
  return request(
    url,
    {
      data,
    },
    'post',
  );
};

/**
 * PUT请求
 * @param url url
 * @param data 请求参数
 */
export const Put = (url: string, data: object = {}) => {
  return request(
    url,
    {
      data,
    },
    'put',
  );
};

/**
 * DELETE请求
 * @param url url
 * @param data 请求参数
 */
export const Delete = (url: string, data: object = {}) => {
  return request(
    url,
    {
      data,
    },
    'delete',
  );
};

export const API_ADMIN = ADMIN; // 旧生产后台前缀
export const API_DELIVERY = DELIVERY; // 新后台

export default request;
