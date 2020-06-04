import React, { Fragment } from 'react';
// import moment from "moment";

import {
  Button,
  Input,
  InputNumber,
  AutoComplete,
  Select,
  message,
  DatePicker,
  TreeSelect,
  Switch,
  Cascader,
  TimePicker,
  Form,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { ErrorInfo } from '../types';

const FormItem = Form.Item;
const { Option } = Select;
const { TreeNode } = TreeSelect;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

/**
 * 
 * @param {页面搜索栏组件} from chenhaoyin
 * ----避免各个页面的搜索栏各自为战的问题，统一组件，减少代码量，尽量逻辑/组件复用----
 * 兼容的搜索控件：
    ===Button：可以添加多个button按钮；
    ===Input：基本使用，输入框；
    ===InputNumber：number输入框；
    ===AutoComplete：输入匹配输入框，匹配规则默认option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1；
    ===Select：下拉选择器，传递selectList{id，name}或者render=>reactNode生成对应的下拉框内容； 
    ===TreeSelect：同·Select·；
    ===Switch：开关按钮，默认文字为“开/关”；
    ===Cascader：级联选择器，例如省市区；
    ===WeekPicker：星期选择器；
    ===MonthPicker：月份选择器；
    ===DatePicker：日期选择器；
    ===RangePicker：日期间隔选择器；
    ===TimeRangePicker：基于timepicker二次封装的时间段选择器，onChange时额外返回permission，开始/结束时间都有值以及autoSearch时触发搜索；
*                 
* 使用规则：除了各个组件使用原有API，新增如下API
    ===searchList：搜索栏list，其中三个字段必填：tagName标签名称，key搜索键值名称，label搜索前置名称 ；
    ===reset：是否重置按钮，boolean值，默认true ；
    ===onChange：每个非button控件值改变时触发的操作，function(itemValue)； 
    ===onDateChange：对应日期/时间选择器相关onchange[moment,str]事件，方便获取对应的str，会先于onChange执行
    ===onSearch：触发搜索，function(fieldsValue)；
    ===autoSearch：是否自动触发搜索，boolean值，默认false ；
    ===noSearchButton：是否不用搜索按钮，boolean值，默认false ；
    ===stopPagination：是否返回true禁止其他如table的分页器关联操作, function(boolean) ；
    ===onButtonClick：有其他额外button按钮时触发的操作，function(item)； 
*                     
*/

interface SearchState {
  searchList: any[];
  reset: boolean;
  onDateChange: Function;
  onSearch: Function;
  autoSearch: boolean;
  noSearchButton: boolean;
  stopPagination: Function;
  onButtonClick: Function;
  form: any;
}

/** formItem的getFieldDecorator配置 */
const getFieldDecoratorOps = (form: any) => {
  let rules = null;
  if (form.rules) {
    rules = [...form.rules];
  }
  if (form.pattern) {
    rules = [
      {
        pattern: form.pattern,
        message: form.message || '内容不符合规则',
      },
    ];
  }
  return {
    initialValue: form.nextdefaultvalue || form.nextvalue,
    rules,
  };
};

export const Filter: any = ({
  searchList /** 搜索栏list，其中三个字段必填：tagName标签名称，key搜索键值名称，label搜索名称 */,
  reset = true /** 重置按钮 */,
  onDateChange /** 日期相关onchange[str,moment]事件，方便获取对应的str */,
  onSearch /** 触发搜索 */,
  autoSearch /** 自动触发搜索 */,
  noSearchButton /** 不用搜索按钮 */,
  stopPagination /** 是否返回true禁止其他如table的分页器关联操作 */,
  onButtonClick /** 有其他额外button按钮时触发的操作 */,
}: SearchState): any => {
  console.log(Form.useForm());

  const [form] = Form.useForm();
  const {
    getFieldDecorator,
    validateFields,
    // setFieldsValue,
    resetFields,
  }: any = form;
  if (!searchList) {
    searchList = [];
  }

  /** 搜索 */
  const handleSearch = () => {
    validateFields()
      .then((values: any) => {
        console.log(values);

        stopPagination && stopPagination(false);
        onSearch && onSearch(values);
      })
      .catch((errorInfo: ErrorInfo) => {
        console.log(errorInfo);
        message.destroy();
        message.error('搜索条件有误', 1.5);
        stopPagination && stopPagination(true);

        /*
    errorInfo:
      {
        values: {
          username: 'username',
          password: 'password',
        },
        errorFields: [
          { password: ['username'], errors: ['Please input your Password!'] },
        ],
        outOfDate: false,
      }
    */
      });
  };

  /** 获取时间段 */
  // const getRangeTime = (key: string, range: any, permission: boolean) => {
  //   const time = [range.startTime, range.endTime, permission];
  //   const fields = {
  //     [key]: time,
  //   };
  //   setFieldsValue(fields);
  //   range.startTime && range.endTime && autoSearch && handleSearch();
  // };

  /** datePicer衍生器onchange */
  const dateChange = (mo: any, str: string) => {
    onDateChange && onDateChange([str, mo]);
    autoSearch && handleSearch();
  };

  return (
    <Form scrollToFirstError layout="inline">
      {searchList.map((form, idx) => {
        if (!form.tagName) {
          return console.error('请使用tagName作为控件的标签名字段');
        }

        form = {
          ...form,
          nextvalue: form.value || form.checked, // 新增字段要用小写，不然会警告
          nextdefaultvalue: form.defaultValue || form.defaultChecked, // 新增字段要用小写，不然会警告
        };
        // const exp = form.pattern;
        const tagname = form.tagName;
        const Options = getFieldDecoratorOps(form);
        delete form.checked;
        delete form.defaultChecked;
        // delete form.dataSource;
        delete form.pattern; // 警告：pattern命名会和组件本身冲突，但为了更友好继续沿用此命名
        delete form.tagName; // 警告：在react中属性都是小驼峰命名，所以也会有属性的命名冲突
        delete form.value; // 警告：如果有改属性，{...form}会与getFieldDecorator产生冲突
        delete form.defaultValue; // 警告：如果有改属性，{...form}会与getFieldDecorator产生冲突
        return (
          <FormItem label={form.label} key={`${form.key}-${tagname}-${idx}`}>
            {tagname.toLowerCase() === 'input' &&
              getFieldDecorator(
                form.key,
                Options,
              )(
                <Input
                  allowClear
                  type={form.type || 'text'}
                  size="default"
                  onPressEnter={() => handleSearch()}
                  suffix={<SearchOutlined />}
                  {...form}
                />,
              )}

            {tagname.toLowerCase() === 'inputnumber' &&
              getFieldDecorator(
                form.key,
                Options,
              )(
                <InputNumber
                  allowClear
                  min="0"
                  size="default"
                  onPressEnter={() => handleSearch()}
                  suffix={<SearchOutlined />}
                  {...form}
                />,
              )}

            {tagname.toLowerCase() === 'autocomplete' &&
              getFieldDecorator(
                form.key,
                Options,
              )(
                <AutoComplete
                  allowClear
                  dataSource={form.dataSource}
                  filterOption={(inputValue: any, option: any) =>
                    option.props.children
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onSearch={() => handleSearch()}
                  onSelect={() => autoSearch && handleSearch()}
                  // onSearch={() => handleSearch()}
                  {...form}
                />,
              )}

            {tagname.toLowerCase() === 'switch' &&
              getFieldDecorator(form.key, {
                ...Options,
                valuePropName: 'checked',
              })(
                <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  onChange={() => autoSearch && handleSearch()}
                  {...form}
                />,
              )}

            {tagname.toLowerCase() === 'select' &&
              getFieldDecorator(
                form.key,
                Options,
              )(
                <Select
                  allowClear
                  style={{ minWidth: '150px', maxWidth: '250px' }}
                  {...form}
                  onSelect={() => autoSearch && handleSearch()}
                >
                  {form.render && form.render()}
                  {!form.render &&
                    (form.selectList || []).map((cl: any) => {
                      return (
                        <Option key={cl.id} value={cl.id}>
                          {cl.name}
                        </Option>
                      );
                    })}
                </Select>,
              )}

            {tagname.toLowerCase() === 'treeselect' &&
              getFieldDecorator(
                form.key,
                Options,
              )(
                <TreeSelect
                  allowClear
                  multiple
                  style={{ minWidth: '150px', maxWidth: '350px' }}
                  onSelect={() => autoSearch && handleSearch()}
                  {...form}
                >
                  {form.render && form.render()}
                  {!form.render &&
                    (form.selectList || []).map((cl: any) => {
                      return (
                        <TreeNode key={cl.id} value={cl.id} title={cl.name}>
                          {(cl.children || []).map((chil: any) => {
                            return (
                              <TreeNode
                                key={`${cl.id}_${chil.id}`}
                                value={chil.id}
                                title={chil.name}
                              />
                            );
                          })}
                        </TreeNode>
                      );
                    })}
                </TreeSelect>,
              )}

            {tagname.toLowerCase() === 'datepicker' &&
              getFieldDecorator(
                form.key,
                Options,
              )(
                <DatePicker
                  onChange={(date, str) => dateChange(date, str)}
                  {...form}
                />,
              )}

            {tagname.toLowerCase() === 'weekpicker' &&
              getFieldDecorator(
                form.key,
                Options,
              )(
                <WeekPicker
                  onChange={(week, str) => dateChange(week, str)}
                  {...form}
                />,
              )}

            {tagname.toLowerCase() === 'monthpicker' &&
              getFieldDecorator(
                form.key,
                Options,
              )(
                <MonthPicker
                  onChange={(mon, str) => dateChange(mon, str)}
                  {...form}
                />,
              )}

            {tagname.toLowerCase() === 'rangepicker' &&
              getFieldDecorator(
                form.key,
                Options,
              )(
                <RangePicker
                  onChange={(range: any, str: any) => dateChange(range, str)}
                  style={{ width: '230px' }}
                  {...form}
                />,
              )}

            {tagname.toLowerCase() === 'timepicker' &&
              getFieldDecorator(
                form.key,
                Options,
              )(
                <TimePicker
                  onChange={(date: any, str: any) => dateChange(date, str)}
                  {...form}
                />,
              )}

            {tagname.toLowerCase() === 'timerangepicker' &&
              getFieldDecorator(
                form.key,
                Options,
              )(
                <Fragment>
                  因为TimeRangePicker本身是平级双标签生成
                  {/* 因为TimeRangePicker本身是平级双标签生成，
                  所以必须要有外层标签包裹，否则无效 */}
                  {/* <TimeRangePicker
                    {...form}
                    getRangeTime={(range, permission) =>
                      getRangeTime(form.key, range, permission)
                    }
                  /> */}
                </Fragment>,
              )}

            {tagname.toLowerCase() === 'cascader' &&
              getFieldDecorator(
                form.key,
                Options,
              )(<Cascader style={{ width: '230px' }} {...form} />)}

            {tagname.toLowerCase() === 'button' &&
              getFieldDecorator(
                form.key,
                Options,
              )(
                <Button
                  style={{ marginLeft: '15px' }}
                  onClick={onButtonClick && onButtonClick(form)}
                  type="primary"
                  {...form}
                >
                  {form.btnLabel || form.label}
                </Button>,
              )}
          </FormItem>
        );
      })}

      <FormItem>
        {!noSearchButton && (
          <Button
            style={{ marginLeft: '15px' }}
            onClick={handleSearch}
            type="primary"
          >
            查询
          </Button>
        )}

        {reset && (
          <Button
            style={{ marginLeft: '15px' }}
            onClick={() => {
              resetFields();
              handleSearch();
            }}
          >
            重置
          </Button>
        )}
      </FormItem>
    </Form>
  );
};

Filter.propTypes = {};

// interface FormState {
//   name:string
//   onValuesChange:Function
//   [key:string]:any
// }

// @ts-ignore
// export const Filter: any = Form.create({
//   name: "Filter",
//   // onFieldsChange(props, changedFields) {
//   /** 有多少个item会执行多少次 */
//   //   props.onChange && props.onChange(changedFields);
//   // },
//   // mapPropsToFields(props) {
//   //   // 对props做处理
//   //   console.log(props);
//   // },
//   onValuesChange: (props: any, values: any) => {
//     /** 只会执行一次 */
//     props.onChange && props.onChange(values);
//   },
// })(Search);
