import { defineConfig } from 'umi';

/** 把路由文件放在src下是为了方便按模块拆分组装路由表，而且方便通过请求配置access */
import routes from '../src/router'

export default defineConfig({
    title: 'site.title',
    hash: true,
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
    /** 浏览器兼容 */
    targets: {
        ie: 11,
    },
    /** 启用umi的layout插件
     *  如果不开启，layout需要自己实现，
     *  并且src\app.ts的相关如rightRender、logout等会报错
     *  开启之后，会自动读取当前的·routes·配置
     */
    layout: {
        name: 'Ant Design', // 产品名，默认值为包名
        // logo: '', // 产品 Logo
        theme: 'pro', // 指定 Layout 主题, tech 仅在蚂蚁内部框架 Bigfish 中生效
        // locale: true, // 
        /** 是否开始国际化配置。开启后路由里配置的菜单名会被当作菜单名国际化的 key，
         * 插件会去 locales 文件中查找 menu.[key]对应的文案，默认值为改 key。
         * 该功能需要配置 @umijs/plugin-locale 使用 */
        locale: true,
    },
    routes,
    //  [
    //     { path: '/', component: '@/pages/index' },
    //     {
    //         path: '/admin',
    //         name: 'admin',
    //         icon: 'crown',
    //         /** access--当 Layout 插件配合 @umijs/plugin-access 插件使用时生效
    //          *  权限插件会将用户在这里配置的 access 字符串与当前用户所有权限做匹配，
    //          *  如果找到相同的项，并当该权限的值为 false，则当用户访问该路由时，默认展示 403 页面
    //          */
    //         access: 'canAdmin',
    //         component: './Admin',
    //         layout: {
    //             // hideNav: true, // 是否当前路由隐藏导航头，默认不隐藏
    //             // hideMenu: true, // 是否当前路由隐藏左侧菜单，默认不隐藏
    //         },
    //         routes: [
    //             {
    //                 path: '/admin/sub-page',
    //                 name: 'sub-page',
    //                 icon: 'smile',
    //                 component: './Welcome',
    //             },
    //         ],
    //     },
    // ],

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
