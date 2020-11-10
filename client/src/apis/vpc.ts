import { request } from './request';
import { ApiErrorInstance } from './request';

interface GetVpcRequest {
  region?: string;
}

interface GetSubnetRequest {
  region?: string;
  vpcId: string;
}

interface GetResponse {
  code: number;
  data: any;
  error?: ApiErrorInstance;
}

const getVpcList = async ({ region }: GetVpcRequest) => {
  const res = await request.get(`/vpc?region=${region}`);
  console.log(res.data);
  return res.data as GetResponse;
};

const getSubnetList = async ({ region, vpcId }: GetSubnetRequest) => {
  const res = await request.get(`/subnet?region=${region}&vpcId=${vpcId}`);
  console.log(res.data);
  return res.data as GetResponse;
};

export { getVpcList, getSubnetList };
