import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form } from 'antd';
import { SelectValue } from 'antd/lib/select';
import YAML from 'js-yaml';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import { COMPONENT_LIST, COMPONENTS, getInputs, ComponentName } from '../../configs';
import { renderConfigs } from '../render-utils';
import { deepClone, parseConfig } from '../../utils';
import ComponentSelect from '../component-select';

import './index.less';

const FormLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 15,
    },
  },
};

const FormTailLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 15, offset: 7 } },
};

type ConfigFormProps = {
  onSubmit: any;
  initCompName?: string;
  initJs?: { [propName: string]: any };
  initYaml?: string;
  [propName: string]: any;
};

const ConfigForm = (props: ConfigFormProps) => {
  const { onSubmit, initCompName = 'websocket', initYaml, initJs, ...restProps } = props;
  const [form] = Form.useForm();
  const [code, setCode] = useState(initYaml);
  const [componentName, setComponentName] = useState(initCompName);
  const [componentConfig, setComponentConfig] = useState(getInputs(initCompName as ComponentName));

  useEffect(() => {
    const curComponent = getInputs(componentName as ComponentName);
    setComponentConfig(curComponent);
  }, [componentName]);

  useEffect(() => {
    form.setFieldsValue(initJs);
  }, [form, initJs]);

  useEffect(() => {
    setComponentName(initCompName);
  }, [initCompName]);

  useEffect(() => {
    setCode(initYaml);
  }, [initYaml]);

  const onFinish = async (values: any) => {
    const jsCode = parseConfig(deepClone(values));
    const yamlCode = YAML.dump(jsCode);

    setCode(yamlCode);
    if (typeof onSubmit === 'function') {
      await onSubmit(yamlCode);
    }
  };

  const compChange = (value: SelectValue) => {
    setComponentName(value as string);
  };

  return (
    <Row {...restProps}>
      <Col xs={24} sm={12}>
        <Form
          {...FormLayout}
          form={form}
          name="config"
          onFinish={onFinish}
          initialValues={initJs}
          scrollToFirstError
        >
          <ComponentSelect
            list={COMPONENT_LIST}
            name="component"
            label="Component"
            onChange={compChange}
          />
          {renderConfigs(COMPONENTS, form)}
          {renderConfigs(componentConfig, form)}
          <Form.Item {...FormTailLayout}>
            <Button type="primary" htmlType="submit">
              Generate
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={24} sm={12}>
        <CodeMirror
          value={code}
          options={{
            theme: 'monokai',
            keyMap: 'sublime',
            mode: 'yaml',
          }}
        />
      </Col>
    </Row>
  );
};

export { ConfigForm };
