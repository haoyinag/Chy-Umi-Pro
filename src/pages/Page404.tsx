import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { Img404 } from '@/utils/default_images';

export default () => (
  <PageHeaderWrapper
    title="页面丢失"
    content="请确认页面是否存在"
    style={{ padding: '20px' }}
  >
    <div style={{ height: '100%' }} className="flex-center">
      <img src={Img404} alt="404" />
    </div>
  </PageHeaderWrapper>
);
