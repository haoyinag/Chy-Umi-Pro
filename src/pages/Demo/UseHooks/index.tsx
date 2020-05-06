import React, { useState, useEffect, useMemo, useRef } from "react";

import CardItem from "./CardItem";
import ExampleA from "./ExampleA";
import ExampleB from "./ExampleB";

import { UseRef, InputElement } from "@/types";
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

export default (): JSX.Element => {
  const [textA, setA] = useState("ExampleA");
  const [textB, setB] = useState("ExampleB");

  // 使用 useRef 创建 inputEl
  const inputEl: UseRef = useRef(null);

  // 使用 useRef 创建 textRef
  const textRef: UseRef = useRef();
  const [text, updateText] = useState("");

  const { checkedAll, newCheckedList, dispatch } = useChecked(list);

  let count: number = 0;
  newCheckedList.map((c: CheckItemType) => {
    return (count += c.price);
  });

  /** 与 DOM 无关的副作用操作请使用 useEffect。 */
  useEffect(() => {
    // 将 text 值存入 textRef.current 中
    textRef.current = text;
    console.log("textRef.current：", textRef.current);
  }, [text]);

  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.value = textRef.current;
    // inputEl.current.value = text;
  };

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

  /** 使用useMemo包裹后的组件数据不改变不会被重复渲染 */
  const exampleA = useMemo(() => <ExampleA text={textA} />, [textA]);
  const exampleB = useMemo(() => <ExampleB text={textB} />, [textB]);
  return (
    <div className="main flex flex-column ali-center">
      <div>
        {exampleA}
        {exampleB}
        {/* 
            这样直接使用组件会重复被渲染
           <ExampleA text={textA} />
           <ExampleA text={textA} /> 
        */}
        <br />
        <button onClick={() => setA("修改后的 ExampleA")}>
          修改传给 ExampleA 的属性
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => setB("修改后的 ExampleB")}>
          修改传给 ExampleB 的属性
        </button>
      </div>
      <div>
        <input value={text} onChange={e => updateText(e.target.value)} />
        <button onClick={onButtonClick}>在下面的 input 上展示文字</button>
        <br />
        <br />
        {/* 保存 input 的 ref 到 inputEl */}
        <input ref={inputEl} type="text" />
      </div>
      <div>
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
    </div>
  );
};
