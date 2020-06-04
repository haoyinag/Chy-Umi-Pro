const env = API_ENV || 'dev'; // 环境变量

// 各个环境接口地址
const apiList = {
  dev: 'https://dev-api.xxx.com', // 开发环境
  test: 'https://test-api.xxx.com', // 测试环境
  uat: '.', // 预发布环境
  prod: 'https://api.xxx.com', // 生产环境
};
let api = '';
// build打包时
if (process.env.NODE_ENV === 'production') {
  api = apiList[env];
} else {
  // 本地开发时
  // /api是在webpack devServer中代理开发环境地址来解决跨域问题
  switch (env) {
    case 'uat':
      api = '/api';
      break;
    default:
      api = apiList[env];
      break;
  }
}

export const API = api;

export const API_ADMIN = '/admin'; // 旧生产后台前缀
export const API_DELIVERY = '/delivery'; // 新配送后台

// 电商后台地址 （暂时作用于跳转电商后台订单详情）
export const adminUrl = {
  dev: 'https://dev-xxx.com', // 开发环境
  test: 'https://test-xxx.com', // 测试环境
  uat: 'https://test-xxx.com', // 预发布环境
  prod: 'https://xxx.com', // 生产环境
};
