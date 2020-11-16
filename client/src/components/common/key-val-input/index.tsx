import React, { ReactNode, useState } from 'react';
import { Tooltip, Form, Space, Input, Button, Modal, Select } from 'antd';
import { InfoCircleOutlined, DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { API_METHODS } from '@/configs/base/apigw';

type KeyValInputProps = {
  form: FormInstance;
  editForm?: ReactNode;
  editFormInstance?: FormInstance;
  name: string;
  label?: string | ReactNode;
  keyField: string;
  keyTip: string;
  keyPlaceholder?: string;
  valField: string;
  valTip: string;
  valPlaceholder?: string;
  buttonText?: string;
  editable?: boolean;
  isApi?: boolean;
  valNormalize?: (val: any) => any;
};

const KeyValInput = (props: KeyValInputProps) => {
  const {
    name,
    label,
    keyField,
    keyTip,
    keyPlaceholder = 'Key',
    valField,
    valTip,
    valPlaceholder = 'Value',
    valNormalize,
    buttonText = 'Add',
    editable = false,
    isApi = false,
    form,
    editForm,
    editFormInstance,
  } = props;

  const [dialogShow, setDialogShow] = useState(false);
  const [fieldKey, setFieldKey] = useState(0);

  const showFormDialog = (field: { [prop: string]: any }) => {
    setDialogShow(true);
    console.log(field);
    console.log('form', form);
    console.log('name', name);

    const curField = form.getFieldValue(name);
    const current = curField[field.fieldKey];

    console.log('current', current);

    editFormInstance?.setFieldsValue(current);

    setFieldKey(field.fieldKey);
  };

  const editFormSubmit = () => {
    const current = editFormInstance?.getFieldsValue();
    const oldFormValues = form.getFieldsValue();
    oldFormValues[name][fieldKey] = current;
    form.setFieldsValue(oldFormValues);
    console.log('oldFormValues', oldFormValues);
    setDialogShow(false);
  };

  const removeField = (fieldKey: number) => {
    const oldFormValues = form.getFieldsValue();
    oldFormValues[name].splice(fieldKey, 1);
    console.log('oldFormValues', oldFormValues);

    form.setFieldsValue(oldFormValues);
  };

  const normalizeMethod = (value: any) => {
    if (valNormalize && typeof valNormalize === 'function') {
      return valNormalize(value);
    }
    return value;
  };
  return (
    <Form.Item label={label}>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  className="form-list-item"
                  {...field}
                  name={[field.name, keyField]}
                  fieldKey={[field.fieldKey, 'first']}
                  rules={[{ required: true, message: `Missing ${keyField}` }]}
                >
                  <Input
                    placeholder={keyPlaceholder}
                    style={{ width: '155px' }}
                    suffix={
                      <Tooltip title={keyTip}>
                        <InfoCircleOutlined className="info-icon" />
                      </Tooltip>
                    }
                  />
                </Form.Item>
                <Form.Item
                  className="form-list-item"
                  {...field}
                  name={[field.name, valField]}
                  fieldKey={[field.fieldKey, 'last']}
                  rules={[{ required: true, message: `Missing ${valField}` }]}
                  normalize={normalizeMethod}
                >
                  {/* For ApiInput, method should be a Select element */}
                  {isApi ? (
                    <Select placeholder="Method" style={{ width: '155px' }}>
                      {API_METHODS.map((item: string) => (
                        <Select.Option key={item} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      placeholder={valPlaceholder}
                      style={{ width: '155px' }}
                      suffix={
                        <Tooltip title={valTip}>
                          <InfoCircleOutlined className="info-icon" />
                        </Tooltip>
                      }
                    />
                  )}
                </Form.Item>
                {editable && (
                  <EditOutlined
                    onClick={() => {
                      showFormDialog(field);
                    }}
                  />
                )}

                <DeleteOutlined
                  onClick={() => {
                    removeField(fieldKey);
                    remove(field.name);
                  }}
                />
              </Space>
            ))}
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              {buttonText}
            </Button>
          </>
        )}
      </Form.List>
      {editable && (
        <Modal
          title={`${label} config`}
          visible={dialogShow}
          onOk={() => {
            editFormSubmit();
          }}
          onCancel={() => {
            setDialogShow(false);
          }}
        >
          {editForm}
        </Modal>
      )}
    </Form.Item>
  );
};

export default KeyValInput;
