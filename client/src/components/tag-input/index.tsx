import React, { ReactNode } from 'react';
import { useIntl } from 'umi';
import KeyValInput from '@/components/common/key-val-input';
import { FormInstance } from 'antd/lib/form';

type InputsProps = {
  form: FormInstance;
  name: string;
  label?: string | ReactNode;
};

const EnvInputs = (props: InputsProps) => {
  const intl = useIntl();
  const { name, label, form } = props;

  return (
    <KeyValInput
      form={form}
      label={label}
      name={name}
      keyField="key"
      keyTip="Tag Key"
      valField="value"
      valTip="Tag Value"
      buttonText={intl.formatMessage({
        id: 'faas.tags.addBtn',
        defaultMessage: 'Add',
      })}
    />
  );
};

export default EnvInputs;
