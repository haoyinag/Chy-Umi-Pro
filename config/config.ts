import { defineConfig } from "umi";

//屏幕自适应--使用于移动端
// const pxtoviewport = require("postcss-px-to-viewport");
import AntdDayjsWebpackPlugin from "antd-dayjs-webpack-plugin";

// import webpackConfig from './webpack.config'

import proxy from "./proxy";

const env = process.env.NODE_ENV;
// const { ANGSI_APP_ENV } = process.env;
// import logo from '/src/asset/logo.svg';

/** 把路由文件放在src下是为了方便按模块拆分组装路由表，而且方便通过请求配置access */
import routes from "../src/router";

const config = defineConfig({
  // title: 'site.title',
  hash: true,
  /** base:如果生产环境也是/，页面会白屏 */
  base: "/",
  history: { type: "hash" },
  publicPath: env === "development" ? "/" : "./",
  favicon: "/public/favicon.ico",
  // mock: false, // mock开关
  /** 开启dva */
  dva: {
    hmr: true, // 热更新
    immer: true, // 是否启用 immer 以方便修改 reducer
    skipModelValidate: false, // 是否跳过 model 验证
    extraModels: [] // 配置额外到 dva model
  },
  /** 启用antd */
  antd: {
    dark: false, // 开启暗色主题
    compact: false // 开启紧凑主题
  },
  analyze: {
    analyzerMode: "server",
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: "stats.json",
    logLevel: "info",
    defaultSizes: "parsed" // stat  // gzip
  },
  routes,
  /** 启用umi的layout插件
   *  如果不开启，layout需要自己实现，
   *  并且不开启src\app.ts的相关如rightRender、logout等会报错
   *  开启之后，会自动读取当前的·routes·配置
   */
  layout: {
    name: "Angsi Design Pro"
    // logo 在这里配置不生效，要在app.tsx配置
    // theme: 'pro', // 指定 Layout 主题, tech 仅在蚂蚁内部框架 Bigfish 中生效
    /** 是否开始国际化配置。开启后路由里配置的菜单名会被当作菜单名国际化的 key，
     * 插件会去 locales 文件中查找 menu.[key]对应的文案，默认值为改 key。
     * 该功能需要配置 @umijs/plugin-locale 使用 */
    // locale: true,
  },
  /** 国际化--构建式配置，src/locals是约定式配置*/
  locale: {
    title: true, // 标题国际化.在项目中配置的 title 及路由中的 title 可直接使用国际化 key，自动被转成对应语言的文案
    default: "zh-CN", // 默认语言，当检测不到具体语言时，展示 default 中指定的语言
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true, // 开启后，支持 antd 国际化
    baseNavigator: true, // 开启浏览器语言检测
    baseSeparator: "-" // 国家（lang） 与 语言（language） 之间的分割符
    //  ...
  },
  /** html在head标签中新增的额外脚本，js文件地址或者表达式或者json：{ src: '/foo.js', defer: true },
      { content: `alert('你好');`, charset: 'utf-8' }, */
  headScripts: [`console.log("页面加载");`],
  /** 浏览器兼容 */
  targets: {
    // { chrome: 49, firefox: 64, safari: 10, edge: 13, ios: 10 }
    ie: 11
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
    loading: "@/Loading" // 全局loading组件
  },
  /** 主题配置 */
  theme: {
    // ...darkTheme,
    // 'primary-color': defaultSettings.primaryColor,
  },
  /** 忽略 moment 的 locale 文件，用于减少尺寸 */
  ignoreMomentLocale: true,
  // lessLoader: {}
  /** 设置 node_modules 目录下依赖文件的编译方式, */
  nodeModulesTransform: {
    type: "none"
  },
  /** 只在 umi build 时会生成，配置是否需要生成额外用于描述产物的 manifest 文件，默认会生成 asset-manifest.json */
  manifest: {
    // fileName:'manifest.json',文件名，默认是 asset-manifest.json
    // publicPath: '/', // 默认会使用 webpack 的 output.publicPath 配置
    basePath: "/" // 给所有文件路径加前缀
  },
  postcssLoader: {},
  proxy: proxy.dev,
  /** 配置 mock 属性 */
  // mock:{},
  /** 配置额外的 meta 标签 */
  // metas: [],
  // mountElementId:'root', // 指定 react app 渲染到的 HTML 元素 id；指定 react app 渲染到的 HTML 元素 id
  // mpa:{} 切换渲染模式为 mpa=>为每个页面输出 html;为每个页面输出 html;
  /** 配置压缩器 terser 的配置项 */
  // terserOptions: {}
  extraPostCSSPlugins: [
    //屏幕自适应--使用于移动端
    // ******* 用的自己打开, 不要上传 *******
    // pxtoviewport({
    //   viewportWidth: 1920,
    //   viewportHeight: 1080,
    //   unitPrecision: 5,
    //   viewportUnit: "vw",
    //   selectorBlackList: [],
    //   minPixelValue: 1,
    //   mediaQuery: false,
    //   exclude: []
    // })
  ],
  chainWebpack: (config: any) => {
    /** dayjs替换momentjs */
    config.plugin("AntdDayjsWebpackPlugin").use(AntdDayjsWebpackPlugin);

    config.module
      .rule("stylus")
      .test(/\.styl$/)
      .use("style-loader!css-loader!stylus-loader")
      .loader("style-loader!css-loader!stylus-loader");
    return config;
    // return webpackConfig(config)
  }
});

export default config;
