import { combineReducers } from '@reduxjs/toolkit';
import { reducer as appStateReducer } from './slices/app.slice';

const appReducer = combineReducers({
  app: appStateReducer,
})

const rootReducer = (state: any, action: any) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  };

  return appReducer(state, action);
};

export default rootReducer;
