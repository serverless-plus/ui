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

// import React, { ReactNode, useState } from 'react';
// import { Tooltip, Form, Space, Input, Button, Modal, Select } from 'antd';
// import { FormInstance } from 'antd/lib/form';
// import { InfoCircleOutlined, DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
// import ApiForm from '@/components/api-input/api-form';
// import { API_METHODS } from '@/configs/base/apigw';

// type ApiInputsProps = {
//   name: string;
//   label?: string | ReactNode;
//   form: FormInstance;
// };

// const ApiInputs = (props: ApiInputsProps) => {
//   const { name, label, form } = props;
//   const [dialogShow, setDialogShow] = useState(false);
//   const [apiForm] = Form.useForm();
//   const [fieldKey, setFieldKey] = useState(0);

//   const showApiDialog = (field: { [prop: string]: any }) => {
//     setDialogShow(true);
//     console.log(field);
//     console.log('form', form);
//     console.log('name', name);

//     const apis = form.getFieldValue(name);
//     const curApi = apis[field.fieldKey];

//     console.log('curApi', curApi);

//     apiForm.setFieldsValue(curApi);
//     setFieldKey(field.fieldKey);
//   };

//   const apiFormSubmit = () => {
//     const curApi = apiForm.getFieldsValue();
//     const oldFormValues = form.getFieldsValue();
//     oldFormValues[name][fieldKey] = curApi;
//     form.setFieldsValue(oldFormValues);
//     console.log('oldFormValues', oldFormValues);
//     setDialogShow(false);
//   };

//   const onFinish = (values: any) => {
//     console.log('Success:', values);
//   };

//   const removeField = (fieldKey: number) => {
//     const oldFormValues = form.getFieldsValue();
//     oldFormValues[name].splice(fieldKey, 1);
//     console.log('oldFormValues', oldFormValues);

//     form.setFieldsValue(oldFormValues);
//   };

//   return (
//     <Form.Item label={label}>
//       <Form.List name={name}>
//         {(fields, { add, remove }) => (
//           <>
//             {fields.map(field => (
//               <Space key={field.key} style={{ display: 'flex', marginBottom: 5 }} align="baseline">
//                 <Form.Item
//                   className="form-list-item"
//                   {...field}
//                   name={[field.name, 'path']}
//                   fieldKey={[field.fieldKey, 'path']}
//                   rules={[{ required: true, message: 'Missing path' }]}
//                 >
//                   <Input
//                     placeholder="Path"
//                     suffix={
//                       <Tooltip title="API Path">
//                         <InfoCircleOutlined className='info-icon' />
//                       </Tooltip>
//                     }
//                   />
//                 </Form.Item>
//                 <Form.Item
//                   className="form-list-item"
//                   {...field}
//                   name={[field.name, 'method']}
//                   fieldKey={[field.fieldKey, 'method']}
//                   rules={[{ required: true, message: 'Missing method' }]}
//                   style={{ width: '100px' }}
//                 >
//                   <Select placeholder="Method">
//                     {API_METHODS.map((item: string) => (
//                       <Select.Option key={item} value={item}>
//                         {item}
//                       </Select.Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//                 <EditOutlined
//                   onClick={() => {
//                     showApiDialog(field);
//                   }}
//                 />
//                 <DeleteOutlined
//                   onClick={() => {
//                     removeField(fieldKey);
//                     remove(field.name);
//                   }}
//                 />
//               </Space>
//             ))}
//             <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
//               Add API
//             </Button>
//           </>
//         )}
//       </Form.List>
//       <Modal
//         title="API Config"
//         visible={dialogShow}
//         onOk={() => {
//           apiFormSubmit();
//         }}
//         onCancel={() => {
//           setDialogShow(false);
//         }}
//       >
//         <ApiForm form={apiForm} onFinish={onFinish} />
//       </Modal>
//     </Form.Item>
//   );
// };

// export default ApiInputs;
