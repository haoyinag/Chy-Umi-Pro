import React from "react";
import { Link } from "umi";
import { PageHeaderWrapper } from "@ant-design/pro-layout";

let arr: number[] = [];
for (let q = 0; q < 100; q++) {
  arr = arr.concat(q);
}
export default () => {
  return (
    <PageHeaderWrapper title="首页" content="模块说明">
      <Link to="/task/today?a=1&b=2">今日任务</Link>
      <div className="Content">
        {arr.map((item: number) => {
          return (
            <div
              key={item}
              style={{ lineHeight: "50px", borderBottom: "1px solid #eee" }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </PageHeaderWrapper>
  );
};
