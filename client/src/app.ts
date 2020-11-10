import { createLogger } from 'redux-logger';

export const dva = {
  config: {
    onAction: createLogger(),
    onError(e: any) {
      e.preventDefault();
      console.error(e.message);
    },
  },
};
