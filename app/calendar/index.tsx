import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CalendarGrid from "../../components/CalendarGrid";
import { SUPER_LIG_TEAMS } from "../footballData/football";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const fixtures = require('../footballData/fixtures.json');

function getMonthMeta(date: Date) {
  const year = date.getFullYear(), month = date.getMonth();
  return {
    days: new Date(year, month + 1, 0).getDate(),
    firstDay: new Date(year, month, 1).getDay(),
  };
}

function getMatchesForDate(date: Date) {
  return fixtures.filter((m: any) => new Date(m.date).toDateString() === date.toDateString());
}

function CalendarScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { days, firstDay } = getMonthMeta(selectedDate);

  const renderMatchesForDate = () => {
    const matches = getMatchesForDate(selectedDate);
    if (!matches.length) return <Text style={{ color: '#888', fontSize: 16, textAlign: 'center', marginTop: 20 }}>No matches on this day.</Text>;
    return matches.map((match: any) => {
      const home = SUPER_LIG_TEAMS.find(t => t.id === match.homeTeam);
      const away = SUPER_LIG_TEAMS.find(t => t.id === match.awayTeam);
      return (
        <View key={match.id} style={styles.medicationCard}>
          <View style={[styles.medicationColor, { backgroundColor: home?.color || '#ccc' }]} />
          <View style={styles.medicationInfo}>
            <Text style={styles.medicationName}>{home?.name} vs {away?.name}</Text>
            <Text style={styles.medicationDosage}>Week {match.week} - {match.venue}</Text>
            <Text style={styles.medicationTime}>{new Date(match.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</Text>
          </View>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#1a8e2d" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Calendar</Text>
        </View>
        <View style={styles.calendarContainer}>
          <View style={styles.monthHeader}>
            <TouchableOpacity onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>
              <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.monthText}>{selectedDate.toLocaleString("default", { month: "long", year: "numeric" })}</Text>
            <TouchableOpacity onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>
              <Ionicons name="chevron-forward" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <View style={styles.weekdayHeader}>
            {WEEKDAYS.map(day => <Text key={day} style={styles.weekdayText}>{day}</Text>)}
          </View>
          <CalendarGrid
            days={days}
            firstDay={firstDay}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            getMatchesForDate={getMatchesForDate}
            styles={styles}
          />
        </View>
        <View style={styles.scheduleContainer}>
          <Text style={styles.scheduleTitle}>{selectedDate.toLocaleDateString("default", { weekday: "long", month: "long", day: "numeric" })}</Text>
          <ScrollView showsVerticalScrollIndicator={false}>{renderMatchesForDate()}</ScrollView>
        </View>
      </View>
    </View>
  );
}

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E7D32",
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    backgroundColor: "#2E7D32",
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
  calendarContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    margin: 20,
    padding: 15,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  weekdayHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  weekdayText: {
    flex: 1,
    textAlign: "center",
    color: "#666",
    fontWeight: "500",
  },
  calendarWeek: {
    flexDirection: "row",
    marginBottom: 5,
  },
  calendarDay: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontSize: 16,
    color: "#333",
  },
  today: {
    backgroundColor: "#1a8e2d15",
  },
  todayText: {
    color: "#1a8e2d",
    fontWeight: "600",
  },
  hasEvents: {
    position: "relative",
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#1a8e2d",
    position: "absolute",
    bottom: "15%",
  },
  scheduleContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  medicationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  medicationColor: {
    width: 12,
    height: 40,
    borderRadius: 6,
    marginRight: 15,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  medicationTime: {
    fontSize: 14,
    color: "#666",
  },
});
