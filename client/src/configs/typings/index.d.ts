export interface AnyObject {
  [prodName: string]: any;
}

export interface ComponentConfigs {
  inputs: AnyObject;
}

export interface InitConfig {
  js: AnyObject;
  yaml: string;
}

export interface Inputs {
  websocket: ComponentConfigs;
  framework: ComponentConfigs;
}
