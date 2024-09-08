import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react"
import { Session, supabase as supabaseClient } from "src/lib/supabase"

interface AuthState {
  isAuthenticated: boolean
  token?: Session["access_token"]
}

interface AuthContextType extends AuthState {
  signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: undefined,
  signInWithEmailAndPassword: () => new Promise(() => ({})),
  signUp: () => new Promise(() => ({})),
  signOut: () => new Promise(() => undefined),
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: undefined,
  });

  const signInWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
      });

      //console.log('signInWithEmailAndPassword: Data: ', data, 'Error: ', error);

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          // You should resend the verification email.
          // For the sake of simplicity, we will just redirect to the confirmation page.
          console.log('[Auth] Email not confirmed', error.message);
        }
        throw error.message;
      }
    } catch (error) {
      console.error('[Auth] Error Sign In with Email and Password: ', error);
      throw error;
    }
  };

  const signUp = useCallback(
    async ({ email, password }: any) => {
      const result = await supabaseClient.auth.signUp({
        email,
        password,
      })

      if (result.data?.session?.access_token) {
        setAuthState({
          isAuthenticated: true,
          token: result.data.session.access_token,
        })
      }
    },
    [supabaseClient]
  )

  const signOut = useCallback(async () => {
    await supabaseClient.auth.signOut()
    setAuthState({
      isAuthenticated: false,
      token: undefined,
    })
  }, [supabaseClient])

  const subscribe = () => {
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(async (event, session: Session | null) => {
      //console.log('[Auth] onAuthStateChange: Event: ', event, ' Session Token available: ', !!session?.access_token, ' AuthState: ', authState);

      switch (event) {
        case "SIGNED_OUT":
          setAuthState({
            isAuthenticated: false,
            token: undefined,
          })
          break
        case "INITIAL_SESSION":
        case "SIGNED_IN":
        case "TOKEN_REFRESHED":
          setAuthState({
            isAuthenticated: true,
            token: session?.access_token,
          });
          break
        default:
        // no-op
      }
    });

    return subscription;
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => {
      subscription?.unsubscribe();
    };
  }, [supabaseClient]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signInWithEmailAndPassword,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}