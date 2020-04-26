import React, { FC } from 'react';
import {
  UseModelDemoState,
  ConnectProps,
  Loading,
  connect,
  useDispatch,
} from 'umi';

import { Button } from 'antd';

interface PageProps extends ConnectProps {
  useModel: UseModelDemoState;
  loading: boolean;
}

const IndexPage: FC<PageProps> = ({ useModel }) => {
  const { name } = useModel;
  const dispatch = useDispatch();

  const onClick = (num: number) => {
    dispatch({
      type: 'useModel/query',
      payload:
        num === 1 ? { name: '哈哈，我改变了useModel' } : { name: 'useModel' },
    });
  };
  return (
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
  );
};

export default connect(
  ({
    useModel,
    loading,
  }: {
    useModel: UseModelDemoState;
    loading: Loading;
  }) => ({
    useModel,
    loading: loading.models.useModel,
  }),
)(IndexPage);
