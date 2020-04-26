import { request } from 'umi';

import { Get } from './api';

export async function queryUsers() {
  return Get('/api/users');
}

export async function queryCurrent() {
  return request<API.CurrentUser>('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
