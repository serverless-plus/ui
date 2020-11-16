import React, { ReactNode } from 'react';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useIntl } from 'umi';
import KeyValInput from '@/components/common/key-val-input';
import CfsForm from './cfs-form';

type InputsProps = {
  name: string;
  label?: string | ReactNode;
  form: FormInstance;
};

const CfsInput = (props: InputsProps) => {
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
      keyField="cfsId"
      keyPlaceholder="cfsId"
      keyTip="CFS ID"
      valField="mountInsId"
      valPlaceholder="mountInsId"
      valTip="Mount Instance ID"
      editable={true}
      editForm={<CfsForm form={editForm} onFinish={onFinish} />}
      editFormInstance={editForm}
      buttonText={intl.formatMessage({
        id: 'faas.cfs.addBtn',
      })}
    />
  );
};

export default CfsInput;
