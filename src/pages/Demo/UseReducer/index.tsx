import React from "react";

import CardItem from "./CardItem";

import { InputElement } from "@/types/element.type";
import { CheckItemType } from "@/utils/types";
import { useChecked } from "@/utils";

import "./index.less";

const list: CheckItemType[] = [];
for (let q = 0; q < 10; q++) {
  list.push({
    id: q,
    checked: false,
    price: q + Math.floor(Math.random())
  });
}

export default () => {
  const { checkedAll, newCheckedList, dispatch } = useChecked(list);

  let count: number = 0;
  newCheckedList.map((c: CheckItemType) => {
    return (count += c.price);
  });

  const onItemChecked = (id: number, flag: boolean) => {
    dispatch({
      type: "CHECKED_CHANGE",
      payload: {
        id,
        checked: flag
      }
    });
  };

  const onCheckedAllChange = (flag: boolean): void => {
    dispatch({
      type: "CHECKED_ALL_CHANGE",
      payload: {
        checked: flag
      }
    });
  };

  return (
    <div className="main flex flex-column ali-center">
      {newCheckedList.map((item: CheckItemType) => {
        return (
          <CardItem
            {...item}
            key={item.id}
            onItemChecked={(e: boolean) => onItemChecked(item.id, e)}
          />
        );
      })}
      <p>
        <input
          type="checkbox"
          checked={checkedAll}
          onChange={(e: InputElement) => onCheckedAllChange(e.target.checked)}
        />
        全选
      </p>
      <p className="count">总价：￥{count}</p>
    </div>
  );
};
