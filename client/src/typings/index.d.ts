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
