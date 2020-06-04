import React, { FC, useEffect, useState } from 'react';
import { history } from 'umi';
import { Upload, Button } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import PhoneModal from './components/PhoneModal';
import './index.less';
import { updatePhone } from './services';

const ProfilePage: FC<{}> = () => {
  const [profile, handleProfile] = useState<any>({});
  const [phoneModalVisible, handlePhoneModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (Object.keys(profile).length === 0) {
      handleProfile(
        JSON.parse(sessionStorage.getItem('userInfo') || '{}') || {},
      );
    }
  });

  const handlePhoneChange = (val: string) => {
    console.log(val);
    console.log(profile);
    updatePhone({ id: profile.id, phone: val });
  };

  const { photoUrl, name, gender, phone, stationName, positionName } = profile;

  return (
    <PageHeaderWrapper style={{ backgroundColor: '#fff' }} title="个人信息">
      <div className="profile-wrap">
        <div className="left">
          <div className="avatar img-wrap">
            <img src={photoUrl} alt="avatar" style={{ width: '100%' }} />
          </div>
          <div className="upload-text">
            <Upload name="avatar" listType="text" showUploadList={false}>
              <a>重新上传</a>
            </Upload>
          </div>
        </div>
        <div className="right">
          <div className="info-item">
            <div>姓名：</div>
            <div>{name}</div>
          </div>
          <div className="info-item">
            <div>性别：</div>
            <div>{gender}</div>
          </div>
          <div className="info-item">
            <div>手机号：</div>
            <div>{phone}</div>
            <div style={{ marginLeft: '25px' }}>
              <a onClick={() => handlePhoneModalVisible(true)}>更换手机号</a>
            </div>
          </div>
          <div className="info-item">
            <div>所属站点：</div>
            <div>{stationName}</div>
          </div>
          <div className="info-item">
            <div>职位：</div>
            <div>{positionName}</div>
          </div>
          {/* <div className="info-item">
            <div>健康证：</div>
            <div className="img-wrap">
              <img src={healthImg} alt="avatar" style={{ width: "100%" }} />
            </div>
          </div>
          <div className="info-item">
            <div>工具：</div>
            <div>{tool}</div>
          </div>
          <div className="info-item">
            <div>车牌号：</div>
            <div>{licence}</div>
          </div>
          <div className="info-item">
            <div>车牌号照片：</div>
            <div className="img-wrap">
              <img src={licenceImg} alt="avatar" style={{ width: "100%" }} />
            </div>
          </div> */}
        </div>
      </div>
      <div>
        <Button
          type="primary"
          size="middle"
          style={{ display: 'block', margin: '30px 0 0 450px' }}
          onClick={() => {
            history.goBack();
          }}
        >
          返回
        </Button>
      </div>
      {phoneModalVisible && (
        <PhoneModal
          modalVisible={phoneModalVisible}
          oldPhone={profile.phone}
          onOk={(val) => handlePhoneChange(val)}
          onCancel={() => handlePhoneModalVisible(false)}
        />
      )}
    </PageHeaderWrapper>
  );
};

export default ProfilePage;
