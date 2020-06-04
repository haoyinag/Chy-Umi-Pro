import React from 'react';

import { Form, Input } from 'antd';

// import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { LockOutlined, UserOutlined } from '@ant-design/icons';

// import { Img404Small } from "@/utils/default_images";

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

      {/* <Form.Item
        name="code"
        rules={[{ required: true, message: "请输入验证码!" }]}
      >
        <Input
          size="large"
          className="code"
          placeholder="验证码"
          prefix={<MailOutlined className="site-form-item-icon" />}
          addonAfter={
            <img
              src={code}
              onClick={getPatternCode}
              onError={(e: React.ChangeEvent<HTMLImageElement>) => {
                // e.target.onerror = null; // 只处理一次
                e.target.src = `${Img404Small}`;
              }}
              alt="验证码"
              style={{
                // maxWidth: '100px',
                maxHeight: "40px",
                cursor: "pointer"
              }}
            />
          }
        />
      </Form.Item> */}
    </React.Fragment>
  );
};
