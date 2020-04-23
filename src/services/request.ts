import request from 'umi-request';

import { message } from 'antd'

// request interceptor, change url or options.
request.interceptors.request.use((url, options) => {
    return (
        {
            url: `${url}&interceptors=yes`,
            options: { ...options, interceptors: true },
        }
    );
});

// Same as the last one
request.interceptors.request.use((url, options) => {
    return (
        {
            url: `${url}&interceptors=yes`,
            options: { ...options, interceptors: true },
        }
    );
}, { global: true });

// response interceptor, chagne response
request.interceptors.response.use((response, options) => {
    response.headers.append('interceptors', 'yes yo');
    return response;
});

// handling error in response interceptor
request.interceptors.response.use((response) => {
    const codeMaps: any = {
        502: '网关错误。',
        503: '服务不可用，服务器暂时过载或维护。',
        504: '网关超时。',
    };
    message.error(codeMaps[response.status]);
    return response;
});

// clone response in response interceptor
request.interceptors.response.use(async (response) => {
    const data = await response.clone().json();
    if (data && data.NOT_LOGIN) {
        location.href = '登录url';
    }
    return response;
})

export default request