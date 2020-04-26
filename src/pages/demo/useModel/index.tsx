import React, { FC } from 'react';
import {
  UseModelDemoState,
  ConnectProps,
  Loading,
  connect,
  useDispatch,
} from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { Button } from 'antd';

interface PageProps extends ConnectProps {
  modelDemo: UseModelDemoState;
  loading: boolean;
}

const UseModelPage: FC<PageProps> = ({ modelDemo }) => {
  const { name } = modelDemo;
  const dispatch = useDispatch();

  const onClick = (num: number) => {
    dispatch({
      type: 'modelDemo/query',
      payload:
        num === 1 ? { name: '哈哈，我改变了useModel' } : { name: 'useModel' },
    });
  };
  return (
    <PageHeaderWrapper>
      <div className="flex model">
        Hello {name}
        <br />
        <Button type="primary" onClick={() => onClick(1)}>
          dispatch
        </Button>
        <Button type="primary" onClick={() => onClick(2)}>
          重置
        </Button>
      </div>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    modelDemo,
    loading,
  }: {
    modelDemo: UseModelDemoState;
    loading: Loading;
  }) => ({
    modelDemo,
    loading: loading.models.modelDemo,
  }),
)(UseModelPage);
