import React, { ReactNode, useState } from 'react';
import { Tooltip, Form, Space, Input, Button } from 'antd';
import { InfoCircleOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';

type KeyValInputProps = {
  form: FormInstance;
  name: string;
  label?: string | ReactNode;
  valField: string;
  valTip: string;
  valPlaceholder?: string;
  buttonText?: string;
  editable?: boolean;
  isApi?: boolean;
  normalize?: (val: any) => any;
};

const KeyValInput = (props: KeyValInputProps) => {
  const {
    name,
    label,
    valTip,
    valPlaceholder = 'Key',
    normalize,
    buttonText = 'Add',
    form,
  } = props;

  const [fieldKey] = useState(0);

  const removeField = (fieldKey: number) => {
    const oldFormValues = form.getFieldsValue();
    oldFormValues[name].splice(fieldKey, 1);
    console.log('oldFormValues', oldFormValues);

    form.setFieldsValue(oldFormValues);
  };

  const normalizeMethod = (value: any) => {
    if (normalize && typeof normalize === 'function') {
      return normalize(value);
    }
    return value;
  };

  return (
    <Form.Item label={label} name={name}>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  normalize={normalizeMethod}
                  className="form-list-item"
                  {...field}
                  name={[field.name, 'val']}
                  fieldKey={[field.fieldKey, 'first']}
                  rules={[{ required: true, message: `Missing Value` }]}
                >
                  <Input
                    placeholder={valPlaceholder}
                    style={{ width: '320px' }}
                    suffix={
                      <Tooltip title={valTip}>
                        <InfoCircleOutlined className="info-icon" />
                      </Tooltip>
                    }
                  />
                </Form.Item>

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
    </Form.Item>
  );
};

export default KeyValInput;
