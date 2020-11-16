import React from 'react';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { CFS_CONFIG } from '@/configs/base/faas';
import { renderConfigs } from '@/components/render-utils';

const FormLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};

type FormProps = {
  form: FormInstance;
  onFinish: (val: any) => void;
};

const CfsForm = (props: FormProps) => {
  const { form, onFinish } = props;
  return (
    <Form
      {...FormLayout}
      name="cfsForm"
      form={form}
      initialValues={{ cfsId: '', mountInsId: '', localMountDir: '/mnt/', remoteMountDir: '/' }}
      onFinish={onFinish}
    >
      {renderConfigs({ parameters: CFS_CONFIG, form })}
    </Form>
  );
};

export default CfsForm;
