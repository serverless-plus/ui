import React, { ReactNode } from 'react';
import KeyValInput from '@/components/common/key-val-input';
import { useIntl } from 'umi';
import { FormInstance } from 'antd/es/form/Form';

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
      keyTip="Environment Variable Key"
      valField="value"
      valTip="Environment Variable Value"
      buttonText={intl.formatMessage({
        id: 'faas.environments.addBtn',
        defaultMessage: 'Add',
      })}
    />
  );
};

export default EnvInputs;
