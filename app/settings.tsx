import { Stack, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <>
      <Stack.Screen options={{ title: "Settings" }} />
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.backButton} onPress={() => router.back()}>{"<"}</Text>
          <Text style={styles.titleHeader}>Settings</Text>
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: "#ccc", true: "#1976D2" }}
            thumbColor={notifications ? "#1976D2" : "#f4f3f4"}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dark Mode (in progress)</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#ccc", true: "#222" }}
            thumbColor={darkMode ? "#222" : "#f4f3f4"}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  backButton: {
    fontSize: 28,
    color: '#1976D2',
    marginRight: 16,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontWeight: 'bold',
  },
  titleHeader: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#222",
    display: 'none',
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingLabel: {
    fontSize: 18,
    color: "#333",
  },
  infoText: {
    marginTop: 40,
    color: "#888",
    fontSize: 14,
    textAlign: "center",
  },
});
