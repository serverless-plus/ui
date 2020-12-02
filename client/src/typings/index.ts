export interface AnyObject {
  [propName: string]: any;
}

export interface GetConfigResponse {
  code: number;
  js: { [prop: string]: any };
  yaml: string;
}

export interface PostConfigResponse {
  code: number;
  yamlPath: string;
  config: string;
}
export interface ComponentConfigs {
  inputs: AnyObject;
}

export interface InitConfig {
  js: AnyObject;
  yaml: string;
}

export interface Inputs {
  framework: ComponentConfigs;
  scf: ComponentConfigs;
  website: ComponentConfigs;
  websocket: ComponentConfigs;
}

export interface TriggerConfigs {
  timer: AnyObject;
  cos?: AnyObject;
  apigw?: AnyObject;
  ckafka?: AnyObject;
  cmq?: AnyObject;
}

export type TriggerType = keyof TriggerConfigs;

export interface DisplayOptions {
  key: string;
  value: any;
}
