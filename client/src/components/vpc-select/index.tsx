import React, { ReactNode, useState, useEffect } from 'react';
import { FormInstance } from 'antd/lib/form';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import ComposeSelect from '@/components/compose-select';
import { getVpcList, getSubnetList } from '@/apis/vpc';
import { AnyObject } from '../render-utils';

type VpcSelectProps = {
  form: FormInstance;
  name: string;
  label?: string | ReactNode;
  [propName: string]: any;
};

const depsField = `inputs.region`;
const VpcSelect = (props: VpcSelectProps) => {
  const { form, name, label, global } = props;
  const rg = form.getFieldValue(depsField);
  const region = global[depsField] || rg;
  const [list, setList] = useState([]);
  const [subList, setSubList] = useState([]);

  const handleMainChange = async (value: string) => {
    const obj: AnyObject = {};
    obj[`${name}.subnetId`] = '';
    form.setFieldsValue(obj);
    const res = await getSubnetList({ region, vpcId: value });

    setSubList(res.data || []);
    if (res.code !== 0 && res.error) {
      console.log(`[Error] ${res.error.message}(reqId: ${res.error.reqId})`);
    }
  };

  useEffect(() => {
    async function getList() {
      const res = await getVpcList({ region });

      setList(res.data || []);
      if (res.code !== 0 && res.error) {
        console.log(`[Error] ${res.error.message}(reqId: ${res.error.reqId})`);
      }
    }
    getList();
  }, [region]);

  return (
    <ComposeSelect
      form={form}
      name={name}
      label={label}
      mainName={`${name}.vpcId`}
      subName={`${name}.subnetId`}
      mainPlaceHolder={'faas.vpc.select'}
      subPlaceHolder={'faas.subnet.select'}
      list={list}
      subList={subList}
      handleMainChange={handleMainChange}
    />
  );
};

export default connect(({ global }: ConnectState) => ({
  global,
}))(VpcSelect);
