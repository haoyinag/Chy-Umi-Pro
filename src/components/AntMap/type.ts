export enum PCA {
  province = 'province',
  city = 'city',
  area = 'area',
}

export interface IProps {
  type?: 'province' | 'city' | 'area'; // 区域类型
  center?: [number, number]; // 中心点
  defaultCode?: number[]; // 传入的默认省/市/区
  colors?: string[]; // 覆盖的颜色
  boxProps?: any; // mapbox配置
  layerProps?: any; // layer配置
  onChange?: (val: any) => void; // onchange事件
}

export interface LayerParams {
  adcode?: number[];
  depth: 0 | 2 | 1 | 3 | undefined;
  label: Object;
  fill: Object;
  popup: Object;
  [key: string]: any;
}
