import React, { useState } from 'react';
import { Tooltip, Form, Space, Input, Button, Modal, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { InfoCircleOutlined, DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import ApiForm from '../api-form';
import { API_METHODS } from '../../configs/base/apigw';

type ApiInputsProps = {
  name: string;
  label?: string;
  form: FormInstance;
};

const ApiInputs = (props: ApiInputsProps) => {
  const { name, label, form } = props;
  const [dialogShow, setDialogShow] = useState(false);
  const [apiForm] = Form.useForm();
  const [fieldKey, setFieldKey] = useState(0);

  const showApiDialog = (field: { [prop: string]: any }) => {
    setDialogShow(true);
    console.log(field);
    console.log('form', form);
    console.log('name', name);

    const apis = form.getFieldValue(name);
    const curApi = apis[field.fieldKey];

    console.log('curApi', curApi);

    apiForm.setFieldsValue(curApi);
    setFieldKey(field.fieldKey);
  };

  const apiFormSubmit = () => {
    const curApi = apiForm.getFieldsValue();
    const oldFormValues = form.getFieldsValue();
    oldFormValues[name][fieldKey] = curApi;
    form.setFieldsValue(oldFormValues);
    console.log('oldFormValues', oldFormValues);
    setDialogShow(false);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const removeField = (fieldKey: number) => {
    const oldFormValues = form.getFieldsValue();
    oldFormValues[name].splice(fieldKey, 1);
    console.log('oldFormValues', oldFormValues);

    form.setFieldsValue(oldFormValues);
  };

  return (
    <Form.Item label={label}>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 5 }} align="baseline">
                <Form.Item
                  className="form-list-item"
                  {...field}
                  name={[field.name, 'path']}
                  fieldKey={[field.fieldKey, 'path']}
                  rules={[{ required: true, message: 'Missing path' }]}
                >
                  <Input
                    placeholder="Path"
                    suffix={
                      <Tooltip title="API Path">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip>
                    }
                  />
                </Form.Item>
                <Form.Item
                  className="form-list-item"
                  {...field}
                  name={[field.name, 'method']}
                  fieldKey={[field.fieldKey, 'method']}
                  rules={[{ required: true, message: 'Missing method' }]}
                  style={{ width: '100px' }}
                >
                  <Select placeholder="Method">
                    {API_METHODS.map((item: string) => (
                      <Select.Option key={item} value={item}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <EditOutlined
                  onClick={() => {
                    showApiDialog(field);
                  }}
                />
                <DeleteOutlined
                  onClick={() => {
                    removeField(fieldKey);
                    remove(field.name);
                  }}
                />
              </Space>
            ))}
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add API
            </Button>
          </>
        )}
      </Form.List>
      <Modal
        title="API Config"
        visible={dialogShow}
        onOk={() => {
          apiFormSubmit();
        }}
        onCancel={() => {
          setDialogShow(false);
        }}
      >
        <ApiForm form={apiForm} onFinish={onFinish} />
      </Modal>
    </Form.Item>
  );
};

export default ApiInputs;
