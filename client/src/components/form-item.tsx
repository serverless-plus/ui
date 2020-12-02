import React from 'react';
import { Select, Input, InputNumber, Form, Radio, Tooltip, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@/components/common/format-message';
import { Rule } from 'rc-field-form/es/interface';
import { connect, Dispatch, useIntl } from 'umi';
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
import TriggerInput from './trigger-input';
import CdnInput from './cdn-input';

import { AnyObject } from '@/typings';

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
  editable?: boolean;
  clearable?: boolean;
  requiredMsg?: string;
};

const FormItem = (props: FormItemProps) => {
  const intl = useIntl();
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
    requiredMsg = 'required',
    disabled = false,
    form,
    action,
    onChange,
    dispatch,
    dependField,
    editable,
    clearable = false,
  } = props;

  const formatMessage = (id: string) => {
    return intl.formatMessage({ id, defaultMessage: id });
  };

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
      message: formatMessage(requiredMsg),
    } as Rule);
  }
  if (regex) {
    rules.push({
      type,
      pattern: regex,
      message: `${label} is invalid!`,
    } as Rule);
  }
  const deps = [];
  if (dependField) {
    deps.push(dependField);
  }

  switch (ui) {
    case 'Input':
      component = (
        <Form.Item
          name={name}
          label={formatMessage(label)}
          rules={rules}
          dependencies={deps}
          normalize={normalize}
        >
          <Input
            disabled={disabled}
            allowClear={clearable}
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
    case 'TextArea':
      component = (
        <Form.Item
          name={name}
          label={formatMessage(label)}
          rules={rules}
          dependencies={deps}
          normalize={normalize}
        >
          <Input.TextArea
            disabled={disabled}
            onChange={e => {
              fieldItemChange(e.target.value);
            }}
          />
        </Form.Item>
      );
      break;
    case 'InputNumber':
      component = (
        <Form.Item name={name} label={formatMessage(label)} rules={rules}>
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
        <Form.Item name={name} label={formatMessage(label)} rules={rules}>
          <Select
            disabled={disabled}
            allowClear={clearable}
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
        <Form.Item name={name} label={formatMessage(label)} rules={rules}>
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
    case 'Switch':
      component = (
        <Form.Item name={name} label={formatMessage(label)} rules={rules} valuePropName="checked">
          <Switch
            checkedChildren={<FormattedMessage id={allows[0].label} />}
            unCheckedChildren={<FormattedMessage id={allows[1].label} />}
          />
        </Form.Item>
      );
      break;
    case 'MultiSelect':
      component = (
        <Form.Item name={name} label={formatMessage(label)} rules={rules}>
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
      component = <EnvInput name={name} label={formatMessage(label)} form={form} />;
      break;
    case 'ApiInput':
      component = (
        <ApiInput name={name} label={formatMessage(label)} form={form} editable={editable} />
      );
      break;
    case 'TagInput':
      component = <TagInput name={name} label={formatMessage(label)} form={form} />;
      break;
    case 'VpcSelect':
      component = (
        <VpcSelect
          name={name}
          label={formatMessage(label)}
          dependencies={deps}
          form={form}
          onChange={onChange}
        />
      );
      break;
    case 'VpcInput':
      component = <VpcInput name={name} label={formatMessage(label)} form={form} />;
      break;
    case 'LayerInput':
      component = <LayerInput name={name} label={formatMessage(label)} form={form} />;
      break;
    case 'CfsInput':
      component = <CfsInput name={name} label={formatMessage(label)} form={form} />;
      break;
    case 'ExcludeInput':
      component = <ExcludeInput name={name} label={formatMessage(label)} form={form} />;
      break;
    case 'ClsInput':
      component = <ClsInput name={name} label={formatMessage(label)} form={form} />;
      break;
    case 'TriggerInput':
      component = <TriggerInput name={name} label={formatMessage(label)} form={form} />;
      break;
    case 'CdnInput':
      component = <CdnInput name={name} label={formatMessage(label)} form={form} />;
      break;
    default:
      component = (
        <Form.Item
          name={name}
          label={formatMessage(label)}
          rules={rules}
          dependencies={deps}
          normalize={normalize}
        >
          <Input
            disabled={disabled}
            allowClear={clearable}
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
  global,
}))(FormItem);
