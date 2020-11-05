import React from 'react';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { API_CONFIG } from '../../configs/base/apigw';
import { renderConfigs } from '../render-utils';

const ApiFormLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};

type ApiFormProps = {
  form: FormInstance;
  onFinish: (val: any) => void;
};

const ApiForm = (props: ApiFormProps) => {
  const { form, onFinish } = props;
  return (
    <Form
      {...ApiFormLayout}
      name="apiForm"
      form={form}
      initialValues={{ path: '/', method: 'ANY', enableCORS: true }}
      onFinish={onFinish}
    >
      {renderConfigs(API_CONFIG, form)}
    </Form>
  );
};

export default ApiForm;
