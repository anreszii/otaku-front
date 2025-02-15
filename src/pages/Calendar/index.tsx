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
import { Qualifier } from "shared/icons";
import { FlashList } from "@shopify/flash-list";
import { cleanTitle } from "shared/helpers";

type OngoingItem = {
  id: string;
  screenshots: string[];
  title: string;
  material_data: {
    next_episode_at?: string;
    episodes_aired: number;
  };
};

const Calendar = () => {
  const [currentWeekDays, setCurrentWeekDays] = useState<WeekDay[]>([]);

  const currentWeekDaysRef = useRef<WeekDay[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const layoutRef = useRef<ScrollView>(null);

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
    scrollToDay(index);
    setCurrentWeekDays(newDays);
  };

  const formatTimeToLocal = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, "HH:mm");
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > Math.abs(dy) * 2 && Math.abs(dx) > 20;
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx } = gestureState;
        const SWIPE_THRESHOLD = 50;

        if (scrollViewRef.current) {
          scrollViewRef.current.setNativeProps({ scrollEnabled: true });
        }

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
      x: index * 80,
      animated: true,
    });
    layoutRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const renderItem = ({ item: ongoing }: { item: OngoingItem }) => (
    <View style={styles.ongoingWrapper}>
      <View style={styles.ongoingQualifier}>
        <Qualifier />
        <Typography fontFamily="Urbanist" style={styles.ongoingTime}>
          {formatTimeToLocal(ongoing.material_data.next_episode_at || "")}
        </Typography>
      </View>
      <View style={styles.ongoing}>
        <Image
          source={{ uri: ongoing.screenshots[0] }}
          style={styles.ongoingImage}
        />
        <View style={styles.ongoingInfo}>
          <Typography fontFamily="Montserrat" style={styles.ongoingTitle}>
            {cleanTitle(ongoing.title).length > 50
              ? cleanTitle(ongoing.title).slice(0, 50) + "..."
              : cleanTitle(ongoing.title)}
          </Typography>
          <Typography fontFamily="Urbanist" style={styles.ongoingTime}>
            {ongoing.material_data.episodes_aired + 1} серия
          </Typography>
        </View>
      </View>
    </View>
  );

  const EmptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Typography fontFamily="Montserrat" style={styles.emptyListTitle}>
          Отсутствуют запланированные релизы в этот день
        </Typography>
      </View>
    );
  };

  return (
    <Layout noMargin scroll scrollRef={layoutRef} {...panResponder.panHandlers}>
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
                { borderColor: day.focus ? "#fff" : "#1A80E5" },
              ]}
              key={day.numberOfWeek}
              activeOpacity={0.7}
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
        <View style={styles.content}>
          {currentWeekDays.map(
            (day, index) =>
              day.focus && (
                <FlashList
                  key={index}
                  data={day.ongoings}
                  renderItem={renderItem}
                  estimatedItemSize={125}
                  ListEmptyComponent={<EmptyList />}
                  ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                />
              )
          )}
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
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
    backgroundColor: "#1A80E5",
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
    flex: 1,
  },
  ongoingWrapper: {
    gap: 10,
  },
  ongoingQualifier: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
  },
  emptyListContainer: {
    marginTop: 100,
  },
  emptyListTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Calendar;
