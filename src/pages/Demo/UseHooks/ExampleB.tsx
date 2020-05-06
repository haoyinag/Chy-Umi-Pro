import React from "react";

export default ({ text }: { text: string }): JSX.Element => {
  console.log("Example B：", "render");
  return <div>Example B 组件：{text}</div>;
};
