import React, { useState } from 'react';

import { Select } from 'antd';

const { Option } = Select;

/** 组件 */
// import CoverLayer from '@/components/AntMap/CoverLayer';

/** 本地util */
// import { useClock } from '@/utils';

export default () => {
  // const { hour, minute, second } = useClock();
  const [type, setType] = useState<'province' | 'area' | 'city'>('area');

  // useEffect(() => {
  //   if (type === 'province') {
  //     setTimeout(() => {
  //       console.log(hour, minute, second);
  //     }, 1000);
  //   }
  // });

  return (
    <>
      <Select
        defaultValue="area"
        style={{ width: 120, position: 'absolute', zIndex: 100000 }}
        onChange={(val: 'province' | 'area' | 'city') => setType(val)}
      >
        <Option value="province">province</Option>
        <Option value="city">city</Option>
        <Option value="area">area</Option>
      </Select>
      {/* <div style={{ height: '500px' }}>
        <CoverLayer type={type} />

        <div
          id="map"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </div> */}
    </>
  );
};
