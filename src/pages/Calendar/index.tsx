import React, { useEffect, useRef, useState } from "react";
import { Layout } from "components";
import { Typography } from "ui";
import { WeekDay } from "./types";
import { addDays, format, getDate } from "date-fns";
import { ru } from "date-fns/locale";
import {
  PanResponder,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import useOngoingsStore from "shared/stores/ongoingsStore";
import { Image } from "expo-image";

const Calendar = () => {
  const [currentWeekDays, setCurrentWeekDays] = useState<WeekDay[]>([]);

  const currentWeekDaysRef = useRef<WeekDay[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const { ongoings } = useOngoingsStore();

  const getCurrentWeekDays = (): WeekDay[] => {
    const today = new Date();
    const week: WeekDay[] = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(today, i);
      week.push({
        numberOfWeek: getDate(currentDate),
        dayOfWeek: format(currentDate, "EEE", { locale: ru }),
        date: currentDate,
        focus: i === 0,
        ongoings: [],
      });
    }

    ongoings.forEach((ongoing) => {
      const nextEpisodeDate = ongoing.material_data?.next_episode_at;
      if (nextEpisodeDate) {
        const episodeDate = new Date(nextEpisodeDate);
        const dayIndex = week.findIndex(
          (day) =>
            day.date.getDate() === episodeDate.getDate() &&
            day.date.getMonth() === episodeDate.getMonth() &&
            day.date.getFullYear() === episodeDate.getFullYear()
        );
        if (dayIndex !== -1) {
          week[dayIndex].ongoings.push(ongoing);
          week[dayIndex].ongoings.sort((a, b) => {
            const dateA = new Date(a.material_data.next_episode_at!);
            const dateB = new Date(b.material_data.next_episode_at!);
            return dateA.getTime() - dateB.getTime();
          });
        }
      }
    });

    return week;
  };

  useEffect(() => {
    setCurrentWeekDays(getCurrentWeekDays());
  }, []);

  useEffect(() => {
    currentWeekDaysRef.current = currentWeekDays;
  }, [currentWeekDays]);

  const handleDayPress = (day: WeekDay) => {
    const index = currentWeekDays.findIndex(
      (el) => el.dayOfWeek === day.dayOfWeek
    );
    const newDays = [...currentWeekDays.map((el) => ({ ...el, focus: false }))];
    newDays[index] = { ...newDays[index], focus: true };
    setCurrentWeekDays(newDays);
  };

  const formatTimeToLocal = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, "HH:mm");
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gestureState) => {
        const { dx } = gestureState;

        const SWIPE_THRESHOLD = 50;

        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          const currentIndex = currentWeekDaysRef.current.findIndex(
            (day) => day.focus
          );
          let newIndex;

          if (dx > 0 && currentIndex > 0) {
            newIndex = currentIndex - 1;
          } else if (
            dx < 0 &&
            currentIndex < currentWeekDaysRef.current.length - 1
          ) {
            newIndex = currentIndex + 1;
          }

          if (newIndex !== undefined) {
            const newDays = [
              ...currentWeekDaysRef.current.map((el) => ({
                ...el,
                focus: false,
              })),
            ];
            newDays[newIndex] = { ...newDays[newIndex], focus: true };
            setCurrentWeekDays(newDays);
            scrollToDay(newIndex);
          }
        }
      },
    })
  ).current;

  const scrollToDay = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * 85,
      animated: true,
    });
  };

  return (
    <Layout noMargin scroll>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          style={styles.header}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.headerContent}
        >
          {currentWeekDays.map((day) => (
            <TouchableOpacity
              style={[
                styles.day,
                { borderColor: day.focus ? "#fff" : "#4169E1" },
              ]}
              key={day.numberOfWeek}
              onPress={() => handleDayPress(day)}
            >
              <Typography fontFamily="Montserrat" style={styles.dayNumber}>
                {day.numberOfWeek}
              </Typography>
              <Typography fontFamily="Urbanist" style={styles.dayWeek}>
                {day.dayOfWeek}
              </Typography>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.content} {...panResponder.panHandlers}>
          {currentWeekDays.map(
            (day) =>
              day.focus &&
              day.ongoings.map((ongoing) => (
                <View key={ongoing.id} style={styles.ongoing}>
                  <Image
                    source={{ uri: ongoing.screenshots[0] }}
                    style={styles.ongoingImage}
                  />
                  <View style={styles.ongoingInfo}>
                    <Typography
                      fontFamily="Montserrat"
                      style={styles.ongoingTitle}
                    >
                      {ongoing.title}
                    </Typography>
                    <Typography
                      fontFamily="Urbanist"
                      style={styles.ongoingTime}
                    >
                      {formatTimeToLocal(
                        ongoing.material_data.next_episode_at!
                      )}
                    </Typography>
                  </View>
                </View>
              ))
          )}
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexGrow: 0,
  },
  headerContent: {
    gap: 10,
    paddingHorizontal: 20,
  },
  day: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#4169E1",
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  dayWeek: {
    fontWeight: "500",
    textAlign: "center",
  },
  content: {
    marginHorizontal: 20,
    marginTop: 25,
    gap: 10,
    flex: 1,
  },
  ongoing: {
    flexDirection: "row",
    gap: 10,
  },
  ongoingInfo: {
    flex: 1,
  },
  ongoingImage: {
    width: "40%",
    height: 100,
    borderRadius: 10,
  },
  ongoingTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  ongoingTime: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
  },
});

export default Calendar;
