import { useContext } from 'react';
import Config from 'src/config';
import { AuthContext } from 'src/providers/AuthProvider';

export function useAuth() {
  const value = useContext(AuthContext)

  if (Config.production) {
    if (!value) {
      throw new Error("useAuth must be used within an AuthProvider")
    }
  }

  return value
}