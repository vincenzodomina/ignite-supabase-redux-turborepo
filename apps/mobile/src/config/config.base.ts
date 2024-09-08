export interface ConfigBaseProps {
  persistNavigation: "always" | "dev" | "prod" | "never"
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[],
  supabaseUrl: string
  supabaseAnonKey: string,

  // Environment
  production: boolean;
  development: boolean;
  test: boolean;
  api: string;
}

export type PersistNavigationConfig = ConfigBaseProps["persistNavigation"]

const domain: string = (process.env.EXPO_PUBLIC_APP_WHITELABEL_DOMAIN || 'opencures.org').replace(/\/$/, '');
const isDevelopment: boolean = process.env.EXPO_PUBLIC_NODE_ENV === 'development';

const BaseConfig: ConfigBaseProps = {
  // This feature is particularly useful in development mode, but
  // can be used in production as well if you prefer.
  persistNavigation: "dev",

  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: "always",

  /**
   * This is a list of all the route names that will exit the app if the back button
   * is pressed while in that screen. Only affects Android.
   */
  exitRoutes: ["Welcome"],
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,

  // Environment
  production: process.env.EXPO_PUBLIC_NODE_ENV === 'production',
  development: process.env.EXPO_PUBLIC_NODE_ENV === 'development',
  test: process.env.EXPO_PUBLIC_NODE_ENV === 'test',
  api: `${isDevelopment ? 'http://localhost:8000' : `https://api.${domain}`}/api/v1`,
}

export default BaseConfig
