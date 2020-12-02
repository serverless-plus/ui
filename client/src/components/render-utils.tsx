import React from 'react';
import { Divider } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { FormattedMessage } from '@/components/common/format-message';
import FormItem from './form-item';
import { DisplayOptions } from '@/typings';

export interface AnyObject {
  [propName: string]: any;
}

export interface RenderConfigOptions {
  parameters: AnyObject;
  form: FormInstance;
  prefix?: string;
  hideOptional?: boolean;
}

function renderConfigs({ parameters, form, prefix, hideOptional = false }: RenderConfigOptions) {
  let comp: JSX.Element[] = [];

  // depend on `display` property to display or hide
  const handleDisplay = (display: DisplayOptions, dependField: string) => {
    if (display && dependField) {
      const depValue = form.getFieldValue(display.key);
      if (depValue !== display.value) {
        return false;
      }
    }
    return true;
  };

  Object.entries(parameters).forEach(([key, val]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (val.type === 'object') {
      if (val.label && val.divider) {
        comp.push(
          <Divider orientation="left" key={newKey}>
            <FormattedMessage id={val.label} />
          </Divider>,
        );
      }

      const subComps = renderConfigs({ parameters: val.keys, form, prefix: newKey, hideOptional });
      comp.push(...subComps);
    } else {
      const display = handleDisplay(val.display, val.dependField);
      const fieldValue = form.getFieldValue(newKey);

      if ((!hideOptional || fieldValue !== undefined || val.required === true) && display) {
        comp.push(<FormItem {...val} name={newKey} label={val.label} key={newKey} form={form} />);
      }
    }
  });

  return comp;
}

export { renderConfigs };
