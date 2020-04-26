import React from 'react';

import { Form, Input } from 'antd';

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

export default ({
  code,
  getPatternCode,
}: {
  code: string | undefined;
  getPatternCode: any;
}) => {
  return (
    <React.Fragment>
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
            <img src={code} onClick={getPatternCode} alt="logo" width="100px" />
          }
        />
      </Form.Item>
    </React.Fragment>
  );
};
