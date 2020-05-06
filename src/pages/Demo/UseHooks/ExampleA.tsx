import React from "react";

export default ({ text }: { text: string }): JSX.Element => {
  console.log("Example A：", "render");
  return <div>Example A 组件：{text}</div>;
};
