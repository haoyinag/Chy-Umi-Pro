import React, { createContext, PureComponent } from 'react';

import { Table, Input, Form } from 'antd';

const EditableContext: any = createContext(null);

/** 可以编辑tr--上下文组件 */
class EditableRow extends PureComponent<any, any> {
  render() {
    const { form, index, ...props } = this.props;
    return (
      <EditableContext.Provider value={form}>
        {/* 使用原生tr标签替代antd原有tr标签，获取上下文 */}
        <tr {...props} />
      </EditableContext.Provider>
    );
  }
}
// @ts-ignore
const EditableFormRow: any = Form.create()(EditableRow);
interface Props {
  title: any;
  record: any;
  dataIndex: any;
  handleSave: any;
  [key: string]: any;
}

/** 可编辑列--对应的formItem元素 */
class EditableCell extends PureComponent<Props> {
  form: any = null;

  save = (e: any) => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error: any, values: any) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }

      handleSave({ ...record, ...values });
    });
  };

  renderCell = (form: any) => {
    this.form = form;
    const { dataIndex, record, title } = this.props;
    return (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: false,
              message: `请填写${title}.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

export class Nutrition extends PureComponent<any> {
  constructor(props: any) {
    super(props);
    // @ts-ignore
    this.columns = [
      {
        title: '项目',
        dataIndex: 'itemName',
        width: '30%',
      },
      {
        title: '每100g',
        dataIndex: 'weightName',
        editable: true,
      },
      {
        title: 'NRV%',
        dataIndex: 'nrvName',
        editable: true,
      },
    ];

    this.state = {
      dataSource: this.props.dataSource || [],
    };
  }

  componentWillReceiveProps(preprops: any) {
    this.setState({
      dataSource: preprops.dataSource || [],
    });
  }

  handleSave = (row: any) => {
    const { getData } = this.props;
    // @ts-ignore
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(
      (item) => row.spuNutritionId === item.spuNutritionId,
    );
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    this.setState({ dataSource: newData });
    getData && getData(newData);
  };

  render() {
    // @ts-ignore
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    // @ts-ignore
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        // @ts-ignore
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <Table
        bordered
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        components={components}
        rowClassName={() => 'editable-row'}
        style={{ maxWidth: '600px', margin: '10px 0' }}
      />
    );
  }
}
