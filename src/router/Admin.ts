export default {
  // title: 'Admin页面',
  // path: '/welcome', // 如果一级路由有path字段，最好有对应的component负责渲染，否则面包屑导航不精确
  // component: '@/pages/Admin',
  name: 'welcome',
  icon: 'crown',
  /** access--当 Layout 插件配合 @umijs/plugin-access 插件使用时生效
   *  权限插件会将用户在这里配置的 access 字符串与当前用户所有权限做匹配，
   *  如果找到相同的项，并当该权限的值为 false，则当用户访问该路由时，默认展示 403 页面
   */
  access: 'canAdmin',
  /** menu下字段会覆盖当前层级的同名字段 */
  menu: {
    name: '欢迎', // 兼容此写法
    // icon: 'crown', // 当前icon字段不生效，估计是官方bug
    hideChildren: false, //  默认为false，在菜单中隐藏他的子项，只展示自己
    flatMenu: false, // 默认为false 在菜单中只隐藏此项，子项往上提，仍旧展示
  },
  routes: [
    {
      // path: '/welcome/sub-page1',
      name: '二级页面',
      icon: 'smile',
      // component: '@/pages/Admin',
      routes: [
        {
          path: '/welcome/sub-sub-page1',
          name: '三级页面',
          icon: 'UnorderedList',
          component: '@/pages/Admin',
        },
      ],
    },
  ],
};
