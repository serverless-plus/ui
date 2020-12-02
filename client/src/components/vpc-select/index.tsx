import React, { ReactNode, useState } from 'react';
import { FormInstance } from 'antd/lib/form';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import ComposeSelect from '@/components/common/compose-select';
import { getVpcList, getSubnetList } from '@/apis/vpc';
import { useMount } from 'react-use';

type VpcSelectProps = {
  form: FormInstance;
  name: string;
  label?: string | ReactNode;
  dependFiled: string;
  [propName: string]: any;
};

async function getList(region: string) {
  const res = await getVpcList({ region });
  if (res.code !== 0 && res.error) {
    console.log(`[Error] ${res.error.message}(reqId: ${res.error.reqId})`);
  }

  return res.data || [];
}

async function getSubList(region: string, vpcId: string) {
  const res = await getSubnetList({ region, vpcId });
  if (res.code !== 0 && res.error) {
    console.log(`[Error] ${res.error.message}(reqId: ${res.error.reqId})`);
  }
  return res.data || [];
}

const VpcSelect = (props: VpcSelectProps) => {
  const { form, name, label, global, dependFiled } = props;
  const rg = form.getFieldValue(dependFiled);
  const vpcId = form.getFieldValue(`${name}.vpcId`);
  const region = global[dependFiled] || rg;
  const [list, setList] = useState([]);
  const [subList, setSubList] = useState([]);

  const handleMainChange = async (value: string) => {
    await getSubList(region, value);
  };

  useMount(async () => {
    setSubList([]);
    const list = await getList(region);
    setList(list);

    if (vpcId) {
      const subList = await getSubList(region, vpcId);
      setSubList(subList);
    }
  });

  return (
    <ComposeSelect
      form={form}
      name={name}
      label={label}
      mainName={`${name}.vpcId`}
      subName={`${name}.subnetId`}
      mainPlaceHolder={'faas.vpc.vpcId.select'}
      subPlaceHolder={'faas.vpc.subnetId.select'}
      list={list}
      subList={subList}
      handleMainChange={handleMainChange}
    />
  );
};

export default connect(({ global }: ConnectState) => ({
  global,
}))(VpcSelect);
