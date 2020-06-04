## 全局 FAQ

#### 配置

[Dva 文档地址](https://dvajs.com/guide/)
[Umi 文档地址](https://umijs.org/zh-CN)
[Layout 文档地址](https://prolayout.ant.design/#pageheaderwrapper)

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

#### model 不生效

`model`中`effects`的方法不生效，可能是方法名直接用了`query`导致，为了避免出现类似问题，创建`model`方法的时候尽量使用`大小驼峰命名方式`命名。

#### ts 校验不通过以及不知道的类型推断

1. 在文件首行添加`// @ts-nocheck`来跳过当前文件的校验；
2. 在无法确定类型的改行代码上方添加`// @ts-ignore`来忽略校验。

#### 如何给 useState 添加类型

如下：

```ts
interface InitState {
  name: string;
  age: number;
}

const init: InitState = {
  name: "",
  age: 18,
};
const [initState, setInitState] = useState<InitState>(init);
```

## Antd FAQ

### Modal

```ts
Check the render method of `Dialog`
```

原因：可能引起的问题是`footer`数组中的的按钮没有`key`；
解决：必须给对应的`Button`添加对应。

### Upload

1.

```ts
[antd: Upload] `value` is not a valid prop, do you mean `fileList
```

原因：可能引起的问题是使用了`Form.Item`因为默认绑定的是`value`，但包裹的组件对应的值不是`value`，
解决：如上传组件`Upload`，在`Form.Item`添加属性`valuePropName="fileList"`，`Switch`组件添加属性`valuePropName="checked"`
**基本上其他使用 Form.Item 包裹的组件引起此类问题都使用这种解决方式**

2.

```ts
fileList.filter is not a function // 导致图片上传失败
```

原因：`Form.Item`没有添加`getValueFromEvent`方法引起，或者同时在 Form.Item 中添加了 valuePropName="fileList"
解决：Form.Item 删除 valuePropName 属性，以及

```tsx
getValueFromEvent={(e) => {
    if (!e || !e.fileList) {
        return e;
    }
    const { fileList } = e;
    return fileList;
}}
```

### Table

#### rowSpan 和 colSpan 设置

- rowSpan 设置占据的行数，如果设置为零，另外的要设置为 2 才能保持完整性
- colSpan 设置占据的行数，如果设置为零，另外的要设置为 2 才能保持完整性
- 核心原则：多退少补

  - 1、index===2 行占据 2 行，对应的 index===3 或者 index===1 要为 0 隐藏
  - 2、同理，index===2 列占据 3 列，对应的包含当前列，要寻找相邻或者前面两列或者后面两列要为 0 隐藏
  - 3、尽可能使用全等或者非全等符号，不要使用`<`或者`>`符号
  - 4、可以用 text、row、index 或者别的方式作为判断依据

```ts
render: (text, row, index) => {
  const obj: any = {
    children: text,
    props: {},
  };
  if (index === 1) {
    /** 行占据2行，对应的index===3要为0隐藏 */
    obj.props.rowSpan = 3;
  }
  // These two are merged into above cell
  if (index === 2 || index === 3) {
    /** 行占据0行，因为上面占据了2行 */
    obj.props.rowSpan = 0;
  }
  return obj;
},
```
