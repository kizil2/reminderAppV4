import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SUPER_LIG_TEAMS, getFollowedTeams, setFollowedTeams } from "../footballData/football";

export default function PickTeamsScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const followed = await getFollowedTeams();
      setSelected(followed);
    })();
  }, []);

  const toggleTeam = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const save = async () => {
    if (selected.length === 0) {
      await setFollowedTeams([]);
    } else {
      await setFollowedTeams(selected);
    }
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
      <Text style={styles.title}>Your Teams</Text>
      <ScrollView style={{ width: "100%" }}>
        {SUPER_LIG_TEAMS.map((team) => (
          <TouchableOpacity
            key={team.id}
            style={[styles.teamRow, { backgroundColor: `${team.color}22` }]}
            onPress={() => toggleTeam(team.id)}
          >
            <View style={[styles.noktaColour, { backgroundColor: team.color }]} />
            <Text style={styles.teamName}>{team.name}</Text>
            <View style={styles.checkbox}>
              {selected.includes(team.id) && (
                <Ionicons name="checkmark" size={20} color="#1976D2" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.saveButton} onPress={save}>
        <Text style={styles.saveButtonText}>Pick</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", alignItems: "center" },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 20, 
    marginTop: 40,
},
  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  noktaColour: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  teamName: { 
    flex: 1, 
    fontSize: 16, 
    color: "#222" },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#1976D2",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  saveButton: {
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: "#1976D2",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 10,
  },
  saveButtonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 },
});