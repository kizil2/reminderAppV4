import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LEAGUES, getFollowedTeams, getTeamsByLeague } from "../../lib/leagues";

export default function PickTeamsScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const [activeLeague, setActiveLeague] = useState<string>('premier-league');
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      getFollowedTeams().then(followed => {
        if (isActive && Array.isArray(followed)) setSelected(followed);
      });
      return () => { isActive = false; };
    }, [])
  );

  const toggleTeam = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const toggleLeague = (leagueId: string) => {
    setActiveLeague(leagueId);
  }

  const save = async () => {
    try {
      const { supabase } = await import('../../lib/supabase');
      const { data: userData, error: userError } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (!userId) {
        alert('Pick Teams error: No user is logged in.');
        return;
      }
      const { error } = await supabase
        .from('user_teams')
        .upsert([
          {
            user_id: userId,
            teams: selected
          }
        ], { onConflict: 'user_id' });
      if (error) {
        alert('Pick Teams error: ' + error.message);
        console.log(error);
      } else {
        router.replace({ pathname: "/home", params: { refresh: Date.now().toString() } });
      }
    } catch (e) {
      alert('Pick Teams exception: ' + (e instanceof Error ? e.message : String(e)));
    }
  };

  const getDisplayedTeams = () => {
    return activeLeague ? getTeamsByLeague(activeLeague) : [];
  } 

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>Your Teams</Text>
        
        <View style={styles.leagueFilters}>
          {LEAGUES.map((league) => (
            <TouchableOpacity
              key={league.id}
              style={[
                styles.leagueChip,
                activeLeague === league.id && styles.leagueChipActive
              ]}
              onPress={() => toggleLeague(league.id)}
            >
              <Text style={[
                styles.leagueChipText,
                activeLeague === league.id && styles.leagueChipTextActive
              ]}>
                {league.flag} {league.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={{ width: "100%" }}>
          {activeLeague && (() => {
            const league = LEAGUES.find(l => l.id === activeLeague);
            const leagueTeams = getTeamsByLeague(activeLeague);
            if (!league || leagueTeams.length === 0) return null;
            return (
              <View key={activeLeague}>
                <Text style={styles.leagueHeader}>
                  {league.flag} {league.fullName}
                </Text>
                {leagueTeams.map((team) => (
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
              </View>
            );
          })()}
        </ScrollView>
      
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: '#2E7D32' }]}
          onPress={save}
        >
          <Text style={styles.saveButtonText}>Pick Teams</Text>
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
  leagueFilters: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
    gap: 8,
  },
  leagueChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f8f8f8",
  },
  leagueChipActive: {
    backgroundColor: "#1976D2",
    borderColor: "#1976D2",
  },
  leagueChipText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  leagueChipTextActive: {
    color: "#fff",
  },
  leagueHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 5,
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
    color: "#222" 
  },
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
    fontSize: 16 
  },
});