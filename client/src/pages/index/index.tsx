import React, { useState } from 'react';
import { Layout, Alert, Switch, Tooltip, notification } from 'antd';
import { useMount } from 'react-use';
import { FormattedMessage, SelectLang } from 'umi';

import { ConfigForm } from '@/components/config-form';
import { getConfig, postConfig } from '@/apis';
import { DEFAULT_CONFIG } from '@/configs';
import { flatConfig } from '@/utils';

import styles from './index.less';

const { Header, Footer, Content } = Layout;

function App() {
  const [jsCode, setJsCode] = useState(DEFAULT_CONFIG.js);
  const [yamlCode, setYamlCode] = useState(DEFAULT_CONFIG.yaml);
  const [hideOptional, setHideOptional] = useState(false);

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

  const showRequiredChange = (checked: boolean) => {
    setHideOptional(checked);
  };

  return (
    <Layout>
      <Header className={styles.header}>
        <span className={styles.title}>
          <FormattedMessage id="navbar.title" />
        </span>
        <div>
          <Tooltip title={<FormattedMessage id="configs.hideOptional" />}>
            <Switch
              onChange={showRequiredChange}
              checkedChildren={<FormattedMessage id="configs.hideOptional.hide" />}
              unCheckedChildren={<FormattedMessage id="configs.hideOptional.show" />}
              defaultChecked={false}
            />
          </Tooltip>
          <SelectLang className={styles.langSelect} />
        </div>
      </Header>
      <Content>
        <ConfigForm
          onSubmit={onSubmit}
          className={styles.configForm}
          initYaml={yamlCode}
          initJs={jsCode}
          initCompName={jsCode.component}
          hideOptional={hideOptional}
        />
      </Content>
      <Footer className={styles.footer}>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/serverless-plus">
          @Serverless Plus
        </a>
        &nbsp;&nbsp;
        {'|'}
        &nbsp;&nbsp;
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/serverless-plus/ui">
          <FormattedMessage id="footer.sourceCode" />
        </a>
      </Footer>
    </Layout>
  );
}

export default App;
