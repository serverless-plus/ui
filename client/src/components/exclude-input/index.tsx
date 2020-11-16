import React, { ReactNode } from 'react';
import ValInput from '@/components/common/val-input';
import { useIntl } from 'umi';
import { FormInstance } from 'antd/es/form/Form';

type InputsProps = {
  form: FormInstance;
  name: string;
  label?: string | ReactNode;
};

const ExcludeInput = (props: InputsProps) => {
  const intl = useIntl();
  const { name, label, form } = props;
  return (
    <ValInput
      form={form}
      label={label}
      name={name}
      valField="val"
      valTip="Exclude Items"
      buttonText={intl.formatMessage({
        id: 'app.src.exclude.addBtn',
      })}
    />
  );
};

export default ExcludeInput;
