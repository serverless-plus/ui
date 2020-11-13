import { Reducer } from 'umi';

export interface GlobalModelState {
  hideOptional: boolean;
  component: string;
  [prop: string]: any;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  reducers: {
    REGION_CHANGE: Reducer<GlobalModelState>;
    COMPONENT_CHANGE: Reducer<GlobalModelState>;
    HIDE_OPTIONAL_CHANGE: Reducer<GlobalModelState>;
  };
}

const defaultState = {
  hideOptional: false,
  component: 'framework',
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: defaultState,

  reducers: {
    REGION_CHANGE(state = defaultState, { payload }): GlobalModelState {
      return {
        ...state,
        ...payload,
      };
    },
    COMPONENT_CHANGE(state = defaultState, { payload }): GlobalModelState {
      return {
        ...state,
        ...payload,
      };
    },
    HIDE_OPTIONAL_CHANGE(state = defaultState, { payload }): GlobalModelState {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default GlobalModel;
