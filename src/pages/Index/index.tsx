import React from 'react';
// import { Link } from "umi";

// import { AutoComplete } from "antd";
import { PageHeaderWrapper } from '@ant-design/pro-layout';

// import { Filter } from "@/components";

// const searchList = [
//   {
//     label: "fields-aaa" + 1,
//     key: "fields-bbb" + 1,
//     tagName: "input",
//     rules: [
//       {
//         required: true,
//         message: "fields-" + 1 + ":Input something!",
//       },
//     ],
//   },
//   {
//     tagName: "input",
//     key: "treeSelectItem",
//     label: "类型",
//     defaultValue: null,
//     placeholder: "请选择",
//     list: [
//       {
//         id: 0,
//         key: "123",
//         children: [
//           {
//             id: 10,
//             key: "12311",
//           },
//           {
//             id: 11,
//             key: "asd11",
//           },
//         ],
//       },
//       {
//         id: 1,
//         key: "asd",
//       },
//     ],
//   },
//   {
//     tagName: "select",
//     key: "selectItem",
//     label: "类型2",
//     defaultValue: null,
//     placeholder: "请选择",
//     list: [
//       {
//         id: 0,
//         key: "123",
//       },
//       {
//         id: 1,
//         key: "asd",
//       },
//     ],
//   },
//   {
//     tagName: "autoComplete",
//     key: "autoCompleteItem",
//     label: "标题",
//     options: [
//       { value: "Burns Bay Road" },
//       { value: "Downing Street" },
//       { value: "Wall Street" },
//     ],
//   },
//   {
//     tagName: "switch",
//     key: "timerangepickerItem",
//     label: "时间",
//     timeRange: {
//       startTime: "00:10:00",
//       endTime: "00:20:00",
//     },
//   },
// ];

export default () => {
  return (
    <PageHeaderWrapper title="首页" content="">
      {/* <Link to="/task/today?a=1&b=2">今日任务</Link>

      <Filter filterList={searchList} /> */}
      {/* 
      <AutoComplete
        options={[
          { value: "Burns Bay Road" },
          { value: "Downing Street" },
          { value: "Wall Street" },
        ]}
        style={{ width: 200 }}
        // onSelect={onSelect}
        // onSearch={onSearch}
        // onChange={onChange}
        placeholder="control mode"
      /> */}
    </PageHeaderWrapper>
  );
};
