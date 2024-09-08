import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';
import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import rootReducer from './rootReducer';

export interface StoreOptions {
  createReducer?: (rootReducer: any) => typeof rootReducer;
  enhancers?: any[];
  isProduction: boolean;
  serializableCheck?: boolean | object;
}

export const makeStore = (options: StoreOptions) => {
  const {
    createReducer,
    enhancers = [],
    isProduction,
    serializableCheck,
  } = options;

  return configureStore({
    reducer: createReducer ? createReducer(rootReducer) : rootReducer,
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(enhancers),
    devTools: !isProduction,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ // For faster development environment
      immutableCheck: false,
      serializableCheck: serializableCheck || false,
    })
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;