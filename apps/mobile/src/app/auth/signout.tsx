import React, { useEffect } from 'react';
import { useAuth } from "src/hooks/useAuth";
import { appRoutes } from 'src/routes';
import { Screen } from 'src/components';
import { View, ViewStyle } from 'react-native';
import { colors } from 'src/theme';
import { Href, router } from 'expo-router';

export default function LogoutPage(): React.JSX.Element {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut()
      .then(async (_: any) => {
        // Wait 1 sec for state update, to prevent redirect issues 
        await new Promise((res) => setTimeout(res, 1000));
        router.push(appRoutes.signin as Href);
      })
      .catch((err: any) => console.error('Something went wrong, unable to log out'));
  }, []);

  return (
    <Screen
      contentContainerStyle={$root}
      preset="auto"
      safeAreaEdges={["top"]}
    >
      <View style={$container}>
      </View>
    </Screen>
  );
}

const $root: ViewStyle = {
  minHeight: "100%",
  backgroundColor: colors.palette.neutral100,
}

const $container: ViewStyle = {
  backgroundColor: colors.background,
}