import React from 'react';
import { Select, Input, Form, Radio, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { Rule } from 'rc-field-form/es/interface';
import FileInput from './file-input';
import EnvInputs from './env-inputs';
import ApiInputs from './api-inputs';
import { FormInstance } from 'antd/lib/form';

type FormItemProps = {
  type: string;
  allows: any[];
  ui: string;
  name: string;
  label: string;
  description?: string;
  regex?: RegExp;
  required?: boolean;
  disabled?: boolean;
  default: string | string[] | number | number[];
  form: FormInstance;
};

const FormItem = (props: FormItemProps) => {
  let component;
  const {
    name,
    allows,
    ui,
    label,
    regex,
    type,
    description,
    required = false,
    disabled = false,
    form,
  } = props;
  const rules = [];
  if (required) {
    rules.push({
      required: true,
      message: `Please input ${label}!`,
    } as Rule);
  }
  if (regex) {
    rules.push({
      type,
      pattern: regex,
      message: `${label} is invalid!`,
    } as Rule);
  }

  switch (ui) {
    case 'Input':
      component = (
        <Form.Item name={name} label={label} rules={rules}>
          <Input
            disabled={disabled}
            suffix={
              description ? (
                <Tooltip title={description}>
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              ) : null
            }
          />
        </Form.Item>
      );
      break;
    case 'FileInput':
      component = (
        <Form.Item name={name} label={label} rules={rules}>
          {/* @tslint-ignore */}
          <FileInput />
        </Form.Item>
      );
      break;
    case 'Select':
      component = (
        <Form.Item name={name} label={label}>
          <Select disabled={disabled}>
            {allows.map((item) => (
              <Select.Option value={item} key={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      );
      break;
    case 'Radio':
      component = (
        <Form.Item name={name} label={label}>
          <Radio.Group>
            {allows.map((item) => (
              <Radio value={item} key={item}>
                {String(item)}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      );
      break;
    case 'MultiSelect':
      component = (
        <Form.Item name={name} label={label}>
          <Select mode="multiple" disabled={disabled}>
            {allows.map((item) => (
              <Select.Option value={item} key={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      );
      break;
    case 'EnvInputs':
      component = <EnvInputs name={name} label={label} />;
      break;
    case 'ApiInputs':
      component = <ApiInputs name={name} label={label} form={form} />;
      break;
    default:
      component = (
        <Form.Item name={name} label={label}>
          <Input disabled={disabled} />
        </Form.Item>
      );
  }

  return component;
};

export { FormItem };
