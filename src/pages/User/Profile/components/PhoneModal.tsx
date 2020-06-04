import React, { FC, useState } from 'react';
import { Modal, Button, Row, Col, Input } from 'antd';

import { debounce } from 'lodash';

interface PhoneModalProps {
  modalVisible: boolean;
  oldPhone: string;
  onOk: (values: any) => void;
  onCancel: () => void;
}

/**
 * 更换手机号 弹窗
 * @param props
 */
const PhoneModal: FC<PhoneModalProps> = (props) => {
  const { modalVisible, oldPhone, onCancel, onOk } = props;
  const [phone, handlePhone] = useState<string>('');

  const changePhone = debounce((val: string) => {
    handlePhone(val);
  }, 350);

  return (
    <Modal
      destroyOnClose
      title="更换手机号"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={[
        <Button key="cancel" onClick={onCancel} style={{ margin: '0 8px' }}>
          取消
        </Button>,
        <Button key="ok" type="primary" onClick={() => onOk(phone)}>
          确定
        </Button>,
      ]}
    >
      <Row gutter={10} justify="center">
        <Col span={4}>旧手机号：</Col>
        <Col span={18}>{oldPhone}</Col>
      </Row>
      <Row gutter={10} justify="center" style={{ marginTop: '20px' }}>
        <Col span={4}>新手机号：</Col>
        <Col span={18}>
          <Input maxLength={11} onChange={(e) => changePhone(e.target.value)} />
        </Col>
      </Row>
    </Modal>
  );
};

export default PhoneModal;
