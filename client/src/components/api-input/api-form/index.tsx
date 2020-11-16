import React from 'react';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { API_CONFIG } from '@/configs/base/apigw';
import { renderConfigs } from '@/components/render-utils';

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
  return (
    <Form
      {...FormLayout}
      name="apiForm"
      form={form}
      initialValues={{ path: '/', method: 'ANY', enableCORS: true }}
      onFinish={onFinish}
    >
      {renderConfigs({ parameters: API_CONFIG, form })}
    </Form>
  );
};

export default ApiForm;
