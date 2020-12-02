import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { TRIGGER_DEFAULT_CONFIGS, TRIGGER_CONFIG, TRIGGER_TYPES } from '@/configs/base/trigger';
import { TriggerType } from '@/typings';
import { renderConfigs } from '@/components/render-utils';
import { FormattedMessage } from '@/components/common/format-message';

const FormLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};

type FormProps = {
  form: FormInstance;
  onFinish: (val: any) => void;
};

const ApiForm = (props: FormProps) => {
  const { form, onFinish } = props;
  const triggerType = (form.getFieldValue('type') || 'timer') as TriggerType;
  const [configs, setConfigs] = useState(TRIGGER_CONFIG.timer);
  const [defaultConfigs, setDefaultConfigs] = useState(TRIGGER_DEFAULT_CONFIGS.timer);
  const handleTypeChange = (v: TriggerType) => {
    setConfigs(TRIGGER_CONFIG[v] || {});
    setDefaultConfigs(TRIGGER_DEFAULT_CONFIGS[v] || {});

    const oldValues = form.getFieldsValue();
    const newValues = Object.assign(oldValues, TRIGGER_DEFAULT_CONFIGS[v]);
    form.setFieldsValue(newValues);
  };
  useEffect(() => {
    handleTypeChange(triggerType);
  }, [TRIGGER_DEFAULT_CONFIGS, TRIGGER_CONFIG, triggerType]);
  return (
    <Form
      {...FormLayout}
      name="triggerForm"
      form={form}
      initialValues={defaultConfigs}
      onFinish={onFinish}
    >
      <Form.Item
        className="form-list-item"
        name="type"
        label={<FormattedMessage id="faas.trigger.type" />}
        rules={[{ required: true, message: `Missing trigger type` }]}
      >
        <Select placeholder="Type" style={{ width: '155px' }} onChange={handleTypeChange}>
          {TRIGGER_TYPES.map((item: string) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      {renderConfigs({ parameters: configs, form })}
    </Form>
  );
};

export default ApiForm;
