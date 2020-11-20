import React, { ReactNode } from 'react';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useIntl } from 'umi';
import KeyValInput from '@/components/common/key-val-input';
import ApiForm from './api-form';

type InputsProps = {
  name: string;
  label?: string | ReactNode;
  form: FormInstance;
};

const ApiInput = (props: InputsProps) => {
  const intl = useIntl();
  const { name, label, form } = props;
  const [editForm] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success: ', values);
  };

  return (
    <KeyValInput
      form={form}
      label={label}
      name={name}
      keyField="path"
      keyPlaceholder="Path"
      keyTip="API Path"
      valField="method"
      valPlaceholder="Method"
      valTip="API Method"
      editable={true}
      isApi={true}
      editForm={<ApiForm form={editForm} onFinish={onFinish} />}
      editFormInstance={editForm}
      buttonText={intl.formatMessage({
        id: 'faas.api.addBtn',
      })}
    />
  );
};

export default ApiInput;
