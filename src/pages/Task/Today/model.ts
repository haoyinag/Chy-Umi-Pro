import { Effect, ImmerReducer, Subscription } from "umi";

export interface TodayTaskState {
  name: string;
}

export interface TodayTaskType {
  namespace: "todayTask";
  state: TodayTaskState;
  effects: {
    query: Effect;
  };
  reducers: {
    // save: Reducer<TodayTaskState>;
    // 启用 immer 之后
    save: ImmerReducer<TodayTaskState>;
  };
  subscriptions: { setup: Subscription };
}

const TodayTask: TodayTaskType = {
  namespace: "todayTask",
  state: {
    name: "todayTask",
  },
  effects: {
    *query({ payload }, { call, put }: { call: any; put: any }): any {
      yield put({
        type: "save",
        payload: payload.name,
      });
    },
  },
  reducers: {
    // save(state, action) {
    //     return {
    //         ...state,
    //         ...action.payload,
    //     };
    // },
    // 启用 immer 之后
    save(state: any, action: any) {
      state.name = action.payload;
    },
  },
  subscriptions: {
    setup({ dispatch, history }: { dispatch: any; history: any }) {
      return history.listen(({ pathname }: { pathname: any }) => {
        // console.log(pathname);

        if (pathname === "/") {
          dispatch({
            type: "query",
          });
        }
      });
    },
  },
};

export default TodayTask;
