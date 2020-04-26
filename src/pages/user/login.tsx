import React, { FC } from 'react';
import { debounce } from 'lodash'; // 防抖
import {
  history,
  LoginState,
  ConnectProps,
  Loading,
  connect,
  useDispatch,
} from 'umi';
import qs from 'qs';

import { Tabs, Form, Button, Checkbox } from 'antd';

import LoginFormItem from './form';

import logo from '@/assets/logo.png';
import './login.less';

const { TabPane } = Tabs;
const bodyHeight: number = document.body.clientHeight;
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

interface Info {
  code: string;
  password: string;
  remember: boolean;
  username: string;
}

interface PageProps extends ConnectProps {
  login: LoginState;
  loading: boolean;
}

const storageInfo: string | null = localStorage.getItem('userInfo');
const Info = storageInfo
  ? qs.parse(storageInfo)
  : {
      code: '',
      password: '',
      remember: false,
      username: '',
    };
console.log(Info);

const LoginPage: FC<PageProps> = ({ login }) => {
  const { code } = login;
  /** hooks必须放在函数组件内部的第一层 */
  const dispatch = useDispatch();

  /** tab切换 */
  const onTabChange = (e: any) => {
    console.log(e);
  };

  /** 获取验证码 */
  const getPatternCode = () => {
    dispatch({
      type: 'login/queryCode',
      payload: logo,
    });
  };

  /** 提交表单且数据验证失败后回调事件 */
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  /** 提交表单且数据验证成功后回调事件 */
  const onFinish = (values: any) => {
    console.log('Success:', values);
    if (values.remember) {
      localStorage.setItem('userInfo', qs.stringify(values));
    } else {
      localStorage.removeItem('userInfo');
    }
    history.push('/');
  };

  return (
    <div
      className="login flex flex-column ali-center"
      style={{ height: bodyHeight + 'px' }}
    >
      <div className="logo">
        <img src={logo} alt="logo" />
        <div className="info">昂司美食</div>
      </div>
      <Form
        {...layout}
        name="login-form"
        labelAlign="left"
        initialValues={{ ...Info }}
        onFinish={debounce(onFinish, 500)}
        onFinishFailed={onFinishFailed}
        className="login-form"
      >
        <Tabs defaultActiveKey="1" onChange={onTabChange}>
          <TabPane tab="账号密码登录" key="1">
            <LoginFormItem
              code={code}
              getPatternCode={debounce(() => getPatternCode(), 350)}
            />
          </TabPane>
        </Tabs>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button block size="large" type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(
  ({ login, loading }: { login: LoginState; loading: Loading }) => ({
    login,
    loading: loading.models.login,
  }),
)(LoginPage);
