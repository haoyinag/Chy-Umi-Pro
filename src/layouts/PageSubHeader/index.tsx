import React, { FC, ReactNode } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface Props {
  title?: ReactNode;
  [key: string]: any;
}

export const PageSubHeader: FC<Props> = (props) => {
  const { title } = props;
  return (
    <PageHeaderWrapper
      className="site-list-header"
      title={title || <div></div>}
      {...props}
    ></PageHeaderWrapper>
  );
};
