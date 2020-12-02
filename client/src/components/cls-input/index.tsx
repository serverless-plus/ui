import React, { ReactNode } from 'react';
import { FormInstance } from 'antd/lib/form';
import { useIntl } from 'umi';
import { Form, Row, Col, Input } from 'antd';

type Props = {
  form: FormInstance;
  name: string;
  label?: string | ReactNode;
  [propName: string]: any;
};

const ClsInput = (props: Props) => {
  const intl = useIntl();
  const { name, label } = props;

  return (
    <Form.Item label={label}>
      <Row>
        <Col span={12}>
          <Form.Item name={`${name}.logsetId`} style={{ width: '100%' }}>
            <Input
              placeholder={intl.formatMessage({
                id: 'faas.cls.logsetId.input',
              })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={`${name}.topicId`} style={{ width: '100%' }}>
            <Input
              placeholder={intl.formatMessage({
                id: 'faas.cls.topicId.input',
                defaultMessage: '',
              })}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );
};

export default ClsInput;
