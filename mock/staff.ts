let STAFF_DATA_LIST = [];
let STAFF_OFF_LIST = [];
let STAFF_TEMP_LIST = [];

for (let i = 0; i < 50; ++i) {
  if (i % 5 == 0) {
    STAFF_DATA_LIST.push({
      id: i + 1,
      no: '888',
      site: 1,
      tiaopei: 1,
      name: '亚萨希',
      gender: 1,
      phone: '13899999999',
      tool: 2,
      role: 2,
      createTime: '2020-5-11',
      status: 1,
    });
  } else {
    STAFF_DATA_LIST.push({
      id: i + 1,
      no: '777',
      site: 0,
      tiaopei: 0,
      name: '花袜替',
      gender: 0,
      phone: '13111111111',
      tool: 0,
      role: 1,
      createTime: '2020-5-11',
      status: 0,
    });
  }
}

for (let i = 0; i < 50; ++i) {
  STAFF_OFF_LIST.push({
    id: i + 1,
    no: '888',
    offTime: '2020-5-11',
    site: 1,
    name: '亚萨希',
    phone: '13899999999',
    tool: 2,
    role: 2,
    status: 1,
    operater: '团团',
  });
}

for (let i = 0; i < 50; ++i) {
  if (i % 5 == 0) {
    STAFF_TEMP_LIST.push({
      id: i + 1,
      no: '888',
      site: 1,
      name: '亚萨希kkkk',
      phone: '13899999999',
      gender: 1,
      tool: 2,
      role: 2,
      type: 1,
      createTime: '2020-5-11',
      open: 1,
    });
  } else {
    STAFF_TEMP_LIST.push({
      id: i + 1,
      no: '888',
      site: 1,
      name: '亚萨希',
      phone: '13899999999',
      gender: 1,
      tool: 2,
      role: 2,
      type: 1,
      createTime: '2020-5-11',
      open: 0,
    });
  }
}

export default {
  // // 支持值为 Object 和 Array
  // 'GET /api/users': { users: [1, 2] },
  // // GET 可忽略
  // '/api/users/1': { id: 1 },
  // // 支持自定义函数，API 参考 express@4
  // 'POST /api/users/create': (req: any, res: any) => {
  //   // 添加跨域请求头
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.end('ok');
  // },
  'GET /api/admin/deliver/list': { status: 200, data: STAFF_DATA_LIST },

  'GET /api/admin/deliverOff/list': { status: 200, data: STAFF_OFF_LIST },

  'GET /api/admin/tempStaff/list': { status: 200, data: STAFF_TEMP_LIST },
};
