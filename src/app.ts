
/** layout有操作都会执行 */
export const layout = {
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
    /** 包括侧边栏开合 */
    rightRender: (initInfo: any) => {
        console.log(initInfo);

        return 'hahah';
    }, // return string || ReactNode;
};
