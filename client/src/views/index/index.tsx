import React, { useState } from 'react';
import { Layout, Alert, notification } from 'antd';
import { useMount } from 'react-use';

import { ConfigForm } from '../../components/config-form';
import { getConfig, postConfig } from '../../apis';
import { DEFAULT_CONFIG } from '../../configs';
import { flatConfig } from '../../utils';

import './index.less';

const { Header, Footer, Content } = Layout;

function App() {
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
    <Layout>
      <Header className="page-header">Severless Plus UI</Header>
      <Content>
        <ConfigForm
          onSubmit={onSubmit}
          className="config-form"
          initYaml={yamlCode}
          initJs={jsCode}
          initCompName={jsCode.component}
        />
      </Content>
      <Footer className="page-footer">
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/serverless-plus">
          @Serverless Plus
        </a>
        &nbsp;&nbsp;
        {'|'}
        &nbsp;&nbsp;
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/serverless-plus/ui">
          Source Code
        </a>
      </Footer>
    </Layout>
  );
}

export default App;
