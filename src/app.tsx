/** 库 */
import React from 'react';
// import { history } from 'umi';

/** 组件--antd有限 */
import { RightRender } from '@/components/RightRender';
/** 本地utils、模块 */
import logo from '@/assets/logo.png';
/** const/let声明 */

/** 运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等。 */
/** layout配置/操作，需要在配置文件开启layout */
export const layout = {
  logo, // 产品 Logo
  name: 'Angsi', // 侧边栏头部产品名，默认值为包名
  locale: true,
  /** 发生错误后的回调（可做一些错误日志上报，打点等） */
  onError: (e: any) => {
    console.log(e);
  },
  /** 发生错误后展示的组件 */
  ErrorComponent: (e: any) => {
    console.log(e);
  },

  /** 点击退出登录的处理逻辑，默认不做处理 */
  logout: (e: any) => {
    console.log(e);
  },
  /** 顶部栏开合 */
  rightRender: (initInfo: any) => {
    console.log(initInfo);

    return <RightRender />;
  }, // return string || ReactNode;
};

// export function patchRoutes({ routes }) {
//     merge(routes, extraRoutes);
// }

/** 在初始加载和路由切换时做一些事情--比如用于做埋点统计/比如用于设置标题 */
export function onRouteChange({
  matchedRoutes,
  location,
  routes,
  action,
}: {
  matchedRoutes: any;
  location: any;
  routes: any;
  action: any;
}) {
  // bacon(location.pathname);
  if (matchedRoutes.length) {
    document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
  }
}

/** render覆写 render，会直接阻断所有的运行时 */
// export function render(oldRender) {
//     console.log(oldRender);
//     // fetch('/api/auth').then((auth) => {
//     //     if (auth.isLogin) { oldRender() }
//     //     else { history.push('/login'); }
//     // });
// }

/** 修改交给 react-dom 渲染时的根组件 */
// export function rootContainer(container,args:{routes，全量路由配置,plugin，运行时插件机制，history，history 实例}) {
// 比如用于在外面包一个 Provider
//     return React.createElement(ThemeProvider, null, container);
//   }
