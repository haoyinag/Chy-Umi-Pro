## 路由文档

### 新建路由

1. 新建文件的时候必须遵循以下格式

```tsx
/**
 * 尽量都建在pages目录下，必须以index.tsx作为模块最终的页面
 * 路由的时候就默认取得该index.tsx所在的目录
 * 如文件目录是：src/pages/PageA/index.tsx，路由的component就是 @/pages/PageA
 * 路由文件创建方式
 * src/pages/xxx/xxx/index.tsx
 * src/pages/xxx/index.tsx
 */
```

### icon

有两种使用方式：

1. 可以使用`Antd`的内置图标，注意使用小写；
2. 或者可以使用阿里`Iconfont`的 iconUrl 地址，具体参考`src\components\IconFont.ts`;
