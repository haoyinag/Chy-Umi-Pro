import React, { memo, useState, useEffect } from 'react';

/** 第三方组件 */
import { Spin, Select, Cascader } from 'antd';
import { Scene } from '@antv/l7';
import { ProvinceLayer, CityLayer, CountyLayer } from '@antv/l7-district';
import { Mapbox } from '@antv/l7-maps';
const { Option } = Select;

/** 默认数据 */
import { PROVINCEDATA } from './initData';

/** 类型声明 */
import { IProps, LayerParams } from './type';

/** 本文件用常量 */
const initProvince = ['440000']; // 默认广东省
const initCity = ['440000', '440300']; // 默认深圳市
const initArea = ['440000', '440300', '440305']; // 默认南山区
const NAME_CHN = 'NAME_CHN';
const COLORS = [
  '#feedde',
  '#fdd0a2',
  '#fdae6b',
  '#fd8d3c',
  '#e6550d',
  '#a63603',
];
// Mapbox 配置
const MapboxParams = (center: [number, number], { ...restProps }) => ({
  center,
  pitch: 0,
  style: 'blank',
  zoom: 3,
  minZoom: 3,
  maxZoom: 10,
  ...restProps,
});

/** 性能优化 */
function areEqual(preProps: IProps, nextProps: IProps) {
  return (
    preProps.center === nextProps.center &&
    preProps.colors === nextProps.colors &&
    preProps.defaultCode === nextProps.defaultCode
  );
}

/** 组件代码 */
export default memo(
  ({
    type = 'province',
    center = [116.2825, 39.9],
    defaultCode = type === 'province'
      ? initProvince
      : type === 'city'
      ? initCity
      : initArea,
    colors = COLORS,
    boxProps,
    layerProps,
    onChange,
  }: IProps) => {
    const [loading, setLoading] = useState<boolean>(true); // loading，提示用户体验
    const [layerInstance, setLayerInstance] = useState<any>(null); // 省市区视图实例
    const [options, setOptions] = useState<any>(null);

    /** 地图数据初始化 */
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      initData();
      // _scene.destroy();
    }, []);

    /** 初始化 */
    const initData = () => {
      const _scene = new Scene({
        id: 'map',
        map: new Mapbox(MapboxParams(center, { ...boxProps })),
      });

      _scene.on('loaded', () => {
        /** 初始化配置 */
        let layerParams: LayerParams = {
          adcode: defaultCode,
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
            Html: (props: any) => {
              return `<span>${props[NAME_CHN]}</span>`;
            },
          },
        };

        layerParams = {
          ...layerParams,
          ...layerProps,
        };
        let layer;
        switch (type) {
          case 'province':
            layer = new ProvinceLayer(_scene, layerParams);
            setLayerInstance(layer);
            break;
          case 'city':
            getPCData().then((data: any) => {
              layerParams.data = data;
              layerParams.joinBy = ['adcode', 'code'];
              layer = new CityLayer(_scene, layerParams);
              setLayerInstance(layer);
            });
            break;
          case 'area':
            getPACData().then(() => {
              (layerParams.adcode =
                defaultCode?.length === 3 ? [defaultCode[2]] : [initArea[2]]), // 南山
                (layer = new CountyLayer(_scene, layerParams));
              setLayerInstance(layer);
            });

            break;
          default:
            layer = new ProvinceLayer(_scene, layerParams);
            setLayerInstance(layer);
            break;
        }
      });
    };

    /** 省市数据获取 */
    const getPCData = async () => {
      const res = await fetch(
        'https://gw.alipayobjects.com/os/bmw-prod/551e3ca6-6dad-421b-a8b4-b225e47f73ca.json',
      );
      const ops = await res.json();
      setOptions(ops);
      const response = await fetch(
        'https://gw.alipayobjects.com/os/bmw-prod/149b599d-21ef-4c24-812c-20deaee90e20.json',
      );
      const provinceData = await response.json();
      const data = Object.keys(provinceData).map((key: string) => {
        return {
          code: key,
          name: provinceData[key][0],
          pop: provinceData[key][2] * 1,
        };
      });
      return data;
    };

    /** 省市区获取 */
    const getPACData = async () => {
      const res = await fetch(
        'https://gw.alipayobjects.com/os/bmw-prod/04de56cc-5998-4f7e-9ad3-e87e9ac5fd39.json',
      );
      const ops = await res.json();
      setOptions(ops);
    };

    /** 省change */
    const onProvinceChange = (val: number) => {
      console.log(val);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 350);
      onChange && onChange(val);
      switch (type) {
        case 'province':
          return layerInstance.updateDistrict([val]);
        case 'city':
          return layerInstance?.updateDistrict([val[1]]);
        case 'area':
          return layerInstance.updateDistrict([val[2]]);
      }
    };

    const getList = (type: 'province' | 'city' | 'area') => {
      let props: any = {
        defaultValue: defaultCode,
        style: {
          // width: 120,
          zIndex: 2,
          position: 'absolute',
          right: '10px',
          top: '10px',
        },
        onChange: (val: number) => onProvinceChange(val),
      };
      switch (type) {
        case 'province':
          return (
            <Select {...props}>
              {PROVINCEDATA.map((province, i) => {
                return (
                  <Option key={i} value={province.adcode}>
                    {province.NAME_CHN}
                  </Option>
                );
              })}
            </Select>
          );
        case 'city':
          props.options = options;
          return <Cascader {...props} />;
        case 'area':
          props.options = options;
          return <Cascader {...props} />;
        default:
          return '';
      }
    };

    return (
      <Spin spinning={loading}>
        <div style={{ minHeight: '500px' }}>{getList(type)}</div>
      </Spin>
    );
  },
  areEqual,
);
