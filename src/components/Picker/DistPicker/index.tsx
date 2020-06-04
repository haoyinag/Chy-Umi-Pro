import React, { FC, memo } from 'react';

import { Form, Row, Col } from 'antd';

import DistItem from './DistItem';

import { DistType, PCAType, DistItemType, DistPropsType } from './type';
import { useDistPicker } from '@/utils';

/**
 * 下拉项item的类型
 * 字段说明：
 *  id：必传
 *  name：必传
 * */

/**
 * props的类型
 * 字段说明：
 *  form：boolean，需要关联Form时必传，且必须包含在Form组件中
 *  defaultValue：初始值，是一个对象，对应PCA类型
 *  provinceList/cityList/areaList：对应省市区的下拉list
 *  onPickerChange：change事件，返回省市区的值，对应PCA类型
 *  selectProps：对应select组件的props，如果想使用自己定义的Option组件定义下拉内容，通过render传递；权限比props更高
 *  formItemProps：对应form.Item组件的props，权限比props更高
 *  props：更多的props
 *  ...
 *  PS：当情况省的值的时候，应当清空下级市的列表值，该操作当由父组件负责；清空市的值同理
 * */

// console.error(
//   "重构思路：既然已经通过form.item包裹，不需要设值，用form的方法设置..."
// );

const initPCA: PCAType = {
  PROVINCE: undefined,
  CITY: undefined,
  AREA: undefined,
};

function areEqual(prevProps: DistPropsType, nextProps: DistPropsType) {
  return prevProps.defaultValue === nextProps.defaultValue;
}
export const DistPicker: FC<DistPropsType> = memo(
  ({
    form,
    defaultValue,
    provinceList = [],
    cityList = [],
    areaList = [],
    onPickerChange,
    props,
    selectProps,
    formItemProps,
  }) => {
    const { newDistValue, dispatch } = useDistPicker(defaultValue || initPCA);
    onPickerChange && onPickerChange(newDistValue);

    const pickChange = (e: string | number | undefined, type: DistType) => {
      if (!e && e !== 0) {
        if (
          type === 'PROVINCE' &&
          ((cityList && cityList.length > 0) ||
            (areaList && areaList.length > 0))
        ) {
          console.error('省的值被清空，该清空市列表以及区列表');
        }
        if (type === 'PROVINCE' && areaList && areaList.length > 0) {
          console.error('市的值被清空，该清空区列表');
        }
      }
      dispatch({
        type,
        payload: e,
      });
    };

    const getItem = (list: DistItemType[] = [], type: DistType) => {
      return (
        <Col>
          <DistItem
            distValue={newDistValue[type]}
            // distValue={(defaultValue || initPCA)[type]}
            list={list}
            type={type}
            onDistPickerChange={(e: string | number | undefined) =>
              pickChange(e, type)
            }
            {...props}
            {...selectProps}
          />
        </Col>
      );
    };

    const getPick = () => {
      const el = (
        <Row gutter={5}>
          {getItem(provinceList, 'PROVINCE')}
          {getItem(cityList, 'CITY')}
          {getItem(areaList, 'AREA')}
        </Row>
      );
      if (form) {
        return (
          <Form.Item {...props} {...formItemProps}>
            {el}
          </Form.Item>
        );
      } else {
        return el;
      }
    };

    return getPick();
  },
  areEqual,
);
