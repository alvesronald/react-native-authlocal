import { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

import { styles } from "./styles";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function verifyAvaliableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    console.log({ compatible });

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(
      types.map((type) => LocalAuthentication.AuthenticationType[type])
    );
  }

  async function handleAuthentication() {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isBiometricEnrolled) {
      return Alert.alert(
        "Log in",
        "No biometrics found. Please enroll on device!"
      );
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with Biometrics",
      fallbackLabel: "Biometrics not recognized",
    });

    setIsAuthenticated(auth.success);
  }

  useEffect(() => {
    verifyAvaliableAuthentication();
  }, []);

  return (
    <View style={styles.container}>
      <Text>User connected: {isAuthenticated ? "Yes" : "No"}</Text>

      <Button title="Sign In" onPress={handleAuthentication} />
    </View>
  );
}
