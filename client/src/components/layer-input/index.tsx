import React, { ReactNode } from 'react';
import { useIntl } from 'umi';
import KeyValInput from '@/components/common/key-val-input';
import { FormInstance } from 'antd/lib/form';

type EnvInputsProps = {
  form: FormInstance;
  name: string;
  label?: string | ReactNode;
};

const EnvInputs = (props: EnvInputsProps) => {
  const intl = useIntl();
  const { name, label, form } = props;
  const valNormalize = (value: any) => {
    return +value;
  };
  return (
    <KeyValInput
      form={form}
      label={label}
      name={name}
      valNormalize={valNormalize}
      keyField="name"
      keyTip="Layer Name"
      keyPlaceholder="Name"
      valField="version"
      valTip="Layer Version"
      valPlaceholder="Version"
      buttonText={intl.formatMessage({
        id: 'faas.layers.addBtn',
        defaultMessage: 'Add',
      })}
    />
  );
};

export default EnvInputs;
