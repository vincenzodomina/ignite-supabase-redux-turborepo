import { setupListeners } from "@reduxjs/toolkit/query";
import { SplashScreen } from "expo-router";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import type { AppStore } from "src/store";
import store from "src/store";
import { persistor } from "src/store";

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store;
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
    return () => {
      // noop
    };
  }, []);

  const onBeforeLiftPersistGate = () => {
    // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
    // Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106
    // Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.
    setTimeout(SplashScreen.hideAsync, 500);
  };

  return (
    <PersistGate
      loading={null}
      onBeforeLift={onBeforeLiftPersistGate}
      persistor={persistor}
    >
      <Provider store={storeRef.current}>{children}</Provider>
    </PersistGate>
  );
};