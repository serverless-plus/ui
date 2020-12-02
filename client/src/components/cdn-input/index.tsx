import React, { ReactNode } from 'react';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useIntl } from 'umi';
import KeyValInput from '@/components/common/key-val-input';
import CdnForm from './cdn-form';
import { deepClone } from '@/utils';

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

  const normalizeForm = (values: any) => {
    const newValues = deepClone(values);
    // if not config certId, delete all configs about https
    if (!values['https.certInfo.certId']) {
      delete newValues['https.certInfo.certId'];
      delete newValues['https.http2'];
      delete newValues['forceRedirect.redirectStatusCode'];
      delete newValues['forceRedirect.redirectType'];
    }
    return newValues;
  };

  return (
    <KeyValInput
      form={form}
      label={label}
      name={name}
      keyField="domain"
      keyPlaceholder="Domain"
      keyTip="Cdn Domain"
      valField="area"
      valPlaceholder="Area"
      valTip="CDN Area"
      isCdn={true}
      editable={true}
      editForm={<CdnForm form={editForm} onFinish={onFinish} />}
      normalizeEditForm={normalizeForm}
      editFormInstance={editForm}
      buttonText={intl.formatMessage({
        id: 'website.cdn.addBtn',
        defaultMessage: 'Add',
      })}
    />
  );
};

export default CfsInput;
