import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CalendarGridProps {
  days: number;
  firstDay: number;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  getMatchesForDate: (date: Date) => any[];
  styles: any;
}

export default function CalendarGrid({ days, firstDay, selectedDate, setSelectedDate, getMatchesForDate, styles }: CalendarGridProps) {
  const weeks = [];
  let daysRow = [];

  for (let i = 0; i < firstDay; i++) {
    daysRow.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
  }

  for (let day = 1; day <= days; day++) {
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    const isToday = new Date().toDateString() === date.toDateString();
    const hasMatch = getMatchesForDate(date).length > 0;

    daysRow.push(
      <TouchableOpacity
        key={day}
        style={[
          styles.calendarDay,
          isToday && styles.today,
          hasMatch && styles.hasEvents,
        ]}
        onPress={() => setSelectedDate(date)}
      >
        <Text style={[styles.dayText, isToday && styles.todayText]}>{day}</Text>
        {hasMatch && <View style={styles.eventDot} />}
      </TouchableOpacity>
    );

    if (daysRow.length === 7) {
      weeks.push(
        <View key={`week-${day}`} style={styles.calendarWeek}>
          {daysRow}
        </View>
      );
      daysRow = [];
    }
  }

  if (daysRow.length > 0) {
    while (daysRow.length < 7) {
      daysRow.push(
        <View key={`empty-end-${daysRow.length}`} style={styles.calendarDay} />
      );
    }
    weeks.push(
      <View key="last-week" style={styles.calendarWeek}>
        {daysRow}
      </View>
    );
  }

  return <>{weeks}</>;
}
