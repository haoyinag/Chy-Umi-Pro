export type SimpleType = string | number | undefined;

/** 下拉框的类型值 */
export type DistType = 'PROVINCE' | 'CITY' | 'AREA';

/** 省市区的值 */
export interface PCAType {
  PROVINCE: SimpleType;
  CITY: SimpleType;
  AREA: SimpleType;
}

/**
 * 下拉项item的类型
 * 字段说明：
 *  id：必传
 *  name：必传
 * */
export interface DistItemType {
  id: number;
  name: string;
  [key: string]: any;
}

/**
 * props的类型
 * 字段说明：
 *  form：Form.useForm()，需要关联Form时必传，且必须包含在Form组件中
 *  defaultValue：初始值，是一个对象，对应PCA类型
 *  provinceList/cityList/areaList：对应省市区的下拉list
 *  onPickerChange：change事件，返回省市区的值，对应PCA类型
 *  selectProps：对应select组件的props，如果想使用自己定义的Option组件定义下拉内容，通过render传递；权限比props更高
 *  formItemProps：对应form.Item组件的props，权限比props更高
 *  props：更多的props
 * */
export interface DistPropsType {
  output?: boolean;
  form?: boolean;
  defaultValue?: PCAType;
  provinceList?: DistItemType[];
  cityList?: DistItemType[];
  areaList?: DistItemType[];
  onPickerChange?: (val: SimpleType | PCAType, type?: DistType) => any;
  props?: any;
  selectProps?: any;
  formItemProps?: any;
  [key: string]: any;
}
