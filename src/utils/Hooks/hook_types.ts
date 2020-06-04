/** checkbox-单选 */
export interface CheckItemType {
  id: number;
  price: number;
  checked: boolean;
}

/** checkbox-全选/反选 */
export interface ActionType {
  type: 'CHECKED_CHANGE' | 'CHECKED_ALL_CHANGE';
  payload: {
    id?: number;
    checked: boolean;
  };
}

export interface ListItemType {
  id?: number | undefined;
  [key: string]: any;
}

export interface ListActionType {
  type: 'LIST_ADD' | 'LIST_DELETE' | 'LIST_MODIFY';
  payload: ListItemType;
  [key: string]: any;
}
