import React, { useState } from 'react';
import { Alert, notification } from 'antd';
import { useMount } from 'react-use';
import { connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';

import { ConfigForm } from '@/components/config-form';
import { getConfig, postConfig } from '@/apis';
import { DEFAULT_CONFIG } from '@/configs';
import { flatConfig } from '@/utils';

import styles from './index.less';

type PageProps = {
  hideOptional: boolean;
  component: string;
  dispatch?: Dispatch;
};
function ConfigPage({ hideOptional, component, dispatch }: PageProps) {
  const [jsCode, setJsCode] = useState(DEFAULT_CONFIG.js);
  const [yamlCode, setYamlCode] = useState(DEFAULT_CONFIG.yaml);

  const initComponent = (v: string) => {
    if (dispatch && v) {
      dispatch({
        type: 'global/COMPONENT_CHANGE',
        payload: {
          component: v,
        },
      });
    }
  };

  useMount(async () => {
    try {
      const config = await getConfig();
      if (config.code === 0) {
        initComponent(config.js.component);
        setJsCode(flatConfig(config.js));
        setYamlCode(config.yaml);
      }
    } catch (e) {}
  });

  const onSubmit = async (code: string) => {
    try {
      const res = await postConfig(code);
      notification.success({
        message: 'Generate Serverless Config',
        description: (
          <>
            <p>Auto create/update serverless.yml in local path:</p>
            <Alert message={res.yamlPath} />
          </>
        ),
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ConfigForm
      onSubmit={onSubmit}
      className={styles.configForm}
      initYaml={yamlCode}
      initJs={jsCode}
      initCompName={component}
      hideOptional={hideOptional}
    />
  );
}

export default connect(({ global }: ConnectState) => ({
  ...global,
}))(ConfigPage);
