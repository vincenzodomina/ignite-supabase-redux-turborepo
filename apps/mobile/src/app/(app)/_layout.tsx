import React from "react";
import { Href, Redirect, Stack } from "expo-router";
import { useAuth } from "src/hooks/useAuth";
import { appRoutes } from "src/routes";

export default function Layout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href={appRoutes.signin as Href} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};