import { Effect, ImmerReducer, Subscription } from "umi";

export interface UseModelDemoState {
  name: string;
}

export interface UseModelDemoType {
  namespace: "modelDemo";
  state: UseModelDemoState;
  effects: {
    query: Effect;
  };
  reducers: {
    // save: Reducer<UseModelDemoState>;
    // 启用 immer 之后
    save: ImmerReducer<UseModelDemoState>;
  };
  subscriptions: { setup: Subscription };
}

const UseModelDemo: UseModelDemoType = {
  namespace: "modelDemo",
  state: {
    name: "modelDemo",
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

export default UseModelDemo;
