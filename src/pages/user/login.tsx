import React, { useState } from 'react';
import qs from 'qs';
import { Form, Input, Button, Checkbox } from 'antd';

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

import logo from '@/assets/logo.png';
import './login.less';

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

export default () => {
  const [code, setCode] = useState();

  /** 获取验证码 */
  const getPatternCode = () => {
    console.log('getPatternCode');
    setCode(logo);
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="login-form"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input
            size="large"
            placeholder="用户名"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, min: 6, message: '请至少输入6位数密码!' }]}
        >
          <Input.Password
            size="large"
            placeholder="至少6位数密码"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item
          name="code"
          className="flex"
          rules={[{ required: true, message: '请输入验证码!' }]}
        >
          <Input
            size="large"
            placeholder="验证码"
            prefix={<MailOutlined className="site-form-item-icon" />}
            addonAfter={
              <img
                src={code || logo}
                onClick={getPatternCode}
                alt="logo"
                width="100px"
              />
            }
          />
          {/* <img src={logo} alt="logo" width="50px" /> */}
        </Form.Item>

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

// "https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg"
