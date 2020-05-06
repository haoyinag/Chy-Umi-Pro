import { queryUsers } from "@/services";
import { LoginType } from "./type";

const Login: LoginType = {
  namespace: "login",
  state: {
    code: "",
  },
  effects: {
    *queryCode({ payload }, { call, put }: { call: any; put: any }): any {
      try {
        const response = yield call(queryUsers);
        console.log(response);
      } catch (error) {
        console.log(error);
      }

      yield put({
        type: "getCode",
        payload: payload,
      });
    },
  },
  reducers: {
    // getCode(state, action) {
    //     return {
    //         ...state,
    //         ...action.payload,
    //     };
    // },
    // 启用 immer 之后
    getCode(state: any, action: any) {
      state.code = action.payload;
    },
  },
  subscriptions: {
    setup({ dispatch, history }: { dispatch: any; history: any }) {
      return history.listen(({ pathname }: { pathname: any }) => {
        // console.log(pathname);
        // if (pathname === '/') {
        //   dispatch({
        //     type: 'queryCode',
        //   });
        // }
      });
    },
  },
};

export default Login;
