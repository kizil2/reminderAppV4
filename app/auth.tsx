import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function AuthScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);
    if (error) {
      Alert.alert("Login Failed", error.message);
    } else {
      router.replace("./home");
    }
  };

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setIsLoading(false);
    if (error) {
      Alert.alert("Sign Up Failed", error.message);
    } else {
      Alert.alert("Success", "Account created successfully! Please check your email to confirm.");
      router.replace("./home");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Password reset email sent!");
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>Fixture Reminder App</Text>
        <Text style={styles.subtitle}>
          {isLogin ? "Welcome back!" : "Create your account"}
        </Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#4d46469f"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#4d46469f"
          secureTextEntry
          editable={!isLoading}
        />

        {!isLogin && (
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor="#4d46469f"
            secureTextEntry
            editable={!isLoading}
          />
        )}

        <TouchableOpacity
          style={[styles.primaryButton, { opacity: isLoading ? 0.7 : 1 }]}
          onPress={isLogin ? handleLogin : handleSignUp}
          disabled={isLoading}
        >
          <Text style={styles.primaryButtonText}>
            {isLoading ? "Loading..." : (isLogin ? "Login" : "Sign Up")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setIsLogin(!isLogin)}
          disabled={isLoading}
        >
          <Text style={styles.secondaryButtonText}>
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>

        {isLogin && (
          <TouchableOpacity onPress={handleForgotPassword} disabled={isLoading}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        )}
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
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#222",
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    marginBottom: 15,
  },
  secondaryButtonText: {
    color: "#1976D2",
    fontSize: 14,
    textAlign: "center",
  },
  forgotPasswordText: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
  },
});
