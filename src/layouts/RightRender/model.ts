import { Effect, ImmerReducer, Subscription } from 'umi';

export interface ChangeUserState {
  name: string;
}

export interface ChangeUserType {
  namespace: 'changeUser';
  state: ChangeUserState;
  effects: {
    query: Effect;
  };
  reducers: {
    // save: Reducer<ChangeUserState>;
    // 启用 immer 之后
    save: ImmerReducer<ChangeUserState>;
  };
  subscriptions: { setup: Subscription };
}

const ChangeUser: ChangeUserType = {
  namespace: 'changeUser',
  state: {
    name: 'changeUser',
  },
  effects: {
    *query({ payload }, { call, put }: { call: any; put: any }): any {
      yield put({
        type: 'save',
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
        console.log(pathname);

        if (pathname === '/') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};

export default ChangeUser;
