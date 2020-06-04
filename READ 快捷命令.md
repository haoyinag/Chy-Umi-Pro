## 快捷命令

### 命令行创建文件

如：`umi generate page pagea --typescript --less`，更多参考`src\READ FAQ.md`或[文档](https://umijs.org/zh-CN/docs/cli#umi-generate)

### 代码片段

**创建新片段方式**

1. `vscode`左下角设置，选择`用户代码片段`
2. 在顶部弹出的弹窗输入想要配置的代码片段对应的文件类型
3. 部分文件类型对应如下：

- `.js`--Javscript.json
- `.jsx`--Javscriptreact.json
- `.ts`--Typescript.json
- `.tsx`--Typescriptreact.json
- ...

4. 在弹出的对应 json 文档都有对应的例子，参考例子生成对应的用户片段代码

- prefix
  键入生成对应代码片段的代码

- body
  配置需要生成的代码片段
- description
  代码片段描述

5. `$`符使用--光标位置

- `$1`表示生成代码后第一个输入的地方
- `$2`表示第二输入的地方，每个`$`都可以同时定义多个，如多个地方同时定义`$1`
- 输入完成一个`$`符的输入，按键盘上`Tab`键跳到下一个光标位置

#### .tsx 文件片段

##### 简单函数式--页面

```bash
"Print to fc": {
    "prefix": "fc",
    "body": [
        "import React, { FC } from 'react';",
        "",
        "interface Props {",
        "name:string",
        "}",
        "",
        "export const $1: FC<Props> = ({name}) => {",
        "",
        "return <div>{name}</div>;",
        "};",
    ],
    "description": "简单的ReactFunction"
},
```

##### 函数式--表单--页面

```bash
"Print to fcForm": {
    "prefix": "fcForm",
    "body": [
        "import React, { FC } from 'react';",
        "",
        "import {",
        "Form,",
        "Input,",
        "//   Button,",
        "//   Radio,",
        "//   Upload,",
        "//   Select,",
        "} from 'antd';",
        "",
        "interface Props {",
        "[key: string]: any;",
        "}",
        "",
        "export const $1/** 组件名称 */: FC<Props> = (props) => {",
        "const [form] = Form.useForm();",
        "",
        "return (",
        " <Form",
        "form={form}",
        "scrollToFirstError",
        "labelCol={{ span: 5 }}",
        "wrapperCol={{ span: 14 }}",
        "name='$1_form'",
        "{...props}",
        ">",
        "<Form.Item name={'$2'} label={'$3'}>",
        "<Input allowClear />",
        "</Form.Item>",
        "</Form>",
        ");",
        "};",
    ],
    "description": "Log output to ReactFunction"
}
```

##### 函数式--包含 model --页面

```bash
"Print to fcModel": {
    "prefix": "fcModel",
    "body": [
        "import React, { FC } from 'react';",
        "import {",
        "ConnectProps,Loading,connect,} from 'umi';",
        "",
        "import { $3 } from './model';",
        "",
        "interface PageProps extends ConnectProps {",
        "$2: $3/** 页面model对应state的类型声明 */;",
        " loading: boolean;",
        "}",
        "",
        "const $1/** 页面名称 */: FC<PageProps> = ({ $2 /** 页面对应model的命名空间 */}) => {",
        " const { name } = $2;",
        "console.log(name);",
        "",
        " return (",
        "<div>",
        "<h1>Page SiteManage/SiteManageDetail/index</h1>",
        "</div>",
        ");",
        "};",
        "",
        "export default connect(",
        "({",
        "$2,",
        "loading,",
        " }: {",
        "$2: $3;",
        "loading: Loading;",
        "}) => ({",
        "$2,",
        "loading: loading.models.$2,",
        "})",
        ")($1);",
    ],
    "description": "Log output to fcModel"
}
```

#### .ts 文件片段

##### model 文件内容

```bash
"Print to fcmodel": {
		"prefix": "fcmodel",
		"body": [
			"import { Effect, ImmerReducer, Subscription } from 'umi';",
			"",
			"import { queryUsers } from '@/services';",
			"",
			"export interface $2State/** model对应的state的类型声明 */ {",
			"name: string;",
			"}",
			"",
			"export interface $3Type/** model对应的整体类型声明 */ {",
			"namespace: '$4',",
			"state: $1State;",
			" effects: {",
			"queryCode: Effect;",
			"};",
			"reducers: {",
			"// save: Reducer<$1State>;",
			"// 启用 immer 之后",
			"save: ImmerReducer<$1State>;",
			" };",
			"subscriptions: { setup: Subscription };",
			"}",
			"",
			"const $1/** model对应的名称/命名空间 */: $3Type = {",
			"namespace:'$4',",
			"state: {",
			"name: '$4',",
			"},",
			"effects: {",
			"*queryCode({ payload }, { call, put }: { call: any; put: any }): any {",
			"try {",
			"console.log(payload);",
			"const response = yield call(queryUsers);",
			"console.log(response);",
			"yield put({",
			"type: 'save',",
			"payload: payload.name,",
			"});",
			"} catch (error) {",
			"console.log(error);",
			"}",
			"},",
			"},",
			"reducers: {",
			"// save(state, action) {",
			"//     return {",
			"//         ...state,",
			"//         ...action.payload,",
			"//     };",
			"// },",
			"// 启用 immer 之后",
			"save(state: any, action: any) {",
			"state.name = action.payload;",
			"},",
			"},",
			"subscriptions: {",
			"setup({ dispatch, history }: { dispatch: any; history: any }) {",
			"return history.listen(({ pathname }: { pathname: any }) => {",
			"// console.log(pathname);",
			"if (pathname === 'query') {",
			"dispatch({",
			"type: 'query',",
			"});",
			"}",
			"});",
			"},",
			"},",
			"};",
			"",
			"export default $1/** model对应的名称/命名空间 */;",
		],
		"description": "Log output to model"
	}
···
```
