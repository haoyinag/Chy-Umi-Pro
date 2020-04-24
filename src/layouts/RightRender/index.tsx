import React from 'react';
import { history } from 'umi';

import { Button, Menu, Dropdown } from 'antd';
import {
  HeartTwoTone,
  LogoutOutlined,
  NodeIndexOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';

import styles from './right.less';

const menu = () => {
  return (
    <Menu defaultSelectedKeys={['1']}>
      <Menu.Item key="0" onClick={() => console.log(0)}>
        <UserSwitchOutlined />
        切换身份
      </Menu.Item>
      <Menu.Item key="1" onClick={e => history.push('/user/login')}>
        <LogoutOutlined />
        退出登录
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" disabled>
        <NodeIndexOutlined />
        切换门店
      </Menu.Item>
    </Menu>
  );
};

export const RightRender = () => {
  return (
    <Dropdown overlay={menu} placement="bottomRight" className={styles.main}>
      <Button type="link">
        <HeartTwoTone />
        AngSi Me
      </Button>
    </Dropdown>
  );
};
