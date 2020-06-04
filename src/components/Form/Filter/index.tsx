import React from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  InputNumber,
  AutoComplete,
  Select,
  // message,
  DatePicker,
  TreeSelect,
  Switch,
  Cascader,
  TimePicker,
} from 'antd';
const { RangePicker } = DatePicker;
// import { DownOutlined, UpOutlined } from "@ant-design/icons";

import { setKeystoLocaleLowerCase } from '@/utils';

const { Option } = Select;
const { TreeNode } = TreeSelect;

interface FilterProps {
  filterList: any[];
  autoSearch?: boolean;
  onSearch?: Function;
  onReset?: Function;
  [key: string]: any;
}

export const Filter = ({
  filterList,
  autoSearch = false,
  onSearch,
  onReset,
  ...props
}: FilterProps) => {
  const [form] = Form.useForm();
  filterList = setKeystoLocaleLowerCase(filterList);

  const onFinish = (values: { [key: string]: string | number | undefined }) => {
    onSearch && onSearch(values);
  };

  const lisLen: number = filterList.length;
  const span: number = lisLen >= 5 ? 4 : (24 - 2.5) / lisLen;

  const getFormElement = (tagname: string, oItem: any) => {
    /** onPressEnter会自动执行 */
    let item: any = {};
    for (let key in oItem) {
      if (oItem.hasOwnProperty(key)) {
        if (key !== 'defaultvalue') {
          item[key] = oItem[key];
        }
      }
    }
    item = {
      ...item,
      onChange: () => autoSearch && onFinish(form.getFieldsValue()),
      onSelect: () => autoSearch && onFinish(form.getFieldsValue()),
    };
    switch (tagname) {
      case 'input':
        return <Input allowClear {...item} />;
      case 'inputnumber':
        return <InputNumber min={0} {...item} />;
      case 'autocomplete':
        // delete item.onChange;
        return (
          <AutoComplete
            allowClear
            options={item.options}
            filterOption={(inputValue: any, option: any) => {
              return (
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              );
            }}
            {...item}
          />
        );
      case 'switch':
        // delete item.checked;
        // delete item.defaultChecked;
        return <Switch checkedChildren="开" unCheckedChildren="关" {...item} />;
      case 'select':
        const selectlist = item.list || item.selectlist || [];
        // delete item.selectlist;
        // delete item.onChange;
        return (
          <Select allowClear {...item}>
            {item.render && item.render()}
            {!item.render &&
              selectlist.map((cl: any) => {
                const oName = cl.key || cl.text || cl.name;
                return (
                  <Option key={cl.id} value={cl.id}>
                    {oName}
                  </Option>
                );
              })}
          </Select>
        );
      case 'treeselect':
        const treeSelectList = item.list || item.selectlist || [];
        // delete item.selectlist;
        // delete item.onChange;
        return (
          <TreeSelect allowClear multiple {...item}>
            {item.render && item.render()}
            {!item.render &&
              treeSelectList.map((cl: any) => {
                const nodeName = cl.key || cl.text;
                // delete cl.text;
                return (
                  <TreeNode key={cl.id} value={cl.id} title={nodeName}>
                    {(cl.children || []).map((chil: any) => {
                      const subnodeName = chil.key || chil.text;
                      // delete chil.text;
                      return (
                        <TreeNode
                          key={chil.id}
                          value={chil.id}
                          title={subnodeName}
                        />
                      );
                    })}
                  </TreeNode>
                );
              })}
          </TreeSelect>
        );
      case 'datepicker':
        return <DatePicker {...item} />;
      case 'rangepicker':
        return <RangePicker {...item} />;
      case 'timepicker':
        return <TimePicker {...item} />;
      case 'rangetimepicker':
        return <TimePicker.RangePicker {...item} />;
      case 'cascader':
        return <Cascader {...item} />;
      default:
        return '';
    }
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      {...props}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        {filterList.map((item: any, i: number) => {
          const tagname = (item.tagname || '').toLowerCase();

          if (tagname !== 'input' && item.rules) {
            // delete item.rules;
            item.rules = null;
          }

          const itemName = item.key;
          // delete item.text;
          // delete item.checked;
          // delete item.defaultChecked;
          // delete item.dataSource;
          // delete item.pattern; // 警告：pattern命名会和组件本身冲突，但为了更友好继续沿用此命名
          // delete item.tagname; // 警告：在react中属性都是小驼峰命名，所以也会有属性的命名冲突
          // delete item.value; // 警告：如果有改属性，{...item}会与getFieldDecorator产生冲突
          // delete item.defaultValue; // 警告：如果有改属性，{...item}会与getFieldDecorator产生冲突

          return (
            <Col
              span={tagname === 'switch' ? 2.5 : span}
              key={item.key + i}
              style={{
                minWidth: tagname === 'switch' ? 'auto' : '200px',
                // maxWidth: "250px",
              }}
            >
              <Form.Item
                name={itemName}
                label={item.label}
                rules={item.rules ? [item.rules] : []}
              >
                {getFormElement(tagname, item)}
              </Form.Item>
            </Col>
          );
        })}

        <Col
          span={2.5}
          style={{ minWidth: '100px', textAlign: 'right', flex: 'auto' }}
        >
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields();
              onReset && onReset();
            }}
          >
            重置
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
