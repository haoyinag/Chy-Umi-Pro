/** 库 */
import React from 'react';
import { history } from 'umi';

import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

// import { getMenuData } from "@ant-design/pro-layout";

/** 组件--antd优先 */
import { RightRender } from '@/layouts';

/** 本地utils、模块 */
// import router from "@/router";
import logo from '@/assets/logo-small.png';
import { getRoutePathMap } from '@/utils/getMap';
import defaultSettings, { DefaultSettings } from '../config/defaultSettings';

// const { breadcrumb } = getMenuData(router);

/** const/let声明 */
/** 运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等。 */
/** layout配置/操作，需要在配置文件开启layout */
export let layout: any = {
  logo, // 产品 Logo
  name: '后台管理系统', // 侧边栏头部产品名，默认值为包名
  // locale: true,
  // pure: true, // 是否删除框架layout
  // menu: {
  /** 如果开启，需要有对应的src/locals/xxx.ts语言文件匹配 */
  //   locale: true,
  //   defaultOpenAll: false,
  // },
  settings: defaultSettings,
  iconfontUrl: defaultSettings.iconfontUrl,
  /** collapsed固定开/关 */
  // collapsed: false,
  // onCollapse: (collapsed: boolean): void => {
  //   console.log(collapsed);
  // },
  // pageTitleRender: (props: any) => {
  //   console.log(props);
  //   return <h1>biaoti</h1>
  // },
  breadcrumbRender: (route: any) => {
    // let hash: string | string[] = location.hash.split("#");
    // hash = hash[1] || hash[0] || hash;
    // console.log(hash,breadcrumb);
    // let thisRoute;
    // for (const key in breadcrumb) {
    //   if (key === hash) {
    //     thisRoute = {
    //       path: breadcrumb[key].path,
    //       breadcrumbName: breadcrumb[key].name || breadcrumb[key].title,
    //     };
    //     break;
    //   }
    // }
    // console.log(thisRoute);

    let str = '';
    route &&
      route.map((item: any) => {
        return (str += item.breadcrumbName + '/');
      });
    if (route.length === 1) {
      route = [];
    }

    return route;
  },
  // headerRender:(props: BasicLayoutProps) :ReactNode=> {
  // },
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
    return <RightRender />;
  }, // return string || ReactNode;
};

export async function getInitialState(): Promise<{
  currentUser?: any;
  settings?: DefaultSettings;
}> {
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login') {
    try {
      // const currentUser = await queryCurrent();
      return {
        // currentUser,
        settings: defaultSettings,
      };
    } catch (error) {
      history.push('/user/login');
    }
  }
  return {
    settings: defaultSettings,
  };
}

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
  // 页面title配置
  document.title = '后台管理后台管理系统';
  // console.log(location, routes);
  try {
    const { pathname } = location;
    const patern = getRoutePathMap(routes).filter(
      (path: string) => path === pathname,
    );
    /** 地址不完全匹配跳转404 */
    if (patern.length === 0) {
      history.push('/404');
    }
  } catch (error) {
    console.log(error);
  }

  // if (matchedRoutes.length) {
  //   console.log(location.pathname);
  //   document.title = matchedRoutes[matchedRoutes.length - 1].route.title || "";
  //   console.log(document.title);
  // }
}

/** render覆写 render，会直接阻断所有的运行时 */
export function render(oldRender: any) {
  oldRender();
  // fetch("/api/auth").then((auth: any) => {
  //   if (auth.isLogin) {
  //     oldRender();
  //   } else {
  //     history.push("/login");
  //   }
  // });
}

/** 修改交给 react-dom 渲染时的根组件 */
// export function rootContainer(container,args:{routes，全量路由配置,plugin，运行时插件机制，history，history 实例}) {
export function rootContainer(container: any) {
  // 比如用于在外面包一个 Provider
  const ThemeProvider = () => (
    <div id="root-out">
      <ConfigProvider locale={zhCN}>{container}</ConfigProvider>
    </div>
  );
  return React.createElement(ThemeProvider, null, container);
}
