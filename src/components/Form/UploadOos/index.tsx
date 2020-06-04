import React, { useState, memo } from 'react';
import { Upload, Form, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { UPLOAD_DUMAIN } from '@/utils';

/** 上传域名（暂时写死） */
const uploadHost = `https://test-api.xxxx.com/${UPLOAD_DUMAIN}`;

/** props类型 */
interface UploadProps {
  limit?: number;
  name?: string;
  label?: string;
  defaultSrc?: string;
  onChange?: (str: string) => void;
  [key: string]: any;
}

/** 上传前校验--暂时写死JPG/PNG 格式 */
function beforeUpload(file: File, size: number = 5) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传 JPG/PNG 格式图片!');
  }
  const isLt2M = file.size / 1024 / 1024 < size;
  if (!isLt2M) {
    message.error(`只能上传小于 ${size}MB 的图片`);
  }
  return isJpgOrPng && isLt2M;
}

function areEqual(prevProps: UploadProps, nextProps: UploadProps) {
  return prevProps.defaultSrc === nextProps.defaultSrc;
}

/** 上传封装组件 */
export const UploadOos = memo(
  ({
    limit = 5,
    name,
    label,
    defaultSrc, // 默认值src，Form的initialValues不能给当前组件传递默认值，否则会冲突
    onChange,
    ...props
  }: UploadProps) => {
    const [carSrc, setCarSrc] = useState(defaultSrc || '');
    const [loading, setLoading] = useState(false);

    /** change事件 */
    const handleChange = (info: any) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
      }
      if (info.file.status === 'done') {
        const src = info?.file?.response?.data || '';
        console.log(src);
        /** 如果不添加原生事件处理，图片会延迟渲染 */
        const img = new Image();
        img.src = src;
        img.onload = function () {
          console.log('done');
          setCarSrc(src);
          setLoading(false);
          onChange && onChange(src);
        };
        img.onerror = function () {
          message.error('图片加载失败!');
        };
      }
    };

    /** 上传按钮 */
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">上传</div>
      </div>
    );

    return (
      <Form.Item
        {...props}
        name={name}
        label={label}
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (!e || !e.fileList) {
            return e;
          }
          const { fileList } = e;
          return fileList;
        }}
      >
        <Upload
          {...props}
          showUploadList={false}
          listType="picture-card"
          action={`${uploadHost}`}
          onChange={handleChange}
          beforeUpload={(file: File) => beforeUpload(file, limit)}
        >
          {carSrc ? (
            <img src={carSrc} alt="avatar" style={{ width: '100%' }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </Form.Item>
    );
  },
  areEqual,
);
