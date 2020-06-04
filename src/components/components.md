## 公用组件文档

### Filter

**搜索栏组件**，暂时只适用于如列表页头部的搜索栏，不建议使用在有初始值的`Form`中。
使用规则：

1. 暂时只支持使用`Antd`对应的部分组件；
2. 暂不支持传递初始化值，表单公用组件有待完善/测试；
3. `key、tagName、label`为必传字段；
4. 如果是下拉列表如`select、treeselect`，`selectList`接收下拉的列表数组，item 的`id,name`两个字段必填，或者通过`render`渲染对应的`options`。

### IconFont

查看对应组件的`md`文档
