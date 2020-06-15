import React, { memo, useState, useEffect } from 'react';

/** 第三方组件 */
import { Spin, Select, Cascader, message } from 'antd';
import { Scene } from '@antv/l7';
import { ProvinceLayer, CityLayer, CountyLayer } from '@antv/l7-district';
import { Mapbox } from '@antv/l7-maps';
const { Option } = Select;

/** 接口 */
import { PCData, PCAData } from './api';

/** 默认数据 */
import {
  initProvince,
  initCity,
  initArea,
  NAME_CHN,
  COLORS,
  PROVINCEDATA,
} from './initData';

/** 类型声明 */
import { PCA, IProps, LayerParams } from './type';

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
    preProps.type === nextProps.type &&
    preProps.center === nextProps.center &&
    preProps.colors === nextProps.colors &&
    preProps.defaultCode === nextProps.defaultCode
  );
}

/**
 * 组件代码
 * 根据 AntV 展示省市区的组件封装
 * 根据传入的type类型展示省/市/区区域地图
 */
export default memo(
  ({
    type = PCA.province,
    center = [116.2825, 39.9],
    defaultCode = type === PCA.province
      ? initProvince
      : type === PCA.city
      ? initCity
      : initArea,
    colors = COLORS,
    boxProps,
    layerProps,
    onChange,
  }: IProps) => {
    const [sceneIntance, setSceneIntance] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true); // loading，提示用户体验
    const [layerInstance, setLayerInstance] = useState<any>(null); // 省市区视图实例
    const [options, setOptions] = useState<any>(null);

    useEffect(() => {
      if (process.env.NODE_ENV === 'development') {
        switch (type) {
          case PCA.province:
            if (defaultCode.length !== 1) {
              message.error('省 -- 默认值只需传递一个值');
            }
            break;
          case PCA.city:
            if (defaultCode.length !== 2) {
              message.error('市-- 默认值需传两个值');
            }
            break;
          case PCA.area:
            if (defaultCode.length !== 3) {
              message.error('区-- 默认值需传递三个值');
            }
            break;
          default:
            message.error('请传递 province|city|area 中的一个值');
            break;
        }
      }
    }, []);

    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      if (sceneIntance) {
        // 要先卸载，否则切换在父组件切换type的时候实例会重叠
        sceneIntance.destroy();
        setSceneIntance(null);
      }
      // 初始化数据要放在 sceneIntance.destroy() 之后
      initData();
    }, [type]);

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

        /** 根据type不同，参数可能不一致 */
        let layer;
        switch (type) {
          case PCA.province:
            layer = new ProvinceLayer(_scene, layerParams);
            setLayerInstance(layer);
            break;
          case PCA.city:
            PCData().then(([ops, provincedata]: any) => {
              setOptions(ops);
              layerParams.data = provincedata;
              layerParams.joinBy = ['adcode', 'code'];
              layer = new CityLayer(_scene, layerParams);
              setLayerInstance(layer);
            });
            break;
          case PCA.area:
            PCAData().then((res: any) => {
              setOptions(res);
              layerParams.data = [];
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
      setSceneIntance(_scene);
    };

    /** change事件 */
    const onProvinceChange = (val: string[]) => {
      console.log(val);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 350);
      onChange && onChange(val);
      switch (type) {
        case PCA.province:
          return layerInstance.updateDistrict([`${val}`]);
        case PCA.city:
          console.log([val[1]]);
          return layerInstance?.updateDistrict([val]);
        case PCA.area:
          console.log([val[2]]);
          return layerInstance.updateDistrict([val]);
      }
    };

    /** 根据type渲染不同的组件 */
    const getComponent = () => {
      let props: any = {
        allowClear: false,
        defaultValue: defaultCode,
        style: {
          // width: 120,
          zIndex: 2,
          position: 'absolute',
          right: '10px',
          top: '10px',
        },
        onChange: (val: string[]) => onProvinceChange(val),
      };
      switch (type) {
        case PCA.province:
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
        case PCA.city:
          props.options = options;
          return <Cascader {...props} />;
        case PCA.area:
          props.options = options;
          return <Cascader {...props} />;
        default:
          return '';
      }
    };

    return <Spin spinning={loading}>{getComponent()}</Spin>;
  },
  areEqual,
);
