import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

let arr: number[] = [];
for (let q = 0; q < 100; q++) {
  arr = arr.concat(q);
}

export default () => (
  <PageHeaderWrapper title="首页" content="模块说明">
    <div className="Content">
      {arr.map((item: number) => {
        return (
          <div
            key={item}
            style={{ lineHeight: '50px', borderBottom: '1px solid #eee' }}
          >
            {item}
          </div>
        );
      })}
    </div>
  </PageHeaderWrapper>
);
