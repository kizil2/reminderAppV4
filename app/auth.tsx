import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function AuthScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authenticate = async () => {
    setIsAuthenticating(true);
    setError(null);
    // demo şifre
    if (password === "") {
      router.replace("./home");
    } else {
      setError("Incorrect password. Please try again.");
    }
    setIsAuthenticating(false);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
      <Text style={styles.title}>Fixture Reminder App</Text>
      <Text style={styles.subtitle}></Text>
      <Text style={styles.instructionText}>Enter your password to access your Fixtures</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        editable={!isAuthenticating}
      />
      <Button
        title={isAuthenticating ? "Verifying" : "Login"}
        onPress={authenticate}
        disabled={isAuthenticating}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.reset}>
        <Button
          title="Add an account"
          onPress={() => Alert.alert("daha yapılmadı")}
        />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  instructionText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "#f44336",
    marginTop: 10,
    fontSize: 14,
  },
  reset: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
});
