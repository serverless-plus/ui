import React, { useState, useEffect, useRef } from 'react';
import { useMount } from 'react-use';
import { Row, Col, Button, Form, Alert } from 'antd';
import { SelectValue } from 'antd/lib/select';
import YAML from 'js-yaml';
import { Doc } from 'codemirror';
import Hotkeys from 'hotkeys-js';
import { FormattedMessage } from 'umi';

import { COMPONENT_LIST, COMMON_CONFIGS, getInputs, ComponentName } from '@/configs';
import { deepClone, parseConfig, flatConfig, cleanEmptyValue } from '@/utils';
import CodeMirror from '@/components/codemirror';
import { renderConfigs } from '@/components/render-utils';
import ComponentSelect from '@/components/component-select';

const FormLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    md: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    md: {
      span: 15,
    },
  },
};

const FormTailLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
    md: { span: 15, offset: 7 },
  },
};

type ConfigFormProps = {
  onSubmit: any;
  initCompName: string;
  initJs?: { [propName: string]: any };
  initYaml?: string;
  [propName: string]: any;
};

const ConfigForm = (props: ConfigFormProps) => {
  const { onSubmit, hideOptional, initCompName, initYaml, initJs, ...restProps } = props;
  const [form] = Form.useForm();
  const [code, setCode] = useState(initYaml);
  const [componentConfig, setComponentConfig] = useState(getInputs(initCompName as ComponentName));
  const codeEditorRef = useRef(null);

  useEffect(() => {
    const curComponent = getInputs(initCompName as ComponentName);
    setComponentConfig(curComponent);
  }, [initCompName]);

  useEffect(() => {
    form.setFieldsValue(initJs);
  }, [form, initJs]);

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
    const jsCode = parseConfig(cleanEmptyValue(deepClone(values)));
    const yamlCode = YAML.dump(jsCode);

    setCode(yamlCode);
    if (typeof onSubmit === 'function') {
      await onSubmit(yamlCode);
    }
  };

  const onFormChange = (values: any, allValues: any) => {
    const jsCode = parseConfig(cleanEmptyValue(deepClone(allValues)));
    const yamlCode = YAML.dump(jsCode);

    setCode(yamlCode);
  };

  const onCodeChange = (instance: Doc) => {
    const yamlCode = instance.getValue();
    const jsCode = YAML.load(yamlCode);

    form.setFieldsValue(flatConfig(jsCode));
  };

  return (
    <>
      <Row style={{ padding: '5px' }}>
        <Col xs={24} sm={24}>
          <Alert
            message={<FormattedMessage id="configs.tips" />}
            type="info"
            showIcon={true}
            closable={true}
          />
        </Col>
      </Row>
      <Row {...restProps}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <Form
            {...FormLayout}
            form={form}
            name="config"
            onFinish={onFinish}
            initialValues={initJs}
            onValuesChange={onFormChange}
            scrollToFirstError
          >
            {/* <ComponentSelect
              list={COMPONENT_LIST}
              name="component"
              label={<FormattedMessage id="app.component" />}
              onChange={compChange}
            /> */}
            {renderConfigs({ parameters: COMMON_CONFIGS, form, hideOptional })}
            {renderConfigs({ parameters: componentConfig, form, hideOptional })}
            <Form.Item {...FormTailLayout}>
              <Button type="primary" htmlType="submit">
                <FormattedMessage id="generate" />
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
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
