/** 获取所有路由的path集合 */
export const getRoutePathMap = (routes: any) => {
  const arr: string[] = [];
  routes[0].routes.map((item: any) => {
    if (item.routes && item.routes.length > 0) {
      return item.routes.map((r: any) => {
        return r.path && arr.push(r.path);
      });
    } else {
      return item.path && arr.push(item.path);
    }
  });
  return arr;
};
