import React from 'react';
import { Select, Input, Form, Radio, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'umi';
import { Rule } from 'rc-field-form/es/interface';
import { connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';
import { FormInstance } from 'antd/lib/form';

import EnvInputs from './env-inputs';
import ApiInputs from './api-inputs';
import VpcSelect from './vpc-select';
import VpcInput from './vpc-input';
import { AnyObject } from './render-utils';

type FormItemProps = {
  type: string;
  allows: any[];
  ui: string;
  name: string;
  label: string;
  description?: string;
  dependField?: string;
  regex?: RegExp;
  required?: boolean;
  disabled?: boolean;
  default: string | string[] | number | number[];
  form: FormInstance;
  action?: { type: string; key: string };
  onChange: (v: any, field: string) => void;
  dispatch?: Dispatch;
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
    action,
    onChange,
    dispatch,
    dependField,
  } = props;
  const fieldItemChange = (v: any) => {
    // you can config `action` field for config parameter to dispatch global state
    if (action && dispatch) {
      const payload: AnyObject = {};
      payload[name] = v;
      dispatch({
        type: action.type,
        payload,
      });
    }
    if (onChange && typeof onChange === 'function') {
      onChange(v, name);
    }
  };
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
        <Form.Item name={name} label={<FormattedMessage id={label} />} rules={rules}>
          <Input
            disabled={disabled}
            onChange={e => {
              fieldItemChange(e.target.value);
            }}
            suffix={
              description ? (
                <Tooltip title={<FormattedMessage id={description} />}>
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              ) : null
            }
          />
        </Form.Item>
      );
      break;
    case 'Select':
      component = (
        <Form.Item name={name} label={<FormattedMessage id={label} />} rules={rules}>
          <Select
            disabled={disabled}
            onChange={v => {
              fieldItemChange(v);
            }}
          >
            {allows.map(item => (
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
        <Form.Item name={name} label={<FormattedMessage id={label} />}>
          <Radio.Group
            onChange={e => {
              fieldItemChange(e.target.value);
            }}
          >
            {allows.map(item => (
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
        <Form.Item name={name} label={<FormattedMessage id={label} />}>
          <Select
            mode="multiple"
            disabled={disabled}
            onChange={v => {
              fieldItemChange(v);
            }}
          >
            {allows.map(item => (
              <Select.Option value={item} key={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      );
      break;
    case 'EnvInputs':
      component = <EnvInputs name={name} label={<FormattedMessage id={label} />} />;
      break;
    case 'ApiInputs':
      component = <ApiInputs name={name} label={<FormattedMessage id={label} />} form={form} />;
      break;
    case 'VpcSelect':
      component = (
        <VpcSelect
          name={name}
          label={<FormattedMessage id={label} />}
          dependField={dependField}
          form={form}
          onChange={onChange}
        />
      );
      break;
    case 'VpcInput':
      component = <VpcInput name={name} label={<FormattedMessage id={label} />} form={form} />;
      break;
    default:
      component = (
        <Form.Item name={name} label={<FormattedMessage id={label} />}>
          <Input
            disabled={disabled}
            onChange={e => {
              fieldItemChange(e.target.value);
            }}
          />
        </Form.Item>
      );
  }

  return component;
};

export default connect(({ global }: ConnectState) => ({
  region: global.region,
}))(FormItem);
