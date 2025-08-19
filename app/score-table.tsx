import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fetchStandings } from "../lib/footballDataApi";
import { LEAGUES } from "../lib/leagues";

export default function ScoreTableScreen() {
  const router = useRouter();
  const [selectedLeague, setSelectedLeague] = useState(LEAGUES[0]?.id || "");
  const [standings, setStandings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const getApiCode = (leagueId: string) => LEAGUES.find(l => l.id === leagueId)?.apiCode;

  const loadStandings = async (leagueId: string) => {
    const apiCode = getApiCode(leagueId);
    if (!apiCode) return;
    setLoading(true);
    const data = await fetchStandings(apiCode);
    setStandings(data);
    setLoading(false);
  };

  React.useEffect(() => {
    loadStandings(selectedLeague);
  }, [selectedLeague]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Score Table</Text>
        </View>
            <View style={styles.leagueChipsContainer}>
              {LEAGUES.map((league) => (
                <TouchableOpacity
                  key={league.id}
                  style={[
                    styles.leagueChip,
                    selectedLeague === league.id && styles.leagueChipActive
                  ]}
                  onPress={() => setSelectedLeague(league.id)}
                >
                  <Text style={[
                    styles.leagueChipText,
                    selectedLeague === league.id && styles.leagueChipTextActive
                  ]}>
                    {league.flag} {league.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

        <View style={styles.scoreTableContainer}>
          <View style={styles.scoreTableHeaderRow}>
            <Text style={[styles.scoreTableHeader, {flex: 2}]}>Team</Text>
            <Text style={styles.scoreTableHeader}>P</Text>
            <Text style={styles.scoreTableHeader}>Pts</Text>
          </View>
          {loading ? (
            <Text style={{textAlign: 'center', marginTop: 16}}>Loading...</Text>
          ) : (
            standings.map((row: any, idx: number) => (
              <View key={row.team.id} style={[styles.scoreTableRow, idx % 2 === 0 && styles.scoreTableRowAlt]}>
                <Text style={[styles.scoreTableCell, {flex: 2}]}>{row.team.shortName || row.team.name}</Text>
                <Text style={styles.scoreTableCell}>{row.playedGames}</Text>
                <Text style={styles.scoreTableCell}>{row.points}</Text>
              </View>
            ))
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leagueChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 8,
  },
  leagueChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f8f8',
    marginBottom: 4,
    marginRight: 8,
  },
  leagueChipActive: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  leagueChipText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  leagueChipTextActive: {
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: "#FF9800",
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    backgroundColor: "#FF9800",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginLeft: 15,
  },
  scoreTableContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 16,
    marginHorizontal: 8,
    paddingHorizontal: 0,
    paddingTop: 8,
    paddingBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  scoreTableTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginTop: 12,
    marginBottom: 4,
    marginLeft: 16,
  },
  leagueTabsContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    marginTop: 2,
    minHeight: 36,
  },
  leagueTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f3f3f3',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leagueTabActive: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  leagueTabText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
  },
  leagueTabTextActive: {
    color: 'white',
    fontWeight: '700',
  },
  scoreTableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 4,
    marginHorizontal: 8,
    marginTop: 4,
    marginBottom: 2,
  },
  scoreTableHeader: {
    flex: 1,
    fontWeight: '700',
    color: '#FF9800',
    fontSize: 14,
    textAlign: 'center',
  },
  scoreTableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    marginHorizontal: 8,
    minHeight: 28,
  },
  scoreTableRowAlt: {
    backgroundColor: '#faf6f0',
    borderRadius: 8,
  },
  scoreTableCell: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },
});
