import React from "react";
import * as Application from "expo-application";
import { Linking, Platform, TextStyle, View, ViewStyle } from "react-native";
import { Button, ListItem, Screen, Text } from "src/components";
import { colors, spacing } from "src/theme";
import { isRTL } from "src/i18n";
import { useAuth } from "src/hooks/useAuth";

function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

export default function DemoDebugScreen() {
  const { signOut } = useAuth()

  const usingHermes =
    typeof HermesInternal === "object" && HermesInternal !== null;
  // @ts-expect-error
  const usingFabric = global.nativeFabricUIManager != null;

  const demoReactotron = React.useMemo(
    () => async () => {
      if (__DEV__) {
        console.tron.display({
          name: "DISPLAY",
          value: {
            appId: Application.applicationId,
            appName: Application.applicationName,
            appVersion: Application.nativeApplicationVersion,
            appBuildVersion: Application.nativeBuildVersion,
            hermesEnabled: usingHermes,
          },
          important: true,
        });
      }
    },
    []
  );

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$container}
    >
      <Text
        style={$reportBugsLink}
        tx="demoDebugScreen.reportBugs"
        onPress={() =>
          openLinkInBrowser("https://github.com/infinitered/ignite/issues")
        }
      />
      <Text style={$title} preset="heading" tx="demoDebugScreen.title" />
      <View style={$itemsContainer}>
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Id</Text>
              <Text>{Application.applicationId}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Name</Text>
              <Text>{Application.applicationName}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Version</Text>
              <Text>{Application.nativeApplicationVersion}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Build Version</Text>
              <Text>{Application.nativeBuildVersion}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Hermes Enabled</Text>
              <Text>{String(usingHermes)}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Fabric Enabled</Text>
              <Text>{String(usingFabric)}</Text>
            </View>
          }
        />
      </View>
      <View style={$buttonContainer}>
        <Button
          style={$button}
          tx="demoDebugScreen.reactotron"
          onPress={demoReactotron}
        />
        <Text
          style={$hint}
          tx={`demoDebugScreen.${Platform.OS}ReactotronHint` as const}
        />
      </View>
      <View style={$buttonContainer}>
        <Button style={$button} tx="common.logOut" onPress={signOut} />
      </View>
    </Screen>
  );
}

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
};

const $title: TextStyle = {
  marginBottom: spacing.xxl,
};

const $reportBugsLink: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.lg,
  alignSelf: isRTL ? "flex-start" : "flex-end",
};

const $item: ViewStyle = {
  marginBottom: spacing.md,
};

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.xl,
};

const $button: ViewStyle = {
  marginBottom: spacing.xs,
};

const $buttonContainer: ViewStyle = {
  marginBottom: spacing.md,
};

const $hint: TextStyle = {
  color: colors.palette.neutral600,
  fontSize: 12,
  lineHeight: 15,
  paddingBottom: spacing.lg,
};