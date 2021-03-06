import React, { ReactNode, useEffect } from 'react';
import { Form, Select, Row, Col } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { FormattedMessage } from '@/components/common/format-message';

type ComposeSelectProps = {
  form: FormInstance;
  name: string;
  region?: string;
  label?: string | ReactNode;
  mainName: string;
  subName: string;
  mainPlaceHolder?: string;
  subPlaceHolder?: string;
  list: any;
  subList: any;
  handleMainChange?: (v: any) => void;
  onChange?: (v: any) => void;
};

const ComposeSelect = (props: ComposeSelectProps) => {
  const {
    form,
    name,
    mainName,
    mainPlaceHolder,
    subName,
    subPlaceHolder,
    label,
    list,
    subList,
    handleMainChange,
    onChange,
  } = props;

  // if list change, clear select value
  useEffect(() => {
    form.resetFields([mainName, subName]);
  }, [form, list, mainName, subName]);

  // if main change, clear sub select
  const mainChange = async (value: string) => {
    form.resetFields([subName]);
    if (handleMainChange) {
      await handleMainChange(value);
    }
  };

  return list && list.length > 0 ? (
    <Form.Item label={label} name={name}>
      <Row>
        <Col span={12}>
          <Form.Item name={mainName} style={{ width: '100%' }}>
            <Select
              allowClear={true}
              onChange={mainChange}
              placeholder={<FormattedMessage id={mainPlaceHolder} />}
            >
              {list.map((item: string) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          {subList.length > 0 && (
            <Form.Item name={subName} style={{ width: '100%' }}>
              <Select
                allowClear={true}
                onChange={onChange}
                placeholder={<FormattedMessage id={subPlaceHolder} />}
              >
                {subList.map((item: string) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Col>
      </Row>
    </Form.Item>
  ) : null;
};

export default ComposeSelect;
