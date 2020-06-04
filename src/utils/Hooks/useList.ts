/**
 * 自定义hooks
 * 把list的增删item逻辑抽离
 * 必传字段：id
 */
import { useReducer } from 'react';

import { message } from 'antd';

import { LIST_ADD, LIST_DELETE, LIST_MODIFY } from './hook_constant';
import { ListItemType, ListActionType } from './hook_types';

function reducer(state: ListItemType[], action: ListActionType) {
  const { type, payload } = action;
  const { id, value, item } = payload;
  const list = [...state];
  const addID: number | undefined =
    list.length > 0 ? list[list.length - 1].id || 0 : 0;
  switch (type) {
    case LIST_ADD:
      list.push({
        ...payload,
        id: addID + 1,
      });
      return list;
    case LIST_DELETE:
      if (!id && id !== 0) {
        message.error('删除时id必传');
        return list;
      }
      let index = 0;
      list.map((item: ListItemType, q: number) => {
        if (item.id === id) {
          index = q;
        }
        return item;
      });
      list.splice(index, 1);
      return list;
    case LIST_MODIFY:
      list.map((newItem: ListItemType) => {
        if (newItem.id === id) {
          newItem.value = value;
          newItem.item = item;
        }
        return newItem;
      });
      return list;
    default:
      return state;
  }
}

/** 传入当前初始化的list，返回新的list以及dispatch事件 */
export const useList = (list: ListItemType[]) => {
  const [newList, dispatch] = useReducer(reducer, list);

  return { newList, dispatch };
};
