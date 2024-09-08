import React, { ComponentType, useMemo, useRef, useState } from "react"
import {
  Image,
  ImageStyle,
  Pressable,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "src/components"
import { useSafeAreaInsetsStyle } from "src/utils/useSafeAreaInsetsStyle"
import { colors, spacing } from "src/theme"
import { useAuth } from "src/hooks/useAuth";
import GuestGuard from "src/components/Authentication/GuestGuard"

const logo = require("assets/images/logo.png")

export default function SignInScreen(_props: any) {
  const passwordInput = useRef<TextInput>(null)
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const { signInWithEmailAndPassword, signUp } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [validationErrors, setValidationErrors] = useState<Map<string, string>>(new Map())
  const [error, setError] = useState<string | undefined>(undefined)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isSigningUp, setIsSigningUp] = useState(false)
  const isLoading: boolean = isSigningIn || isSigningUp;

  const validateForm = () => {
    const errors: Map<string, string> = new Map()

    if (!email || email.split("@").length !== 2) {
      errors.set("Email", "must be valid email")
    }

    if (!password) {
      errors.set("Password", "cannot be blank")
    }

    return errors
  }

  const onSignIn = async () => {
    try {
      setIsSigningIn(true)
      setError(undefined)

      const errors = validateForm()
      setValidationErrors(errors)
      if (errors.size > 0) return

      await signInWithEmailAndPassword(email, password)
    } catch (error: any) {
      setError(error?.message)
    } finally {
      setIsSigningIn(false)
    }
  }

  const onSignUp = async () => {
    try {
      setIsSigningUp(true)
      setError(undefined)

      const errors = validateForm()
      setValidationErrors(errors)
      if (errors.size > 0) return

      await signUp(email, password)
    } catch (error: any) {
      setError(error?.message)
    } finally {
      setIsSigningUp(false)
    }
  }

  const onForgotPassword = () => {
    // Forgot Password Flow
    console.log("Forgot Password Flow")
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          />
        )
      },
    [isPasswordHidden],
  )

  return (
    <GuestGuard>
      <Screen
        contentContainerStyle={$root}
        preset="auto"
        safeAreaEdges={["top"]}
      >
        <View style={$container}>
          <View style={$topContainer}>
            <Image style={$logo} source={logo} resizeMode="contain" />
          </View>
          <View style={[$bottomContainer, $bottomContainerInsets]}>
            {error && <Text style={$errorText}>{error}</Text>}
            <View>
              <TextField
                containerStyle={$textField}
                label="Email"
                inputMode="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                defaultValue={email}
                onChangeText={setEmail}
                onSubmitEditing={() => passwordInput.current?.focus()}
                readOnly={isLoading}
                returnKeyType="next"
                helper={validationErrors.get("Email")}
                status={validationErrors.get("Email") ? "error" : undefined}
              />
              <TextField
                containerStyle={$textField}
                label="Password"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect={false}
                defaultValue={password}
                onChangeText={setPassword}
                onSubmitEditing={onSignIn}
                readOnly={isLoading}
                ref={passwordInput}
                returnKeyType="done"
                RightAccessory={PasswordRightAccessory}
                secureTextEntry={isPasswordHidden}
                helper={validationErrors.get("Password")}
                status={validationErrors.get("Password") ? "error" : undefined}
              />
            </View>
            <View>
              <Button onPress={onSignIn} disabled={isLoading}>
                {isSigningIn ? "Signing In..." : "Sign In"}
              </Button>
              <Pressable style={$forgotPassword} onPress={onForgotPassword} disabled={isLoading}>
                <Text preset="bold">Forgot Password?</Text>
              </Pressable>
              <Text style={$buttonDivider}>- or -</Text>
              <Button preset="reversed" onPress={onSignUp} disabled={isLoading}>
                {isSigningUp ? "Signing Up..." : "Sign Up"}
              </Button>
            </View>
            <View style={$cap} />
          </View>
        </View>
      </Screen>
    </GuestGuard>
  )
}

const $root: ViewStyle = {
  minHeight: "100%",
  backgroundColor: colors.palette.neutral100,
}

const $container: ViewStyle = {
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  height: 200,
  justifyContent: "center",
  alignItems: "center",
}

const $bottomContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  paddingBottom: spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $cap: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  height: spacing.xl,
  position: "absolute",
  top: -spacing.xl,
  left: 0,
  right: 0,
}

const $textField: ViewStyle = {
  marginBottom: spacing.md,
}

const $forgotPassword: ViewStyle = {
  marginVertical: spacing.md,
}

const $buttonDivider: TextStyle = {
  textAlign: "center",
  marginVertical: spacing.md,
}

const $logo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}

const $errorText: TextStyle = {
  color: colors.error,
}