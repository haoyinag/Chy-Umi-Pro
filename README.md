# AngSi-Umi-Pro

antd4.x+umi3.x+ts 搭建的后台管理系统

## Getting Started

Install dependencies,

## 分支说明

#### master

主分支，只有管理人员有权限

#### master_dev

研发环境

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## FAQ

#### 命令行创建文件

如：`umi generate page pagea --typescript --less`
提示`umi: command not found`

1. 添加环境变量
   ![](https://img2018.cnblogs.com/blog/1405402/201906/1405402-20190626121056093-977675581.png)
2. 安装`umi`

```bash
yarn global add umi
```

> ps：`global add`的顺序不能对调；如果还是不成功，把命令工具重启。

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
