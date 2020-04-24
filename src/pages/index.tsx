import React from 'react';
import { PageHeaderWrapper, getPageTitle } from '@ant-design/pro-layout';
const title = getPageTitle({});
console.log(title);

export default () => (
  <PageHeaderWrapper content="模块说明">
    <div className="Content">123Content</div>
  </PageHeaderWrapper>
);
