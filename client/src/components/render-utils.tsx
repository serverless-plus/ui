import React from 'react';
import { Divider } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { FormItem } from './form-item';

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

  Object.entries(parameters).forEach(([key, val]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (val.type === 'object') {
      if (val.label && val.divider) {
        comp.push(
          <Divider orientation="left" key={newKey}>
            {val.label}
          </Divider>,
        );
      }

      const subComps = renderConfigs({ parameters: val.keys, form, prefix: newKey, hideOptional });
      comp.push(...subComps);
    } else {
      if (!hideOptional || val.required === true) {
        comp.push(<FormItem {...val} name={newKey} key={newKey} form={form} />);
      }
    }
  });

  return comp;
}

export { renderConfigs };
