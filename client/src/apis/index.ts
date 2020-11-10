import { request } from './request';
import { GetConfigResponse, PostConfigResponse } from '../typings';

const getConfig = async (): Promise<GetConfigResponse> => {
  const res = await request.get(`init`);
  console.log(res.data);
  return res.data as GetConfigResponse;
};

const postConfig = async (config: string): Promise<PostConfigResponse> => {
  const res = await request.post(`generate`, {
    config,
  });
  return res.data as PostConfigResponse;
};

export { getConfig, postConfig };
