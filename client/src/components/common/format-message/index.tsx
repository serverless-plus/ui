import React from 'react';
import { FormattedMessage as I18nMessage } from 'umi';

type Props = {
  id?: string;
  defaultMessage?: string;
};

const FormattedMessage = (props: Props) => {
  const { id, defaultMessage } = props;
  return <I18nMessage id={id} defaultMessage={defaultMessage || id} />;
};

export { FormattedMessage };
