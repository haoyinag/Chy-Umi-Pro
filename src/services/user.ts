import { request } from 'umi';

import { Get, Post, API_DELIVERY } from './request';

export async function login(params: Object | undefined) {
  return Post(`${API_DELIVERY}/login`, params);
}

export async function queryUsers() {
  return Get('/api/users');
}

export async function queryCurrent() {
  return request<API.CurrentUser>('/api/currentUser');
}
