import { Effect, ImmerReducer, Subscription } from 'umi';

export interface LoginState {
  code: string;
  [key: string]: any;
}

export interface LoginType {
  namespace: 'login';
  state: LoginState;
  effects: {
    // queryCode: Effect;
    login: Effect;
  };
  reducers: {
    // getCode: Reducer<LoginState>;
    // 启用 immer 之后
    getCode: ImmerReducer<LoginState>;
  };
  subscriptions: { setup: Subscription };
}
