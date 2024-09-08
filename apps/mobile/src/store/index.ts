import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from './rootReducer';
import Config from 'src/config';
import reactotron from 'src/devtools/ReactotronConfig';

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(__DEV__ ? reactotron.createEnhancer!() : [] as any),
    devTools: !Config.production,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ // For faster development environment
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
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
//export const useDispatch = useReduxDispatch.withTypes<AppDispatch>();
//export const useSelector = useReduxSelector.withTypes<RootState>();

const store = makeStore();
export const persistor = persistStore(store);
export default store;