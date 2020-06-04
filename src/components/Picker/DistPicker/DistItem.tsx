import React, { FC, memo } from 'react';

import { Select } from 'antd';

const { Option } = Select;

import { DistType, DistItemType } from './type';

interface Props {
  distValue: number;
  list: DistItemType[];
  type: DistType;
  props?: any;
  selectProps?: any;
  onDistPickerChange: (e: string | number, type: string) => any;
}

// memo优化策略
function areEqual(prevProps: Props, nextProps: Props) {
  return prevProps.distValue === nextProps.distValue;
}

const DistItem: FC<Props> = memo(
  ({ distValue, list, type, onDistPickerChange, props, selectProps }) => {
    const text = type === 'PROVINCE' ? '省' : type === 'CITY' ? '市' : '区';
    return (
      <Select
        style={{ minWidth: '100px' }}
        allowClear
        value={distValue}
        placeholder={`${text}`}
        onChange={(e: string | number) => onDistPickerChange(e, type)}
        {...props}
        {...selectProps}
      >
        {selectProps && selectProps.render && selectProps.render()}

        {(!selectProps || !selectProps.render) &&
          (list || []).map((cl: DistItemType) => {
            return (
              <Option key={cl.id} value={cl.id}>
                {cl.name}
              </Option>
            );
          })}
      </Select>
    );
  },
  areEqual,
);

export default DistItem;
