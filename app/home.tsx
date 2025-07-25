import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
import { Link, useFocusEffect } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { getFollowedTeams, Match, SUPER_LIG_FIXTURES, SUPER_LIG_TEAMS } from "./footballData/football";

const { width } = Dimensions.get("window");
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const QUICK_ACTIONS = [
  {
    label: "Pick Teams",
    route: "./teams" as const,
    color: "#1976D2",
  },
  {
    label: "Calendar",
    route: "./calendar" as const,
    color: "#2E7D32",
  },
];


interface CircularProgressProps {
  nextMatch: Match | null;
}

function CircularProgress({ nextMatch }: CircularProgressProps) {
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    if (!nextMatch) return;
    const update = () => {
      const now = new Date();
      const matchDate = new Date(nextMatch.date);
      setRemaining(Math.max(0, Math.floor((matchDate.getTime() - now.getTime()) / 1000)));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [nextMatch]);

  let progress = 1;
  let total = 0;
  if (nextMatch) {
    const now = new Date();
    const matchDate = new Date(nextMatch.date);
    total = Math.floor((matchDate.getTime() - now.setHours(0, 0, 0, 0)) / 1000);
    progress = remaining / total;
  }

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;
  const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const size = width * 0.55;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const animatedValue = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressPercentage}>{timeString}</Text>
        <Text style={styles.progressDetails}>
          {nextMatch
            ? `Next match: ${nextMatch.homeTeam.toUpperCase()} vs ${nextMatch.awayTeam.toUpperCase()}`
            : "No upcoming matches"}
        </Text>
      </View>
      <Svg width={size} height={size} style={styles.progressRing}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="white"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    </View>
  );
}


const getNextMatch = (teamIds: string[]) => getUpcomingMatches(teamIds, 1)[0] || null;
const getUpcomingMatches = (teamIds: string[], count = 5) => {
  const now = new Date();
  return SUPER_LIG_FIXTURES
    .filter(m => (teamIds.includes(m.homeTeam) || teamIds.includes(m.awayTeam)) && new Date(m.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, count);
};
const getTeam = (id: string) => SUPER_LIG_TEAMS.find(t => t.id === id);


export default function HomeScreen() {
  const [followedTeams, setFollowedTeams] = useState<string[]>([]);
  const [nextMatch, setNextMatch] = useState<Match | null>(null);
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      (async () => {
        const teams = await getFollowedTeams();
        if (isActive) {
          setFollowedTeams(teams);
          setNextMatch(getNextMatch(teams));
        }
      })();
      return () => { isActive = false; };
    }, [])
  );
  const matches = getUpcomingMatches(followedTeams, 5);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { backgroundColor: '#8e1a1aff' }]}> 
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <Text style={styles.greeting}>Süper Lig Match Follower</Text>
          </View>
          <CircularProgress nextMatch={nextMatch} />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.quickActionsContainer}>
          <View style={styles.quickActionsGrid}>
            {QUICK_ACTIONS.map((action) => (
              <Link href={action.route} key={action.label} asChild>
                <TouchableOpacity style={styles.actionButton}>
                  <View style={[styles.actionGradient, { backgroundColor: action.color }]}> 
                    <View style={styles.actionContent}>
                      <Text style={styles.actionLabel}>{action.label}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Matches</Text>
          </View>
          {followedTeams.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="football-outline" size={48} color="#ccc" />
              <Text style={styles.emptyStateText}>You are not following any teams.</Text>
              <Link href="./teams" asChild>
                <TouchableOpacity style={styles.teamPickButton}>
                  <Text style={styles.teamPickButtonText}>Pick Teams</Text>
                </TouchableOpacity>
              </Link>
            </View>
          ) : matches.length === 0 ? (
            <Text style={styles.emptyStateText}>No upcoming matches for your teams.</Text>
          ) : (
            matches.map(match => {
              const home = getTeam(match.homeTeam);
              const away = getTeam(match.awayTeam);
              return (
                <View key={match.id} style={styles.matchCard}>
                  <View style={[styles.matchBadge, { backgroundColor: `${home?.color || '#eee'}15` }]}> 
                    <Ionicons name="football" size={24} color={home?.color || '#333'} />
                  </View>
                  <View style={styles.matchInfo}>
                    <Text style={styles.matchTeams}>{home?.name} vs {away?.name}</Text>
                    <Text style={styles.matchDetails}>Week {match.week} - {match.venue}</Text>
                    <Text style={styles.matchTimeText}>{new Date(match.date).toLocaleString('tr-TR')}</Text>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerContent: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 15,
  },
  actionButton: {
    width: (width - 52) / 2,
    height: 110,
    borderRadius: 16,
    overflow: "hidden",
  },
  actionGradient: {
    flex: 1,
    padding: 15,
  },
  actionContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    marginTop: 8,
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 5,
  },
  seeAllButton: {
    color: "#2E7D32",
    fontWeight: "600",
  },
  matchCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  matchBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  matchInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  matchTeams: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  matchDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  matchTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  matchTimeText: {
    marginLeft: 5,
    color: "#666",
    fontSize: 14,
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  progressTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  progressPercentage: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
  progressLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 4,
  },
  progressRing: {
    transform: [{ rotate: "-90deg" }],
  },
  flex1: {
    flex: 1,
  },

  /* belki sağ üste?
  notificationButton: {
    position: "relative",
  },
  notificationBadge: {
  },
  */

  progressDetails: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  emptyState: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "white",
    borderRadius: 0,
    marginTop: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    marginBottom: 20,
  },
  teamPickButton: {
    backgroundColor: "#1976D2",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  teamPickButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
