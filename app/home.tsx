import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { Link } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useMatches } from "../components/MatchesContext";
import { FootballDataMatch, getFollowedTeams, getLeagueBadgeForMatch, getNextMatchForTeams, getUpcomingMatchesForTeams } from "../lib/leagues";
import { registerForPushNotificationsAsync } from "../utils/notifications";

const { width } = Dimensions.get("window");
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const QUICK_ACTIONS = [
  {
    label: "Pick Teams \n(En, Ge, Sp, Fr, It)",
    route: "./teams" as const,
    color: "#1976D2",
  },
  {
    label: "Calendar",
    route: "./calendar" as const,
    color: "#2E7D32",
  },
  {
    label: "Score Table",
    route: "./score-table" as const,
    color: "#FF9800",
  },
  {
    label: "Settings",
    route: "./settings" as const,
    color: "#607D8B",
  },
];

interface CircularProgressProps {
  nextMatch: FootballDataMatch | null;
}

function CircularProgress({ nextMatch }: CircularProgressProps) {
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    if (!nextMatch) return;
    const update = () => {
      const now = new Date();
      const matchDate = new Date(nextMatch.utcDate);
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
    const matchDate = new Date(nextMatch.utcDate);
    total = Math.floor((matchDate.getTime() - now.setHours(0, 0, 0, 0)) / 1000);
    progress = remaining / total;
  }

  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;
  
  let timeString;
  if (days > 0) {
    timeString = `${days}:${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else {
    timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  const size = width * 0.55;
  const strokeWidth = 12;
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
            ? `Next match: ${nextMatch.homeTeam.shortName} vs ${nextMatch.awayTeam.shortName}`
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

export default function HomeScreen() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token);
    })();
  }, []);

  useEffect(() => {
    if (!upcomingMatches || upcomingMatches.length === 0) return;
    (async () => {
      for (const match of upcomingMatches) {
        const matchDate = new Date(match.utcDate);
        const now = Date.now();
        const fiveHoursBefore = matchDate.getTime() - (5 * 60 + 0) * 60 * 1000;
        const fiveHoursSeconds = Math.floor((fiveHoursBefore - now) / 1000);
        if (fiveHoursSeconds > 0) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: `Upcoming Match: ${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`,
              body: `Starts at ${matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
              sound: true,
            },
            trigger: { seconds: fiveHoursSeconds, repeats: false, type: 'timeInterval' } as any,
          });
        }
      }
    })();
  }, [upcomingMatches]);
  const [followedTeams, setFollowedTeams] = useState<string[]>([]);
  const [nextMatch, setNextMatch] = useState<FootballDataMatch | null>(null);
  const { matches: allMatches, loading } = useMatches();
  const [upcomingMatches, setUpcomingMatches] = useState<FootballDataMatch[]>([]);
  // const [debugInfo, setDebugInfo] = useState<string>('');

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const loadData = async () => {
        try {
          const teams = await getFollowedTeams();
          const { ALL_TEAMS } = await import('../lib/leagues');
          const followedTLAs = teams
            .map(id => {
              const team = ALL_TEAMS.find(t => t.id === id);
              return team ? team.shortName : null;
            })
            .filter((tla): tla is string => Boolean(tla));
          if (teams.length > 0) {
            if (allMatches.length === 0) {
              if (isActive) {
                setFollowedTeams(teams);
                setNextMatch(null);
                setUpcomingMatches([]);
              }
              return;
            }
            const nextMatchData = getNextMatchForTeams(allMatches, followedTLAs);
            const teamMatches = getUpcomingMatchesForTeams(allMatches, followedTLAs, 5);
            if (isActive) {
              setFollowedTeams(teams);
              setNextMatch(nextMatchData);
              setUpcomingMatches(teamMatches);
            }
          } else {
            if (isActive) {
              setFollowedTeams([]);
              setNextMatch(null);
              setUpcomingMatches([]);
            }
          }
        } catch (error: any) {
        }
      };
      loadData();
      return () => { isActive = false; };
    }, [allMatches])
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { backgroundColor: '#8e1a1aff' }]}> 
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <Text style={styles.greeting}>Match Follower</Text>
            <TouchableOpacity 
              style={styles.notificationBox}
              activeOpacity={0.7}
            >
              <Ionicons name="notifications-outline" size={20} color="white" />
              {upcomingMatches.length > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>{upcomingMatches.length}</Text>
                </View>
              )}
            </TouchableOpacity>
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
            {upcomingMatches.length > 0 && (
              <Link href="./fixtures" asChild>
                <TouchableOpacity style={styles.moreButton}>
                  <Text style={styles.moreButtonText}>More</Text>
                  <Ionicons name="chevron-forward" size={16} color="#1976D2" />
                </TouchableOpacity>
              </Link>
            )}
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
          ) : upcomingMatches.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No upcoming matches found for your teams.</Text>
            </View>
          ) : (
            upcomingMatches.map(match => {
              const leagueBadge = getLeagueBadgeForMatch(match);
              return (
                <View key={match.id} style={styles.matchCard}>
                  <View style={[styles.matchBadge, { backgroundColor: `${leagueBadge.color}15` }]}>
                    <Ionicons name="football" size={24} color={leagueBadge.color} />
                  </View>
                  <View style={styles.matchInfo}>
                    <View style={styles.matchHeader}>
                      <Text style={styles.matchTeams}>
                        {match.homeTeam.shortName} vs {match.awayTeam.shortName}
                      </Text>
                      <Text style={[styles.leagueBadge, { backgroundColor: leagueBadge.color }]}>
                        {leagueBadge.flag} {leagueBadge.name}
                      </Text>
                    </View>
                    <Text style={styles.matchDetails}>
                      Matchday {match.matchday}
                    </Text>
                    <Text style={styles.matchTimeText}>
                      {new Date(match.utcDate).toLocaleString('en-GB')}
                    </Text>
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
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    opacity: 0.9,
  },
  notificationBox: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  notificationBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
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
  matchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  matchTeams: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  leagueBadge: {
    fontSize: 10,
    color: "white",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    fontWeight: "500",
    overflow: "hidden",
  },
  matchDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
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
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  progressDetails: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  progressRing: {
    transform: [{ rotate: "-90deg" }],
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
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(25, 118, 210, 0.1)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1976D2",
  },
  moreButtonText: {
    fontSize: 14,
    color: "#1976D2",
    fontWeight: "600",
    marginRight: 4,
  },
});