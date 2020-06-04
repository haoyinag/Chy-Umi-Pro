import { Put, API_DELIVERY } from '@/services/request';

// 更换手机号
export async function updatePhone(payload: any) {
  return Put(`${API_DELIVERY}/admins/${payload.id}/phone/${payload.phone}`);
}
