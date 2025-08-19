import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMatches } from '../components/MatchesContext';
import { FootballDataMatch, getFollowedTeams, getLeagueBadgeForMatch } from '../lib/leagues';

export default function FixturesScreen() {
  const router = useRouter();
  const { matches: fixtures, loading } = useMatches();
  const [followedTeams, setFollowedTeams] = useState<string[]>([]);
  const [filter, setFilter] = useState<'all' | 'following'>('following');

  const loadData = async () => {
    try {
      const teams = await getFollowedTeams();
      setFollowedTeams(teams);
      if (teams.length === 0) {
        setFilter('all');
      }
    } catch (error) {
      console.error('Error loading teams:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const getFilteredFixtures = () => {
    if (filter === 'following' && followedTeams.length > 0) {
      const ALL_TEAMS = require('../lib/leagues').ALL_TEAMS;
      const followedTLAs = followedTeams
        .map(id => {
          const team = ALL_TEAMS.find(t => t.id === id);
          return team ? team.shortName : null;
        })
        .filter((tla): tla is string => Boolean(tla));

      return fixtures.filter(match => {
        return followedTLAs.some(tla =>
          (match.homeTeam.tla && match.homeTeam.tla.toLowerCase() === tla.toLowerCase()) ||
          (match.awayTeam.tla && match.awayTeam.tla.toLowerCase() === tla.toLowerCase())
        );
      });
    }
    return fixtures;
  };

  const renderFixture = ({ item }: { item: FootballDataMatch }) => {
    const leagueBadge = getLeagueBadgeForMatch(item);
    const matchDate = new Date(item.utcDate);
    const formattedDate = matchDate.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
    const formattedTime = matchDate.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Europe/London'
    });

    return (
      <View style={styles.fixtureCard}>
        <View style={styles.fixtureHeader}>
          <View style={styles.matchInfo}>
            <Text style={styles.matchTeams}>
              {item.homeTeam.shortName} vs {item.awayTeam.shortName}
            </Text>
            <Text style={styles.matchDate}>{formattedDate} at {formattedTime}</Text>
          </View>
          <Text style={[styles.leagueBadge, { backgroundColor: leagueBadge.color }]}>
            {leagueBadge.flag}
          </Text>
        </View>
        <Text style={styles.matchLeague}>Matchday {item.matchday} - {leagueBadge.name}</Text>
      </View>
    );
  };

  const filteredFixtures = getFilteredFixtures();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#FF9800" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Fixtures</Text>
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
              All Fixtures
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'following' && styles.filterButtonActive]}
            onPress={() => setFilter('following')}
          >
            <Text style={[styles.filterText, filter === 'following' && styles.filterTextActive]}>
              Following
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading fixtures...</Text>
            </View>
          ) : filteredFixtures.length > 0 ? (
            <FlatList
              data={filteredFixtures}
              renderItem={renderFixture}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          ) : (
            <View style={styles.noFixturesContainer}>
              <Ionicons name="calendar-outline" size={64} color="#ccc" />
              <Text style={styles.noFixturesText}>
                {filter === 'following' 
                  ? "No fixtures for your followed teams" 
                  : "No fixtures available"}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: "white",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  filterTextActive: {
    color: "#FF9800",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  fixtureCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  fixtureHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  matchInfo: {
    flex: 1,
  },
  matchTeams: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
  },
  matchDate: {
    fontSize: 14,
    color: "#666",
  },
  leagueBadge: {
    fontSize: 12,
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: "500",
    overflow: "hidden",
    marginLeft: 12,
  },
  matchLeague: {
    fontSize: 12,
    color: "#999",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  noFixturesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  noFixturesText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 16,
  },
});
