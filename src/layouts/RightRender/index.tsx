import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import styles from './right.less';

const menu = (
  <Menu defaultSelectedKeys={['0']}>
    <Menu.Item key="0">
      <a target="_blank" rel="noopener noreferrer" href=" ">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item key="1">
      <a target="_blank" rel="noopener noreferrer" href="">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" disabled>
      3rd menu item（disabled）
    </Menu.Item>
  </Menu>
);

export const RightRender = () => {
  return (
    <Dropdown overlay={menu} placement="bottomRight" className={styles.main}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        Hover me <DownOutlined />
      </a>
    </Dropdown>
  );
};
