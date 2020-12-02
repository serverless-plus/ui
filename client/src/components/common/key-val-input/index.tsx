import React, { ReactNode, useState } from 'react';
import { Tooltip, Form, Space, Input, Button, Modal, Select } from 'antd';
import { InfoCircleOutlined, DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { API_METHODS } from '@/configs/base/apigw';
import { CDN_AREA } from '@/configs/base/cdn';

type KeyValInputProps = {
  form: FormInstance;
  editForm?: ReactNode;
  editFormInstance?: FormInstance;
  normalizeEditForm?: (v: any) => any;
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
  isCdn?: boolean;
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
    isCdn = false,
    form,
    editForm,
    editFormInstance,
    normalizeEditForm,
  } = props;

  const [dialogShow, setDialogShow] = useState(false);
  const [fieldKey, setFieldKey] = useState(0);

  const showFormDialog = (field: { [prop: string]: any }) => {
    setDialogShow(true);
    const curField = form.getFieldValue(name);
    const current = curField[field.fieldKey];

    editFormInstance?.setFieldsValue(current);

    setFieldKey(field.fieldKey);
  };

  const editFormSubmit = () => {
    editFormInstance?.submit();
    let current = editFormInstance?.getFieldsValue();
    if (normalizeEditForm) {
      current = normalizeEditForm(current);
    }
    console.log('current', current);


    const oldFormValues = form.getFieldsValue();
    oldFormValues[name][fieldKey] = current;
    form.setFieldsValue(oldFormValues);
    setDialogShow(false);
  };

  const removeField = (fieldKey: number) => {
    const oldFormValues = form.getFieldsValue();
    oldFormValues[name].splice(fieldKey, 1);

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
                  ) : isCdn ? (
                    <Select placeholder="Method" style={{ width: '155px' }}>
                      {CDN_AREA.map((item: string) => (
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
          title={`${label}`}
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
