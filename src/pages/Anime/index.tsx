import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Share as Sharing,
} from "react-native";
import { BackButton, Button, Select, Skeleton, Typography } from "ui";
import { useAnimeStore } from "shared/stores";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "@react-native-community/blur";
import MarqueeText from "react-native-marquee";
import { PlayIcon, StarIcon } from "shared/icons";
import useFavoriteStore from "shared/stores/favoriteStore";
import { cleanTitle } from "shared/helpers";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation";
import * as ScreenOrientation from "expo-screen-orientation";
import { Ionicons } from "@expo/vector-icons";

const statusOptions = [
  { label: "Просмотрено", value: "watch", color: "#3cce7b" },
  { label: "Смотрю", value: "viewed", color: "#ff9b3f" },
  { label: "Запланировано", value: "planned", color: "#1A80E5" },
  { label: "Заброшено", value: "aside", color: "#FF3333" },
];

const Anime = () => {
  const { title } = useRoute().params as { title: string };

  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const { top } = useSafeAreaInsets();
  const navigation = useTypedNavigation();

  const { fetchAnime, currentAnime, setCurrentAnime } = useAnimeStore();
  const { addList, removeList, checkInList, favorite } = useFavoriteStore();

  const animatedIndex = useSharedValue(0);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(
    () => ["50%", Dimensions.get("window").height - top - 15],
    []
  );

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const interpolatedValue = interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      "clamp"
    );

    return {
      opacity: withSpring(interpolatedValue, {
        damping: 20,
        stiffness: 150,
        mass: 0.4,
      }),
    };
  });

  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    }, [])
  );

  useEffect(() => {
    animatedIndex.value = 0;

    return () => {
      setCurrentAnime(undefined);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchAnimeAsync = async () => {
      await fetchAnime(title);
    };
    fetchAnimeAsync();
  }, [title]);

  useEffect(() => {
    if (currentAnime && favorite.length > 0) {
      const animeList = checkInList(currentAnime.title);
      if (animeList) {
        setSelectedStatus(animeList.status);
      }
      setIsLoading(false);
    }
  }, [currentAnime, favorite]);

  const handleStatusChange = async (value: string) => {
    if (currentAnime) {
      const animeList = checkInList(currentAnime.title);
      if (typeof animeList !== "boolean" && animeList.status === value) {
        await removeList(animeList._id);
        setSelectedStatus(null);
      } else {
        await addList(currentAnime.title, value);
        setSelectedStatus(value);
      }
    }
  };

  const startWatch = (link: string) => {
    navigation.navigate("Player", {
      episodeLink: link,
    });
  };

  const handleShare = async () => {
    const url = `otaku://127.0.0.1/anime?title=${encodeURIComponent(title)}`;

    const shareOptions = {
      title: `Посмотри аниме: ${title}`,
      message: url,
    };

    await Sharing.share(shareOptions);
  };

  return (
    <>
      <View style={styles.container}>
        <BackButton style={[styles.backButton, { top: top > 0 ? top : 20 }]} />
        {!isLoading && currentAnime && (
          <Animated.View
            style={[
              styles.header,
              {
                paddingTop: top > 0 ? top : 15,
                paddingBottom: 25,
              },
              headerAnimatedStyle,
            ]}
          >
            <View style={[styles.headerTitleContainer, { marginTop: 5 }]}>
              <MarqueeText
                style={styles.headerTitle}
                speed={0.5}
                marqueeOnStart
                loop
                delay={4000}
              >
                {cleanTitle(currentAnime?.title || "")}
              </MarqueeText>
            </View>
          </Animated.View>
        )}
        {!isLoading ? (
          <View style={styles.posterContainer}>
            <Image
              source={{ uri: currentAnime?.material_data.poster_url }}
              style={styles.posterBlur}
              contentFit="cover"
            />
            <BlurView
              style={styles.posterBlur}
              blurType="dark"
              blurAmount={10}
            />
            <Image
              source={{ uri: currentAnime?.material_data.poster_url }}
              style={styles.posterMain}
              contentFit="contain"
            />
          </View>
        ) : (
          <Skeleton style={styles.poster} />
        )}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          animatedIndex={animatedIndex}
          enablePanDownToClose={false}
          enableOverDrag={false}
          enableDynamicSizing={false}
          index={0}
          backgroundStyle={styles.bottomSheetBackground}
          animateOnMount={false}
          handleComponent={null}
        >
          {!isLoading && currentAnime && (
            <BottomSheetScrollView
              contentContainerStyle={styles.contentContainer}
            >
              <View style={styles.titleContainer}>
                <Typography fontFamily="Urbanist" style={styles.title}>
                  {cleanTitle(currentAnime.title)}
                </Typography>
                <TouchableOpacity activeOpacity={0.7} onPress={handleShare}>
                  <Ionicons name="share-outline" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              <Select
                value={selectedStatus}
                onChange={handleStatusChange}
                options={statusOptions}
                placeholder="Добавить в список"
                style={styles.statusSelect}
              />
              <View style={styles.infoContainer}>
                <TouchableOpacity activeOpacity={0.7} style={styles.ratingItem}>
                  <StarIcon />
                  <Typography fontFamily="Urbanist" style={styles.infoText}>
                    {currentAnime?.material_data.shikimori_rating}
                  </Typography>
                  <Ionicons name="chevron-forward-outline" size={16} color="#1A80E5" />
                </TouchableOpacity>
                <Typography fontFamily="Urbanist" style={styles.yearText}>
                  {currentAnime.year}
                </Typography>
                <Typography fontFamily="Urbanist" style={styles.durationText}>
                  ~{currentAnime.material_data.duration} мин
                </Typography>
                <Typography fontFamily="Urbanist" style={styles.ageRating}>
                  {currentAnime.material_data.minimal_age}+
                </Typography>
                <Typography fontFamily="Urbanist" style={styles.countryText}>
                  {currentAnime.material_data.countries?.[0]}
                </Typography>
              </View>
              <Button
                variant="contain"
                title="Смотреть"
                onPress={() => startWatch(currentAnime.seasons[0].link!)}
              />
              <Typography style={styles.genres}>
                Жанры: {currentAnime.material_data.anime_genres?.join(", ")}
              </Typography>
              <Typography style={styles.description}>
                {currentAnime.material_data.description}
              </Typography>
              <View style={styles.episodesContainer}>
                <Typography style={styles.episodeTitle}>Серии</Typography>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.episodesContent}
                >
                  {currentAnime.seasons.map((episode) => (
                    <View key={episode.number}>
                      <Image
                        source={{ uri: episode.screenshots[0] }}
                        style={styles.episodeImage}
                        contentFit="cover"
                      />
                      <BlurView
                        style={styles.episodeBlur}
                        blurType="dark"
                        blurAmount={2}
                      />
                      <Typography
                        fontFamily="Urbanist"
                        style={styles.episodeNumber}
                      >
                        {episode.number}
                      </Typography>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.episodePlay}
                        onPress={() => startWatch(episode.link)}
                      >
                        <PlayIcon />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </BottomSheetScrollView>
          )}
        </BottomSheet>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1218",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0B1218",
    zIndex: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 20,
    zIndex: 1000,
  },
  headerTitleContainer: {
    width: "60%",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat",
    color: "#fff",
  },
  posterContainer: {
    width: "100%",
    height: "55%",
    backgroundColor: "#2E2F3A",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  posterBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  posterMain: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").height * 0.35,
  },
  poster: {
    width: "100%",
    height: "55%",
  },
  bottomSheetBackground: {
    backgroundColor: "#0B1218",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    width: "80%",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoText: {
    fontWeight: "500",
    fontSize: 16,
  },
  ratingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  yearText: {
    fontWeight: "500",
    fontSize: 16,
  },
  durationText: {
    fontWeight: "500",
    fontSize: 16,
  },
  ageRating: {
    fontWeight: "500",
    fontSize: 16,
    color: "#FF9B3F",
  },
  countryText: {
    fontWeight: "500",
    fontSize: 16,
  },
  genres: {
    fontSize: 16,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    marginTop: 20,
    lineHeight: 20,
  },
  episodesContainer: {
    marginTop: 20,
  },
  episodesContent: {
    gap: 20,
    marginTop: 10,
  },
  episodeImage: {
    width: 200,
    height: 120,
    borderRadius: 10,
  },
  episodeTitle: {
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 10,
  },
  episodeBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
  },
  episodeNumber: {
    fontWeight: "600",
    fontSize: 20,
    position: "absolute",
    top: 10,
    left: 10,
  },
  episodePlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown: {
    backgroundColor: "#2E2F3A",
    borderRadius: 8,
    padding: 8,
    width: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    padding: 12,
    borderRadius: 4,
  },
  dropdownTitle: {
    fontWeight: "500",
    fontSize: 16,
  },
  statusSelect: {
    marginBottom: 20,
  },
});

export default Anime;
