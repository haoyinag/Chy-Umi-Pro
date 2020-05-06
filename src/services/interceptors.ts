import { extend } from "umi-request";

import { message } from "antd";

import { codeMapsError } from "./errorMaps";

/**
 * 异常处理程序
 */
const errorHandler = (error: any) => {
  // const { response = {} } = error;
  const { type } = JSON.parse(`${JSON.stringify(error)}`);
  if (type.toLowerCase() === "timeout") {
    message.destroy();
    message.error("请求超时");
  }
  return error;
};
const request = extend({
  suffix: "", // 后缀
  prefix: "/api", // 统一请求前缀--如果与proxy代理同名，会请求代理
  timeout: 5000,
  // credentials: '',
  useCache: false, // 是否使用缓存（仅支持浏览器客户端），默认false
  ttl: 60000, // 缓存时长, 0 为不过期
  requestType: "json", // json , text , blob , formData ...
  parseResponse: true, //	是否对 response 做处理简化
  errorHandler // 默认错误处理
});

// request interceptor, change url or options.
request.interceptors.request.use((url, options) => {
  message.loading({ content: "Loading...", duration: 0 });
  return {
    url: `${url}`,
    options: { ...options, interceptors: true }
  };
});

// Same as the last one
request.interceptors.request.use(
  (url, options) => {
    return {
      url: `${url}`,
      options: { ...options, interceptors: true }
    };
  },
  { global: true }
);

// response interceptor, chagne response
request.interceptors.response.use((response, options) => {
  // console.log(response, options);
  // response.headers.append('interceptors', 'yes yo');
  return response;
});

// handling error in response interceptor
request.interceptors.response.use(response => {
  console.log(response);
  setTimeout(() => {
    message.destroy();
    // response.status === 200 && message.success("请求成功");
    response.status !== 200 && message.error(codeMapsError[response.status]);
  }, 350);
  return response;
});

// clone response in response interceptor
request.interceptors.response.use(async response => {
  const data = await response.clone().json();
  console.log(data);

  if (data && data.NOT_LOGIN) {
    location.href = "登录url";
  }
  return response;
});

export default request;
