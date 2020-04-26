/**
 * immer主要用于简化二维或者多维机构的数据操作，
 * 内部使用数据劫持的方式实现数据更改，能够起到一定的性能优化作用，
 * umi的model默认提供immer操作
 */

import React, { useState } from 'react';
import { produce } from 'immer';

import { Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

let arr: any[] = [];
for (let q = 0; q < 100; q++) {
  if (q % 2 === 1) {
    arr = arr.concat({
      id: q,
      name: '点击改变数据：' + q,
    });
  } else {
    arr = arr.concat(q);
  }
}

export default ({}) => {
  const [list, setList] = useState(arr);

  const onChangeItem = (index: number) => {
    let newArr = [...list];
    newArr = produce(newArr, draftArr => {
      draftArr[index].name += index;
    });
    setList(newArr);
  };

  return (
    <PageHeaderWrapper>
      {list.map((item: any, index: number) => {
        if (typeof item === 'number') {
          return (
            <div key={index} className="item">
              {item}
            </div>
          );
        } else {
          return (
            <Button
              key={index}
              onClick={() => onChangeItem(index)}
              className="item"
              type="primary"
            >
              {item.name}
            </Button>
          );
        }
      })}
    </PageHeaderWrapper>
  );
};
