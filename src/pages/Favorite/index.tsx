import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "components";
import { Skeleton, Typography } from "ui";
import { useFavoriteStore } from "shared/stores";
import { Image } from "expo-image";
import {
  GestureResponderEvent,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { IAnimeList } from "shared/types";
import { FlashList } from "@shopify/flash-list";
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation";

const favoriteOptions = [
  { label: "Просмотрено", value: "watch", color: "#3cce7b" },
  { label: "Смотрю", value: "viewed", color: "#ff9b3f" },
  { label: "Запланировано", value: "planned", color: "#1A80E5" },
  { label: "Заброшено", value: "aside", color: "#FF3333" },
];

const SkeletonItem = () => (
  <View style={styles.skeletonContainer}>
    <Skeleton style={styles.skeletonPoster} />
  </View>
);

const Favorite = () => {
  const { favorite, isLoading } = useFavoriteStore();

  const [selectedStatus, setSelectedStatus] = useState<string>("watch");

  const translateX = useSharedValue(0);
  const itemWidth = useSharedValue(0);
  const backgroundColor = useSharedValue(favoriteOptions[0].color);

  const scrollViewRef = useRef<ScrollView>(null);
  const itemRefs = useRef<View[]>([]);

  const { bottom } = useSafeAreaInsets();
  const navigation = useTypedNavigation();

  const handlePress = (value: string, event: GestureResponderEvent) => {
    const option = favoriteOptions.find((opt) => opt.value === value);
    const currentIndex = favoriteOptions.findIndex(
      (opt) => opt.value === value
    );

    scrollViewRef.current?.scrollTo({
      x: currentIndex * 120,
      animated: true,
    });

    backgroundColor.value = withTiming(option?.color || "#007AFF", {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    favoriteOptions.forEach((opt) => {
      textColors[opt.value].value = withTiming(
        opt.value === value ? opt.color : "#666",
        {
          duration: 300,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }
      );
    });
    const target = event.currentTarget;
    target.measureLayout(
      scrollViewRef.current as any,
      (x: number, y: number, width: number, height: number) => {
        translateX.value = withTiming(x + 16, {
          duration: 300,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
        itemWidth.value = withTiming(width - 32, {
          duration: 300,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      }
    );
    setSelectedStatus(value);
  };

  const textColors = favoriteOptions.reduce((acc, option, index) => {
    acc[option.value] = useSharedValue(index === 0 ? "#3cce7b" : "#666");
    return acc;
  }, {} as Record<string, Animated.SharedValue<string>>);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: itemWidth.value,
    backgroundColor: backgroundColor.value,
  }));

  const categorizedData = useMemo(() => {
    return favorite.filter((item) => item.status === selectedStatus);
  }, [favorite, selectedStatus]);

  const favoriteOptionsWithData = useMemo(() => {
    return favoriteOptions.map((option) => ({
      ...option,
      data: favorite.filter((item) => item.status === option.value),
    }));
  }, [favorite]);

  const renderHeader = () => (
    <View style={styles.headerWrapper}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.headerContent}
      >
        <View style={styles.headerItems}>
          <Animated.View style={[styles.animatedBorder, animatedStyle]} />
          {favoriteOptionsWithData.map((option, index) => {
            const textStyle = useAnimatedStyle(() => ({
              color: textColors[option.value].value,
            }));

            return (
              <Pressable
                ref={(el) => {
                  if (el) {
                    itemRefs.current[index] = el;
                  }
                }}
                key={option.value}
                onLayout={(event) => {
                  if (option.value === selectedStatus) {
                    const target = event.currentTarget as any;
                    target.measureLayout(
                      scrollViewRef.current as any,
                      (x: number, y: number, width: number, height: number) => {
                        translateX.value = x + 16;
                        itemWidth.value = width - 32;
                      }
                    );
                  }
                }}
                style={styles.headerItem}
                onPress={(event) => handlePress(option.value, event)}
              >
                <Animated.Text style={[styles.headerText, textStyle]}>
                  {option.label} ({option.data.length})
                </Animated.Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );

  const currentStatusRef = useRef(selectedStatus);

  useEffect(() => {
    currentStatusRef.current = selectedStatus;
  }, [selectedStatus]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > Math.abs(dy) * 2 && Math.abs(dx) > 20;
      },
      onPanResponderRelease: (e, gestureState) => {
        const { dx } = gestureState;
        const SWIPE_THRESHOLD = 50;

        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          const currentIndex = favoriteOptions.findIndex(
            (opt) => opt.value === currentStatusRef.current
          );
          let newIndex: number | undefined;

          if (dx > 0 && currentIndex > 0) {
            newIndex = currentIndex - 1;
          } else if (dx < 0 && currentIndex < favoriteOptions.length - 1) {
            newIndex = currentIndex + 1;
          }

          if (newIndex !== undefined) {
            const target = itemRefs.current[newIndex];
            scrollViewRef.current?.scrollTo({
              x: newIndex * 120,
              animated: true,
            });

            target?.measureLayout(
              scrollViewRef.current as any,
              (x: number, y: number, width: number, height: number) => {
                const syntheticEvent = {
                  currentTarget: target,
                  target: target,
                } as GestureResponderEvent;

                handlePress(favoriteOptions[newIndex].value, syntheticEvent);
              }
            );
          }
        }
      },
    })
  ).current;

  const FavoriteItem = ({ item }: { item: IAnimeList }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.favoriteContainer}
        onPress={() =>
          navigation.navigate("Anime", { title: item.animeData?.title! })
        }
      >
        <Image
          source={{ uri: item.animeData?.material_data.poster_url }}
          style={styles.poster}
          contentFit="cover"
        />
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <Layout noMargin>
        <View style={styles.header}>{renderHeader()}</View>
        <FlashList
          data={Array.from({ length: 6 })}
          renderItem={() => <SkeletonItem />}
          estimatedItemSize={250}
          numColumns={2}
          contentContainerStyle={{ paddingTop: 8, paddingHorizontal: 8 }}
        />
      </Layout>
    );
  }

  const EmptyList = () => (
    <View style={styles.emptyList}>
      <Typography style={styles.emptyListTitle} fontFamily="Montserrat">
        Список пуст
      </Typography>
    </View>
  );

  return (
    <Layout noMargin>
      <View style={styles.header}>{renderHeader()}</View>
      <View {...panResponder.panHandlers} style={styles.container}>
        {!categorizedData.length ? (
          <EmptyList />
        ) : (
          <FlashList
            data={categorizedData}
            renderItem={({ item }) => <FavoriteItem item={item} />}
            estimatedItemSize={250}
            numColumns={2}
            contentContainerStyle={{
              paddingTop: 8,
              paddingHorizontal: 8,
              paddingBottom: 40,
            }}
          />
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    height: 50,
  },
  emptyList: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginBottom: 100,
  },
  emptyListTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  header: {
    paddingBottom: 15,
  },
  headerContent: {},
  headerItems: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    position: "relative",
  },
  headerItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    alignItems: "center",
  },
  animatedBorder: {
    position: "absolute",
    bottom: 0,
    height: 2,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  headerTextActive: {
    color: "#007AFF",
  },
  skeletonContainer: {
    flex: 1,
    height: 250,
    margin: 10,
  },
  favoriteContainer: {
    height: 250,
    width: "100%",
    margin: 8,
    borderRadius: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
  },
  poster: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  skeletonPoster: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default Favorite;
