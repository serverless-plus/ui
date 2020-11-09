import React, { useState, useEffect, useRef } from 'react';
import { useMount } from 'react-use';
import { Row, Col, Button, Form, Card, Switch } from 'antd';
import { SelectValue } from 'antd/lib/select';
import YAML from 'js-yaml';
import { Doc } from 'codemirror';
import CodeMirror from '../codemirror';
import Hotkeys from 'hotkeys-js';

import { COMPONENT_LIST, COMPONENTS, getInputs, ComponentName } from '@/configs/parameters';
import { deepClone, parseConfig, flatConfig } from '@/utils';
import { renderConfigs } from '@/components/render-utils';
import ComponentSelect from '@/components/component-select';

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
  const [hideOptional, setHideOptional] = useState(false);
  const [componentName, setComponentName] = useState(initCompName);
  const [componentConfig, setComponentConfig] = useState(getInputs(initCompName as ComponentName));
  const codeEditorRef = useRef(null);

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

  useMount(() => {
    Hotkeys.filter = () => {
      return true;
    };
    Hotkeys('ctrl+s,command+s', event => {
      if (codeEditorRef.current) {
        // @ts-ignore
        const editor: Editor = codeEditorRef.current?.editor;
        const yamlCode = editor.getValue();
        const jsCode = YAML.load(yamlCode);

        // reupdate config form
        form.setFieldsValue(flatConfig(jsCode));

        // submit yaml code to generate serverless.yml
        if (typeof onSubmit === 'function') {
          onSubmit(yamlCode);
        }
      }

      // prevent default page event
      event.preventDefault();
    });
  });

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

  const onCodeChange = (instance: Doc) => {
    const yamlCode = instance.getValue();
    const jsCode = YAML.load(yamlCode);

    form.setFieldsValue(flatConfig(jsCode));
  };

  const showRequiredChange = (checked: boolean) => {
    setHideOptional(checked);
  };

  return (
    <>
      <Row>
        <Col xs={24} sm={24}>
          <Card title="" bordered={false} bodyStyle={{ padding: '5px 10px' }}>
            隐藏可选项{' '}
            <Switch
              onChange={showRequiredChange}
              checkedChildren="开启"
              unCheckedChildren="关闭"
              defaultChecked={false}
            />
          </Card>
        </Col>
      </Row>
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
            {renderConfigs({ parameters: COMPONENTS, form, hideOptional })}
            {renderConfigs({ parameters: componentConfig, form, hideOptional })}
            <Form.Item {...FormTailLayout}>
              <Button type="primary" htmlType="submit">
                Generate
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} sm={12}>
          <CodeMirror
            ref={codeEditorRef}
            code={code}
            onChange={onCodeChange}
            options={{
              theme: 'monokai',
              keyMap: 'sublime',
              mode: 'yaml',
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export { ConfigForm };
