/** type='city'类型数据 */
export const PCData = async () => {
  const res = await fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/551e3ca6-6dad-421b-a8b4-b225e47f73ca.json',
  );
  const ops = await res.json();
  const response = await fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/149b599d-21ef-4c24-812c-20deaee90e20.json',
  );
  const provinceData = await response.json();
  return [ops, provinceData];
};

/** type='area'类型数据 */
export const PCAData = async () => {
  const res = await fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/04de56cc-5998-4f7e-9ad3-e87e9ac5fd39.json',
  );
  const ops = await res.json();
  return ops;
};
