import React from 'react';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { CDN_CONFIG } from '@/configs/base/cdn';
import { renderConfigs } from '@/components/render-utils';
import { deepClone } from '@/utils';

const FormLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};

type FormProps = {
  form: FormInstance;
  onFinish: (val: any) => void;
};

const CdnForm = (props: FormProps) => {
  const { form, onFinish } = props;

  return (
    <Form
      {...FormLayout}
      name="cdnForm"
      form={form}
      initialValues={{ area: 'mainland' }}
      onFinish={onFinish}
    >
      {renderConfigs({ parameters: CDN_CONFIG, form })}
    </Form>
  );
};

export default CdnForm;
