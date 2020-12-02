import React, { ReactNode } from 'react';
import { Layout, Switch, Tooltip } from 'antd';
import { SelectLang } from 'umi';
import { connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';
import { FormattedMessage } from '@/components/common/format-message';

import styles from './index.less';

const { Header, Footer, Content } = Layout;

type LayoutProps = {
  children?: ReactNode;
  hideOptional: boolean;
  dispatch: Dispatch;
};

function AppLayout(props: LayoutProps) {
  const { children, dispatch, hideOptional = false } = props;
  const showRequiredChange = (checked: boolean) => {
    dispatch({
      type: 'global/HIDE_OPTIONAL_CHANGE',
      payload: {
        hideOptional: checked,
      },
    });
  };

  return (
    <Layout style={{ height: '100%' }}>
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
              defaultChecked={hideOptional}
            />
          </Tooltip>
          <SelectLang className={styles.langSelect} />
        </div>
      </Header>
      <Content className={styles.content}>{children}</Content>
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

export default connect(({ global }: ConnectState) => ({
  hideOptional: global.hideOptional,
}))(AppLayout);
