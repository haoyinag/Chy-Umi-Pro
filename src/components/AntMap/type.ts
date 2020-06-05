export interface IProps {
  type?: 'province' | 'city' | 'area';
  center?: [number, number];
  defaultCode?: any;
  colors?: string[];
  boxProps?: any;
  layerProps?: any;
  onChange?: (val: any) => void;
}

export interface LayerParams {
  adcode: number[];
  depth: 0 | 2 | 1 | 3 | undefined;
  label: Object;
  fill: Object;
  popup: Object;
  [key: string]: any;
}
