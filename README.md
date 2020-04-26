# Chy-Umi-Pro
antd4.x+umi3.x+ts搭建的后台管理系统

## Getting Started

Install dependencies,

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