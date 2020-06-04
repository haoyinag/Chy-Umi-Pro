export type NamePath = string | number | (string | number)[];

export interface FormProps {
  getFieldError?: (name: string) => string | number | undefined;
  getFieldValue?: (name: string) => string | number | undefined;
  getFieldsError?: (nameList: NamePath) => any;
  getFieldsValue?: (nameList: NamePath, filterFunc?: Function) => any;
  getInternalHooks?: (key: string) => any;
  isFieldTouched?: (name: string) => string | number | undefined;
  isFieldValidating?: (name: string) => string | number | undefined;
  isFieldsTouched?: Function;
  isFieldsValidating?: (nameList: NamePath) => any;
  resetFields?: (nameList: NamePath) => any;
  scrollToField?: Function;
  setFields?: Function;
  setFieldsValue?: Function;
  submit?: Function;
  validateFields?: Function;
}

export interface ErrorInfo {
  values: Object;
  errorFields: Object[];
  outOfDate: boolean;
}
