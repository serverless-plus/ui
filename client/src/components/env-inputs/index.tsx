import React from 'react';
import { Tooltip, Form, Space, Input, Button } from 'antd';
import { InfoCircleOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

type EnvInputsProps = {
  name: string;
  label?: string;
};

type EnvValue = {
  [prop: string]: any;
};

const EnvInputs = (props: EnvInputsProps) => {
  const { name, label } = props;
  const normalize = (value: EnvValue[]) => {
    console.log('++++++', value);

    return value;
  };
  return (
    <Form.Item label={label} name={name} normalize={normalize}>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  className="form-list-item"
                  {...field}
                  name={[field.name, 'envKey']}
                  fieldKey={[field.fieldKey, 'first']}
                  rules={[{ required: true, message: 'Missing key' }]}
                >
                  <Input
                    placeholder="Key"
                    suffix={
                      <Tooltip title="Environment Variable Key">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip>
                    }
                  />
                </Form.Item>
                <Form.Item
                  className="form-list-item"
                  {...field}
                  name={[field.name, 'envVal']}
                  fieldKey={[field.fieldKey, 'last']}
                  rules={[{ required: true, message: 'Missing value' }]}
                >
                  <Input
                    placeholder="Value"
                    suffix={
                      <Tooltip title="Environment Variable Value">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip>
                    }
                  />
                </Form.Item>
                <DeleteOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add Environment Variables
            </Button>
          </>
        )}
      </Form.List>
    </Form.Item>
  );
};

export default EnvInputs;
