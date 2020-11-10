import React, { ReactNode } from 'react';
import { Form, Select } from 'antd';
import { SelectValue } from 'antd/lib/select';

type SelectProps = {
  name: string;
  label: string | ReactNode;
  list: string[];
  onChange?: (value: SelectValue) => void;
};

const ComponentSelect = (props: SelectProps) => {
  const { name, label, list = [], onChange } = props;
  return (
    <Form.Item name={name} label={label}>
      <Select onChange={onChange}>
        {list.map((item: string) => (
          <Select.Option value={item} key={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default ComponentSelect;
