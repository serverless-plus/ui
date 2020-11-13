import React, { ReactNode } from 'react';
import { FormInstance } from 'antd/lib/form';
import { useIntl } from 'umi';
import { Form, Row, Col, Input } from 'antd';

type VpcSelectProps = {
  form: FormInstance;
  name: string;
  label?: string | ReactNode;
  [propName: string]: any;
};

const VpcInput = (props: VpcSelectProps) => {
  const intl = useIntl();
  const { name, label } = props;

  return (
    <Form.Item label={label}>
      <Row>
        <Col span={12}>
          <Form.Item name={`${name}.vpcId`} style={{ width: '100%' }}>
            <Input
              placeholder={intl.formatMessage({
                id: 'faas.vpc.input',
              })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={`${name}.subnetId`} style={{ width: '100%' }}>
            <Input
              placeholder={intl.formatMessage({
                id: 'faas.subnet.input',
              })}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );
};

export default VpcInput;
