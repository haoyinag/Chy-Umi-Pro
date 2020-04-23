import { defineConfig } from 'umi';

const env = process.env.NODE_ENV;

/** 把路由文件放在src下是为了方便按模块拆分组装路由表，而且方便通过请求配置access */
import routes from '../src/router';

export default defineConfig({
  title: 'site.title',
  hash: true,
  /** base:如果生产环境也是/，页面会白屏 */
  base: env === 'development' ? '/' : './',
  history: { type: 'hash' },
  publicPath: '/',
  favicon: '/public/favicon.ico',
  // mock: false, // mock开关
  /** 开启dva */
  dva: {
    hmr: true, // 热更新
    immer: true, // 是否启用 immer 以方便修改 reducer
    skipModelValidate: false, // 是否跳过 model 验证
    extraModels: [], // 配置额外到 dva model
  },
  /** 启用antd */
  antd: {
    dark: false, // 开启暗色主题
    compact: false, // 开启紧凑主题
  },
  routes,
  /** 启用umi的layout插件
   *  如果不开启，layout需要自己实现，
   *  并且src\app.ts的相关如rightRender、logout等会报错
   *  开启之后，会自动读取当前的·routes·配置
   */
  layout: {
    name: 'UmiPro', // 侧边栏头部产品名，默认值为包名
    // logo: '', // 产品 Logo
    theme: 'pro', // 指定 Layout 主题, tech 仅在蚂蚁内部框架 Bigfish 中生效
    // locale: true, //
    /** 是否开始国际化配置。开启后路由里配置的菜单名会被当作菜单名国际化的 key，
     * 插件会去 locales 文件中查找 menu.[key]对应的文案，默认值为改 key。
     * 该功能需要配置 @umijs/plugin-locale 使用 */
    locale: true,
  },
  /** 国际化--构建式配置，src/locals是约定式配置*/
  // locale: {
  //      title:true, // 标题国际化.在项目中配置的 title 及路由中的 title 可直接使用国际化 key，自动被转成对应语言的文案
  //     default: 'zh-CN', // 默认语言，当检测不到具体语言时，展示 default 中指定的语言
  //     // default true, when it is true, will use `navigator.language` overwrite default
  //     antd: true, // 开启后，支持 antd 国际化
  //     baseNavigator: true, // 开启浏览器语言检测
  //     baseSeparator: '-', // 国家（lang） 与 语言（language） 之间的分割符
  //      ...
  // },
  /** html在head标签中新增的额外脚本，js文件地址或者表达式或者json：{ src: '/foo.js', defer: true },
    { content: `alert('你好');`, charset: 'utf-8' }, */
  headScripts: [`console.log("页面加载");`],
  /** 浏览器兼容 */
  targets: {
    ie: 11,
  },
  /** qiankun
       * ✔︎ 基于 qiankun
          ✔︎ 支持主应用和子应用都用 umi
          ✔︎ 支持主子应用 browser、hash 等多种 history 模式
          ✔︎ 父子应用通讯
          ✔︎ 子应用运行时配置自定义 bootstrap()、mount() 和 unmount()
          ✔︎ 主应用、子应用联调
       */
  // qiankun:{},
  /** 开启按需加载 */
  dynamicImport: {
    loading: '@/Loading', // 全局loading组件
  },
  /** 主题配置 */
  theme: {
    // ...darkTheme,
    // 'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  nodeModulesTransform: {
    type: 'none',
  },
  manifest: {
    basePath: '/',
  },
});
