import React, { useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Href, router } from 'expo-router';
import { appRoutes } from 'src/routes';
import { useAuth } from "src/hooks/useAuth";

interface GuestGuardProps {
  children?: ReactNode;
}

const GuestGuard: FC<GuestGuardProps> = ({ children }): React.JSX.Element | null => {
  const { isAuthenticated } = useAuth();
  const [isChecking, setIsChecking] = useState<boolean>(true);

  const redirectPath = appRoutes.root as Href;

  const checkPermissions = async (): Promise<void> => {
    if (isAuthenticated) {
      console.log('[Guest Guard]: User is logged in, redirecting to home');
      router.replace(redirectPath);
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [isAuthenticated]);

  if (isChecking) {
    //return <SplashScreen />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default GuestGuard;
