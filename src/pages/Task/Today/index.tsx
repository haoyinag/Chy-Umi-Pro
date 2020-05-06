import React, { FC } from "react";
import {
  ConnectProps,
  Loading,
  connect,
  useDispatch,
  useHistory,
  // useLocation,
  // useParams
} from "umi";
import { PageHeaderWrapper } from "@ant-design/pro-layout";

import { Button, DatePicker } from "antd";

import { TodayTaskState } from "./model";

interface PageProps extends ConnectProps {
  todayTask: TodayTaskState;
  loading: boolean;
}

const TodayTaskPage: FC<PageProps> = ({ todayTask }) => {
  const { name } = todayTask;
  const dispatch = useDispatch();
  const his = useHistory();

  console.log(his.action);

  const onClick = (num: number) => {
    dispatch({
      type: "todayTask/query",
      payload:
        num === 1 ? { name: "哈哈，我改变了useModel" } : { name: "useModel" },
    });
  };
  const onChange = (date: Date, dateString: string): any => {
    console.log(date, dateString);
  };
  return (
    <PageHeaderWrapper>
      <div className="flex model">
        Hello {name}
        <DatePicker
          // placeholder="请选择日期"
          onChange={(date: any, str: string) => onChange(date, str)}
        />
        <br />
        <Button type="primary" onClick={() => onClick(1)}>
          dispatch
        </Button>
        <Button type="primary" onClick={() => onClick(2)}>
          重置
        </Button>
      </div>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    todayTask,
    loading,
  }: {
    todayTask: TodayTaskState;
    loading: Loading;
  }) => ({
    todayTask,
    loading: loading.models.todayTask,
  })
)(TodayTaskPage);
