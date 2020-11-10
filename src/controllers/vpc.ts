import { AnyObject } from '../typings';
import { Request, Response } from 'express';
import { Capi } from '@tencent-sdk/capi';
import { request, RequestOptions } from '../utils/request';

const getRequst = (region: string) => {
  const capi = new Capi({
    SecretId: process.env.TENCENT_SECRET_ID as string,
    SecretKey: process.env.TENCENT_SECRET_KEY as string,
    Region: region,
    ServiceType: 'vpc',
    Version: '2017-03-12',
  });

  return async (data: RequestOptions) => {
    return request(capi, data);
  };
};

/**
 * GET /vpc
 * init serverless config api.
 */
export const vpcList = async (req: Request, res: Response): Promise<void> => {
  const region = req.query.region || 'ap-guangzhou';
  try {
    const reqClient = getRequst(region as string);
    const { VpcSet } = await reqClient({
      Action: 'DescribeVpcs',
    });
    const data = VpcSet.map((item: AnyObject) => item.VpcId);
    res.json({
      code: 0,
      data: data,
    });
  } catch (e) {
    res.json({
      code: 1,
      data: [],
      error: e,
    });
  }
};

/**
 * GET /subnet
 * init serverless config api.
 */
export const subnetList = async (req: Request, res: Response): Promise<void> => {
  const region = req.query.region || 'ap-guangzhou';
  const { vpcId } = req.query;
  try {
    const reqClient = getRequst(region as string);
    const { SubnetSet } = await reqClient({
      Action: 'DescribeSubnets',
      Filters: [
        {
          Name: 'vpc-id',
          Values: [vpcId],
        },
      ],
    });
    const data = SubnetSet.map((item: AnyObject) => item.SubnetId);
    res.json({
      code: 0,
      data: data,
    });
  } catch (e) {
    res.json({
      code: 1,
      data: [],
      error: e,
    });
  }
};
