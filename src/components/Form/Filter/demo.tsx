import React, { FC } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { Filter } from '@/components';

import './index.less';

// import { filterList } from "./initData";
const filterList = [
  {
    tagName: 'input',
    key: 'name',
    label: '模糊搜索',
    placeholder: '请输入姓名/ID/手机后4位/站点地址',
  },
  {
    tagName: 'datepicker',
    key: 'datepickerItem',
    label: '创建日期',
  },
  {
    tagName: 'select',
    key: 'site',
    label: '站点',
    defaultValue: null,
    placeholder: '请选择站点',
    selectList: [
      {
        id: 0,
        name: '站点1',
      },
      {
        id: 1,
        name: '站点2',
      },
    ],
  },
  {
    tagName: 'treeselect',
    key: 'state',
    label: '状态',
    defaultValue: null,
    placeholder: '请选择状态',
    selectList: [
      {
        id: 0,
        name: '状态1',
        children: [
          {
            id: 10,
            name: '状态11',
          },
          {
            id: 11,
            name: '状态12',
          },
        ],
      },
      {
        id: 1,
        name: '状态2',
        children: [
          {
            id: 20,
            name: '状态21',
          },
          {
            id: 21,
            name: '状态22',
          },
        ],
      },
    ],
  },
];

export const FilterDemo: FC<any> = () => {
  const onSearch = (values: any) => {
    console.log(values);
  };

  return (
    <PageHeaderWrapper title={<div></div>}>
      <Filter
        filterList={filterList}
        onSearch={(values: any) => onSearch(values)}
      />
    </PageHeaderWrapper>
  );
};
