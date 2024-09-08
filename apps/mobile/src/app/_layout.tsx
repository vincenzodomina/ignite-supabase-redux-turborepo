import "../utils/gestureHandler";
import "../i18n";
import "../utils/ignoreWarnings";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { ViewStyle } from "react-native";
import { Slot, SplashScreen } from "expo-router";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { customFontsToLoad } from "../theme";
import { StoreProvider } from "src/providers/StoreProvider";
import { AuthProvider } from "src/providers/AuthProvider";

SplashScreen.preventAutoHideAsync();

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("src/devtools/ReactotronConfig.ts");
}

export { ErrorBoundary } from "src/components/ErrorBoundary/ErrorBoundary";

export default function Root() {
  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)

  useEffect(() => {
    if (areFontsLoaded || fontLoadError) {
      // Hide the splash screen after the fonts have loaded and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [areFontsLoaded, fontLoadError]);

  if (!areFontsLoaded && !fontLoadError) {
    return null
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={$root}>
        <StoreProvider>
          <AuthProvider>
            <Slot />
          </AuthProvider>
        </StoreProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const $root: ViewStyle = { flex: 1 };