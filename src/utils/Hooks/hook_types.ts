/** checkbox-单选 */
export interface CheckItemType {
  id: number;
  price: number;
  checked: boolean;
}

/** checkbox-全选/反选 */
export interface ActionType {
  type: "CHECKED_CHANGE" | "CHECKED_ALL_CHANGE";
  payload: {
    id?: number;
    checked: boolean;
  };
}
