import React, { memo, useState, useEffect } from 'react';

/** 第三方组件 */
import { Spin, Select } from 'antd';
import { Scene } from '@antv/l7';
import { ProvinceLayer } from '@antv/l7-district';
import { Mapbox } from '@antv/l7-maps';
const { Option } = Select;

/** 默认数据 */
import { PROVINCEDATA } from './initData';

/** 本文件用常量 */
const initProvince = 440000; // 默认广东省
const NAME_CHN = 'NAME_CHN';
const COLORS = [
  '#feedde',
  '#fdd0a2',
  '#fdae6b',
  '#fd8d3c',
  '#e6550d',
  '#a63603',
];

function areEqual(preProps: IProps, nextProps: IProps) {
  return (
    // preProps.center === nextProps.center &&
    // preProps.colors === nextProps.colors &&
    preProps.defaultCode === nextProps.defaultCode
  );
}

/** 类型声明 */
interface IProps {
  center?: [number, number];
  defaultCode?: number;
  colors?: string[];
}

export default memo(
  ({
    center = [116.2825, 39.9],
    defaultCode = initProvince,
    colors = COLORS,
  }: IProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [provinceLayer, setProvinceLayer] = useState<any>(null);

    /** 地图数据初始化 */
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      const _scene = new Scene({
        id: 'map',
        map: new Mapbox({
          center,
          pitch: 0,
          style: 'blank',
          zoom: 3,
          minZoom: 3,
          maxZoom: 10,
        }),
      });

      _scene.on('loaded', () => {
        const layer = new ProvinceLayer(_scene, {
          adcode: [defaultCode],
          depth: 3,
          label: {
            field: NAME_CHN,
            textAllowOverlap: false,
          },
          fill: {
            color: {
              field: NAME_CHN,
              values: colors,
            },
          },
          popup: {
            enable: true,
            Html: (props) => {
              return `<span>${props[NAME_CHN]}</span>`;
            },
          },
        });
        setProvinceLayer(layer);
      });
    }, []);

    /** 省change */
    const onProvinceChange = (val: number) => {
      setLoading(true);
      provinceLayer.updateDistrict([val]);
      setTimeout(() => {
        setLoading(false);
      }, 350);
    };

    return (
      <Spin spinning={loading}>
        <div style={{ minHeight: '500px' }}>
          <Select
            defaultValue={defaultCode}
            style={{
              width: 120,
              zIndex: 2,
              position: 'absolute',
              right: '10px',
              top: '10px',
            }}
            onChange={(val: number) => onProvinceChange(val)}
          >
            {PROVINCEDATA.map((province, i) => {
              return (
                <Option key={i} value={province.adcode}>
                  {province.NAME_CHN}
                </Option>
              );
            })}
          </Select>
        </div>
      </Spin>
    );
  },
  areEqual,
);
