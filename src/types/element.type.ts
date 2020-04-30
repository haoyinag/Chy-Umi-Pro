/** input输入框：onChange={(e: InputElement) => onCheckedAllChange(e.target.checked)} */
export type InputElement = React.ChangeEvent<HTMLInputElement>;

/** 下拉选择框： <select onChange={(e: SelectElement) => onSelect(e.target.value)} >*/
export type SelectElement = React.ChangeEvent<HTMLSelectElement>;
