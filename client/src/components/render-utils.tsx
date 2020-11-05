import React from 'react';
import { Divider } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { FormItem } from './form-item';

export interface AnyObject {
  [propName: string]: any;
}

function renderConfigs(params: AnyObject, form: FormInstance, prefix?: string) {
  let comp: JSX.Element[] = [];

  Object.entries(params).forEach(([key, val]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (val.type === 'object') {
      if (val.label && val.divider) {
        comp.push(
          <Divider orientation="left" key={newKey}>
            {val.label}
          </Divider>,
        );
      }
      const subComps = renderConfigs(val.keys, form, newKey);
      comp.push(...subComps);
    } else {
      comp.push(<FormItem {...val} name={newKey} key={newKey} form={form} />);
    }
  });

  return comp;
}

export { renderConfigs };
