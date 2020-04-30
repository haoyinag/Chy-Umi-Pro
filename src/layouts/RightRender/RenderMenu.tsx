import React, { FC } from 'react';

import { Menu } from 'antd';
import {
  LogoutOutlined,
  NodeIndexOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';

interface PageProps {
  onMenuClick: any;
}

const RenderMenu: FC<PageProps> = ({ onMenuClick }) => {
  const onClick = (e: any) => {
    const { key } = e;
    onMenuClick && onMenuClick(key);
  };

  return (
    <Menu defaultSelectedKeys={['0']} onClick={e => onClick(e)}>
      <Menu.Item key="0">
        <UserSwitchOutlined />
        切换身份
      </Menu.Item>
      <Menu.Item key="1">
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
export default RenderMenu;
