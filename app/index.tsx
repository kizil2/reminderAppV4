
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Fixture Reminder App</Text>
      <Button title="Start" onPress={() => router.replace("/auth")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#666",
    fontSize: 16,
  },
});
