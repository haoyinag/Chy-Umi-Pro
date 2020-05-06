import Demo from "./Demo";
import Task from "./Task";

/** 如果有必要，可以通过接口返回对应的路由表以及各种权限
 *  通过配置如
      layout: { hideNav: true, // 是否当前路由隐藏导航头，默认不隐藏 hideMenu: true, // 是否当前路由隐藏左侧菜单，默认不隐藏 },
    或者layout: false 
      可以隐藏layout
    
 */
const router: any[] = [
  {
    path: "/",
    title: "首页",
    name: "首页", // 如果添加了name属性，会在路由表出现对应的路由item
    // redirect: "/index",
    exact: true, // 表示是否严格匹配，即 location 是否和 path 完全对应上
    component: "@/pages/Index"
    // routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用
    // redirect 配置路由跳转
    // wrappers 配置路由的高阶组件封装。
    /**
         * wrappers: [
                '@/wrappers/auth',
            ],
         */
  },
  {
    path: "/404",
    title: "页面丢失",
    exact: true,
    component: "@/pages/Page404" // () => import(/* webpackChunkName: "about" */ "../views/404.vue")
  },
  {
    path: "/user/login",
    // name: '登录页',
    title: "登录页",
    icon: "user",
    layout: {
      hideNav: true, // 是否当前路由隐藏导航头，默认不隐藏
      hideMenu: true // 是否当前路由隐藏左侧菜单，默认不隐藏
    },
    exact: true, // 表示是否严格匹配，即 location 是否和 path 完全对应上
    component: "@/pages/User/Login"
  },
  { ...Task }

  /** 新增路由表放在demo路由前面，官方控件有莫名的bug */
  // { ...Demo }
  // {
  // path: '/admin',
  // // name: 'admin',
  // icon: 'crown',
  // /** access--当 Layout 插件配合 @umijs/plugin-access 插件使用时生效
  //  *  权限插件会将用户在这里配置的 access 字符串与当前用户所有权限做匹配，
  //  *  如果找到相同的项，并当该权限的值为 false，则当用户访问该路由时，默认展示 403 页面
  //  */
  // access: 'canAdmin',
  // component: './Admin',
  // layout: {
  //     // hideNav: true, // 是否当前路由隐藏导航头，默认不隐藏
  //     // hideMenu: true, // 是否当前路由隐藏左侧菜单，默认不隐藏
  // },
  // /** menu下字段会覆盖当前层级的同名字段 */
  // menu: {
  //     name: '欢迎admin', // 兼容此写法
  //     // icon: 'crown', // 当前icon字段不生效，估计是官方bug
  //     hideChildren: false, //  默认为false，在菜单中隐藏他的子项，只展示自己
  //     flatMenu: false, // 默认为false 在菜单中只隐藏此项，子项往上提，仍旧展示
  // },
  // routes: [
  //     {
  //         path: '/admin/sub-page',
  //         name: 'sub-page',
  //         icon: 'smile',
  //         component: './Welcome',
  //     },
  // ],
  // },
];

if (process.env.NODE_ENV === "development") {
  router.push(Demo);
}

export default router;
