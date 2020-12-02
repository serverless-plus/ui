import React, { ReactNode, useState } from 'react';
import { Form, Select, Space, Button, Modal, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@/components/common/format-message';
import { TRIGGER_TYPES } from '@/configs/base/trigger';
import TriggerForm from './trigger-form';

type InputsProps = {
  name: string;
  label?: string | ReactNode;
  form: FormInstance;
};

const TriggerInput = (props: InputsProps) => {
  const { name, label, form } = props;
  const [editForm] = Form.useForm();

  const [dialogShow, setDialogShow] = useState(false);
  const [fieldKey, setFieldKey] = useState(0);

  const showFormDialog = (index: number) => {
    const curField = form.getFieldValue(name);
    const current = curField[index];
    editForm.setFieldsValue(current);
    setDialogShow(true);
    setFieldKey(index);
  };

  const addTrigger = () => {
    const oldFormValues = form.getFieldsValue();
    const newTrigger = {
      type: 'timer',
      qualifier: '$DEFAULT',
    };
    if (!oldFormValues[name]) {
      oldFormValues[name] = [];
    }
    oldFormValues[name].push(newTrigger);
    form.setFieldsValue(oldFormValues);
    showFormDialog(oldFormValues[name].length - 1);
  };

  const editFormSubmit = () => {
    const current = editForm.getFieldsValue();
    const oldFormValues = form.getFieldsValue();
    if (!oldFormValues[name]) {
      oldFormValues[name] = [];
    }
    if (current) {
      oldFormValues[name][fieldKey] = current;
      form.setFieldsValue(oldFormValues);
    }
    setDialogShow(false);
  };

  const removeField = (fieldKey: number) => {
    const oldFormValues = form.getFieldsValue();
    oldFormValues[name].splice(fieldKey, 1);
    form.setFieldsValue(oldFormValues);
  };

  const onFinish = (values: any) => {
    console.log('Success: ', values);
  };

  return (
    <Form.Item label={label}>
      <Form.List name={name}>
        {fields => (
          <>
            {fields.map((field: any, index) => {
              const values = form.getFieldValue(name);
              const trigger = values[field.fieldKey];
              return (
                <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item className="form-list-item">
                    <Input
                      placeholder="Please input qualifier"
                      disabled={true}
                      style={{ width: '155px' }}
                      value={trigger.qualifier}
                    />
                  </Form.Item>
                  <Form.Item
                    className="form-list-item"
                    rules={[{ required: true, message: `Missing trigger type` }]}
                  >
                    <Select
                      placeholder="Method"
                      style={{ width: '155px' }}
                      disabled={true}
                      value={trigger.type}
                    >
                      {TRIGGER_TYPES.map((item: string) => (
                        <Select.Option key={item} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <EditOutlined
                    onClick={() => {
                      showFormDialog(index);
                    }}
                  />

                  <DeleteOutlined
                    onClick={() => {
                      removeField(index);
                    }}
                  />
                </Space>
              );
            })}
          </>
        )}
      </Form.List>

      <Button
        type="dashed"
        onClick={() => {
          addTrigger();
        }}
        block
        icon={<PlusOutlined />}
      >
        <FormattedMessage id="faas.trigger.addBtn" />
      </Button>
      <Modal
        title={<FormattedMessage id="faas.trigger.config" />}
        visible={dialogShow}
        onOk={() => {
          editFormSubmit();
        }}
        onCancel={() => {
          setDialogShow(false);
        }}
      >
        <TriggerForm form={editForm} onFinish={onFinish} />
      </Modal>
    </Form.Item>
  );
};

export default TriggerInput;
