import React, { memo } from "react";

import { InputElement } from "@/types/element.type";
import { CheckItemType } from "@/utils/types";

interface CheckItemChangeType extends CheckItemType {
  onItemChecked: (e: boolean) => void;
}

// memo优化策略
function areEqual(prevProps: CheckItemType, nextProps: CheckItemType) {
  return prevProps.checked === nextProps.checked;
}
const CardItem = memo(
  ({ id, price, checked, onItemChecked }: CheckItemChangeType) => {
    return (
      <div className="item flex jus-between" style={{ width: "150px" }}>
        <input
          id={`${id}`}
          checked={checked}
          type="checkbox"
          onChange={(e: InputElement) => {
            onItemChecked(e.target.checked);
          }}
        />
        <span className="price">￥{price}</span>
      </div>
    );
  },
  areEqual
);

export default CardItem;
