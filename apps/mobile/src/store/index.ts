import { makeStore, StoreOptions } from '@repo/store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import Config from 'src/config';
import reactotron from 'src/devtools/ReactotronConfig';

const createReducer = (rootReducer: any) => persistReducer({ key: 'root', version: 1, storage: AsyncStorage }, rootReducer);

const storeOptions: StoreOptions = {
  createReducer,
  enhancers: __DEV__ ? [reactotron.createEnhancer!()] : [],
  isProduction: Config.production,
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
};

const store = makeStore(storeOptions);
export const persistor = persistStore(store);
export default store;

// Re-export everything from the shared store
export * from '@repo/store';