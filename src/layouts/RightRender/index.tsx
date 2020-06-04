import React, { Fragment, useState } from 'react';
import { history } from 'umi';

import { Button, Dropdown } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';

import RenderMenu from './RenderMenu';
import RenderModal from './RenderModal';

import styles from './right.less';

export const RightRender = () => {
  const [visible, setVisible] = useState(false);
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}');

  const onMenuClick = (key: string) => {
    console.log(key);
    if (key === '0') {
      setVisible(!visible);
    } else if (key === '2') {
      history.push('/user/profile');
    } else {
      sessionStorage.removeItem('userInfo');
      history.push('/user/login');
    }
  };

  const onModalOk = () => {
    setVisible(!visible);
  };

  return (
    <Fragment>
      <Dropdown
        overlay={<RenderMenu onMenuClick={(e: string) => onMenuClick(e)} />}
        placement="bottomRight"
        className={styles.main}
      >
        <Button type="link">
          <HeartTwoTone />
          {userInfo.name}
        </Button>
      </Dropdown>
      <RenderModal
        visible={visible}
        onOk={() => setVisible(!visible)}
        onCancel={() => onModalOk()}
      />
    </Fragment>
  );
};
