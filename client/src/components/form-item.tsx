import React from 'react';
import { Select, Input, InputNumber, Form, Radio, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'umi';
import { Rule } from 'rc-field-form/es/interface';
import { connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';
import { FormInstance } from 'antd/lib/form';

import EnvInput from './env-input';
import ApiInput from './api-input';
import VpcSelect from './vpc-select';
import VpcInput from './vpc-input';
import TagInput from './tag-input';
import LayerInput from './layer-input';
import CfsInput from './cfs-input';
import ExcludeInput from './exclude-input';
import ClsInput from './cls-input';

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
  console.log('+++++', props);

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
  const normalize = (v: any) => {
    if (type === 'number') {
      return +v;
    }
    return v;
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
        <Form.Item
          name={name}
          label={<FormattedMessage id={label} />}
          rules={rules}
          normalize={normalize}
        >
          <Input
            disabled={disabled}
            onChange={e => {
              fieldItemChange(e.target.value);
            }}
            suffix={
              description ? (
                <Tooltip title={<FormattedMessage id={description} />}>
                  <InfoCircleOutlined className="info-icon" />
                </Tooltip>
              ) : null
            }
          />
        </Form.Item>
      );
      break;
    case 'InputNumber':
      component = (
        <Form.Item name={name} label={<FormattedMessage id={label} />} rules={rules}>
          <InputNumber
            disabled={disabled}
            onChange={v => {
              fieldItemChange(v);
            }}
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
              <Radio value={item.value} key={item.value}>
                {<FormattedMessage id={item.label} />}
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
    case 'EnvInput':
      component = <EnvInput name={name} label={<FormattedMessage id={label} />} form={form} />;
      break;
    case 'ApiInput':
      component = <ApiInput name={name} label={<FormattedMessage id={label} />} form={form} />;
      break;
    case 'TagInput':
      component = <TagInput name={name} label={<FormattedMessage id={label} />} form={form} />;
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
    case 'LayerInput':
      component = <LayerInput name={name} label={<FormattedMessage id={label} />} form={form} />;
      break;
    case 'CfsInput':
      component = <CfsInput name={name} label={<FormattedMessage id={label} />} form={form} />;
      break;
    case 'ExcludeInput':
      component = <ExcludeInput name={name} label={<FormattedMessage id={label} />} form={form} />;
      break;
    case 'ClsInput':
      component = <ClsInput name={name} label={<FormattedMessage id={label} />} form={form} />;
      break;
    default:
      component = (
        <Form.Item
          name={name}
          label={<FormattedMessage id={label} />}
          rules={rules}
          normalize={normalize}
        >
          <Input
            disabled={disabled}
            onChange={e => {
              fieldItemChange(e.target.value);
            }}
            suffix={
              description ? (
                <Tooltip title={<FormattedMessage id={description} />}>
                  <InfoCircleOutlined className="info-icon" />
                </Tooltip>
              ) : null
            }
          />
        </Form.Item>
      );
  }

  return component;
};

export default connect(({ global }: ConnectState) => ({
  region: global.region,
}))(FormItem);
