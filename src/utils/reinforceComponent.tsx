import React from 'react';
import { Form } from 'antd';
import { ProColumns } from '@ant-design/pro-table';

/**
 * valueEnum 枚举接口
 */
export interface IValueEnum {
  [key: string]: {
    text: React.ReactNode;
    status: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default';
  };
}

/**
 * 封装原有columns，支持rules， 修复filters传true,false筛选数据错误问题
 * @param columns columns
 */

export function reinforceColumns<T>(columns: ProColumns<T>[]): ProColumns<T>[] {
  return columns.map((item) => {
    let newItem: ProColumns<T> = {};

    // 有rules时
    if (item.rules) {
      newItem.renderFormItem = (formItem, { type, defaultRender }) => {
        return (
          <Form.Item name={item.dataIndex} rules={item.rules}>
            {defaultRender(formItem)}
          </Form.Item>
        );
      };
    }

    // 当有valueEnum，且枚举中存在 true or false 时重新组装
    const valueEnum = item.valueEnum;
    if (valueEnum) {
      const enumKeys = Object.keys(valueEnum);
      const isBoolean = enumKeys.some((i) => i === 'true' || i === 'false');
      if (isBoolean) {
        const newValueEnum = valueEnum as IValueEnum;
        const filters = [];
        for (let key in newValueEnum) {
          const value = key === 'true' ? true : key === 'false' ? false : key;
          if (newValueEnum[key] && newValueEnum[key].text) {
            filters.push({
              text: newValueEnum[key].text,
              value,
            });
          } else {
            filters.push({
              text: newValueEnum[key],
              value,
            });
          }
        }
        newItem.filters = filters;
        newItem.onFilter = (value, record) => {
          if (item.dataIndex) {
            return record[item.dataIndex.toString()] === value;
          }
          return true;
        };
        // console.log({...item, ...newItem})
      }
    }
    return { ...item, ...newItem };
  });
}
