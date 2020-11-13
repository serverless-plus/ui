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
  dependField: string;
  [propName: string]: any;
};

const VpcSelect = (props: VpcSelectProps) => {
  const { form, name, label, global, dependField } = props;
  const rg = form.getFieldValue(dependField);
  const vpcId = form.getFieldValue(`${name}.vpcId`);
  const region = global[dependField] || rg;
  const [list, setList] = useState([]);
  const [subList, setSubList] = useState([]);

  async function getList() {
    const res = await getVpcList({ region });
    setList(res.data || []);
    if (res.code !== 0 && res.error) {
      console.log(`[Error] ${res.error.message}(reqId: ${res.error.reqId})`);
    }
  }

  async function getSubList(vpcId: string) {
    const res = await getSubnetList({ region, vpcId });
    setSubList(res.data || []);
    if (res.code !== 0 && res.error) {
      console.log(`[Error] ${res.error.message}(reqId: ${res.error.reqId})`);
    }
  }

  const handleMainChange = async (value: string) => {
    await getSubList(value);
  };

  useEffect(() => {
    setSubList([]);
    getList();
  }, [region]);

  useEffect(() => {
    if (vpcId) {
      getSubList(vpcId);
    }
  }, [vpcId]);

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
