import React, { useState } from 'react';
import { Layout, Alert, Switch, Tooltip, notification } from 'antd';
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
};
function ConfigPage({ hideOptional, component }: PageProps) {
  const [jsCode, setJsCode] = useState(DEFAULT_CONFIG.js);
  const [yamlCode, setYamlCode] = useState(DEFAULT_CONFIG.yaml);

  useMount(async () => {
    try {
      const config = await getConfig();
      console.log('config', config);

      if (config.code === 0) {
        console.log('flatConfig(config.js)', flatConfig(config.js));

        setJsCode(flatConfig(config.js));
        setYamlCode(config.yaml);
      }
    } catch (e) {}
  });

  const onSubmit = async (code: string) => {
    try {
      const res = await postConfig(code);
      console.log(res);
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
