/** input输入框：onChange={(e: InputElement) => onCheckedAllChange(e.target.checked)} */
export type InputElement = React.ChangeEvent<HTMLInputElement>;

/** 下拉选择框： <select onChange={(e: SelectElement) => onSelect(e.target.value)} >*/
export type SelectElement = React.ChangeEvent<HTMLSelectElement>;

export interface RcFile {
  type: string; // 文件格式
  size: number; // 文件大小
  status: string; // 状态有：uploading done error removed 只有在onChange事件才会变化
  Blob: Blob;
  response: Object; // 服务端响应内容，
  //   [key: string]: any;
}
