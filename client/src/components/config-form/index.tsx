import React, { useState, useEffect, useRef } from 'react';
import { useMount } from 'react-use';
import { Row, Col, Button, Form, Alert } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import YAML from 'js-yaml';
import { Doc } from 'codemirror';
import Hotkeys from 'hotkeys-js';
import { FormattedMessage } from '@/components/common/format-message';

import { COMMON_CONFIGS, getInputs, getDefaultConfigs, ComponentName } from '@/configs';
import { deepClone, parseConfig, flatConfig, cleanEmptyValue } from '@/utils';
import CodeMirror from '@/components/common/codemirror';
import { renderConfigs } from '@/components/render-utils';
import StartGuide from '@/components/start-guide';

import styles from './index.less';

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

// const FormTailLayout = {
//   wrapperCol: {
//     xs: { span: 24, offset: 0 },
//     sm: { span: 24, offset: 0 },
//     md: { span: 15, offset: 7 },
//   },
// };

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
  const [componentParameters, setComponentParameters] = useState(
    getInputs(initCompName as ComponentName),
  );
  const codeEditorRef = useRef(null);

  useEffect(() => {
    const curParameters = getInputs(initCompName as ComponentName);
    const curDefaultConfigs = getDefaultConfigs(initCompName as ComponentName);

    setComponentParameters(curParameters);
    setCode(curDefaultConfigs.yaml);
    form.setFieldsValue(curDefaultConfigs.js);
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
      {/* guide steps */}
      <StartGuide />
      <Row style={{ padding: '5px' }}>
        <Col xs={24} sm={24}>
          <Alert
            className="configTips"
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
            className="configForm"
            name="config"
            onFinish={onFinish}
            initialValues={initJs}
            onValuesChange={onFormChange}
            scrollToFirstError
          >
            {renderConfigs({ parameters: COMMON_CONFIGS, form, hideOptional })}
            {renderConfigs({ parameters: componentParameters, form, hideOptional })}
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              size="large"
              className={`configButton ${styles.submitButton}`}
              icon={<SaveOutlined />}
            >
              {' '}
              <FormattedMessage id="generate" />
            </Button>
          </Form>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <CodeMirror
            className="configEditor"
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
