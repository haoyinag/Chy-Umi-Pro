export default {
  // title: 'Demo页面',
  // path: '/demo', // 如果一级路由有path字段，最好有对应的component负责渲染，否则面包屑导航不精确
  // component: '@/pages/Demo',
  icon: 'crown',
  /** access--当 Layout 插件配合 @umijs/plugin-access 插件使用时生效
   *  权限插件会将用户在这里配置的 access 字符串与当前用户所有权限做匹配，
   *  如果找到相同的项，并当该权限的值为 false，则当用户访问该路由时，默认展示 403 页面
   */
  access: 'canDemo',
  /** menu下字段会覆盖当前层级的同名字段 */
  menu: {
    name: '使用Demo', // 兼容此写法
    // icon: 'crown', // 当前icon字段不生效，估计是官方bug
    // hideChildren: false, //  默认为false，在菜单中隐藏他的子项，只展示自己
    // flatMenu: false, // 默认为false 在菜单中只隐藏此项，子项往上提，仍旧展示
  },
  routes: [
    {
      path: '/demo/use-model',
      name: 'model使用',
      icon: 'smile',
      component: '@/pages/Demo/UseModel',
    },
    {
      path: '/demo/use-immer',
      name: 'immer使用',
      icon: 'smile',
      component: '@/pages/Demo/UseImmer',
    },
    {
      path: '/demo/use-debouce',
      name: 'debouce使用',
      icon: 'smile',
      component: '@/pages/Demo/UseDebounce',
    },
  ],
};
