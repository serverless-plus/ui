import React, { useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useIntl } from 'umi';
import { FormattedMessage } from '@/components/common/format-message';

const StartGuide = () => {
  const [steps] = useState([
    {
      target: '.configForm',
      content: <FormattedMessage id="guide.steps.one" />,
      placementBeacon: 'top',
    },
    {
      target: '.configEditor',
      content: <FormattedMessage id="guide.steps.two" />,
      placementBeacon: 'top',
    },
    {
      target: '.configButton',
      content: <FormattedMessage id="guide.steps.three" />,
      placementBeacon: 'top',
    },
    {
      target: '.configTips',
      content: <FormattedMessage id="guide.steps.four" />,
      placementBeacon: 'top',
    },
  ] as Step[]);
  const [run, setRun] = useState(true);
  const intl = useIntl();

  const callback = (data: CallBackProps) => {
    const { status } = data;

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      setRun(false);
    }
  };

  const locale = {
    back: intl.formatMessage({
      id: 'guide.steps.back',
    }),
    close: intl.formatMessage({
      id: 'guide.steps.close',
    }),
    last: intl.formatMessage({
      id: 'guide.steps.last',
    }),
    next: intl.formatMessage({
      id: 'guide.steps.next',
    }),
    skip: intl.formatMessage({
      id: 'guide.steps.skip',
    }),
  };
  return (
    <Joyride
      callback={callback}
      run={run}
      steps={steps}
      continuous={true}
      // scrollToFirstStep={true}
      // showSkipbutton={true}
      // tooltipComponent={Tooltip}
      locale={locale}
      styles={{
        options: {
          zIndex: 20000,
          backgroundColor: '#fff',
          overlayColor: 'rgba(0, 0, 0, 0.4)',
          primaryColor: '#006eff',
          textColor: 'rgba(0,0,0,.85)',
        },
      }}
    />
  );
};

export default StartGuide;
