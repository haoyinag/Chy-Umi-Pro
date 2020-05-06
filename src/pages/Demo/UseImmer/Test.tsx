import React from "react";

import { Button } from "antd";

export default ({
  list,
  onChangeItem
}: {
  list: any;
  onChangeItem: Function;
}) => {
  console.log(1);

  return (
    <div style={{ height: "100%" }}>
      {list.length > 0 &&
        list.map((item: any, index: number) => {
          if (typeof item === "number") {
            return (
              <div key={index} className="item">
                {item}
              </div>
            );
          } else {
            return (
              <Button
                key={index}
                onClick={() => onChangeItem && onChangeItem(index)}
                className="item"
                type="primary"
              >
                {item.name}
              </Button>
            );
          }
        })}
    </div>
  );
};
