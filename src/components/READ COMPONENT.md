## 公共组件文档

### 规范：

**必须要有`使用说明+过程注释`，前者针对用户，后者针对维护**

1. 尽量使用大写开头单词命名文件夹+index 的方式创建公用组件，如`Avatar/index.tsx`，可以更方便的组织引入代码；
2. `components`目录下的一级目录可以是一个大类的组件，如`Picker`，其下可以有多个组件，如`TimePicker、DatePicker`等；
3. 一个文件夹(子文件夹)尽可能只负责一个组件的工作；
4. 如果组件内容过多，尽可能拆分功能，如类型定义、常量命名等都应以一个单独的文件去编写；

### Form

使用`Form`元素创建的公用组件

#### Filter

```bash
src\components\Form\Filter\index.tsx
```

- 针对页面搜索栏封装的公用组件，暂不包括具有初始化值的功能；
- 如果想要使用具有更全表单功能的组件，请使用`Former`(暂未封装)

### Picker

#### DistPicker

```bash
src\components\Picker\DistPicker\index.tsx
```

- 省市区三级联动组件
- 对应的省市区 list 的 item 中 id 和 name 必传

#### IconFont

```bash
src\components\IconFont\index.ts
```

- 使用阿里`Iconfont`的 iconUrl 地址生成的公用`Icon`组件，暂时并无封装功能
