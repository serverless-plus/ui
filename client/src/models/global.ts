import { Reducer } from 'umi';

export interface GlobalModelState {
  [prop: string]: any;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  reducers: {
    REGION_CHANGE: Reducer<GlobalModelState>;
  };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {},

  reducers: {
    REGION_CHANGE(state = {}, { payload }): GlobalModelState {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default GlobalModel;
