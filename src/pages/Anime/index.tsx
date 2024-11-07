import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useRoute } from "@react-navigation/native";
import { Layout } from "components";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { BackButton, Button, Skeleton, Typography } from "ui";
import { useAnimeStore } from "shared/stores";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "@react-native-community/blur";
import MarqueeText from "react-native-marquee";
import {
  ArrowRightIcon,
  PlayIcon,
  SavedIcon,
  ShareIcon,
  StarIcon,
} from "shared/icons";

const Anime = () => {
  const { title } = useRoute().params as { title: string };
  const { fetchAnime, currentAnime } = useAnimeStore();
  const [isLoading, setIsLoading] = useState(true);
  const animatedIndex = useSharedValue(0);
  const { top } = useSafeAreaInsets();

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

  useEffect(() => {
    animatedIndex.value = 0;
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchAnimeAsync = async () => {
      await fetchAnime(title);
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    };
    fetchAnimeAsync();
  }, [title]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            paddingTop: top > 0 ? top : 15,
            paddingBottom: 15,
          },
          headerAnimatedStyle,
        ]}
      >
        <BackButton style={styles.backButton} />
        <View style={styles.headerTitleContainer}>
          <MarqueeText
            style={styles.headerTitle}
            speed={0.5}
            marqueeOnStart
            loop
            delay={4000}
          >
            {currentAnime?.title}
          </MarqueeText>
        </View>
      </Animated.View>
      {!isLoading ? (
        <View style={styles.posterContainer}>
          <Image
            source={{ uri: currentAnime?.material_data.poster_url }}
            style={styles.posterBlur}
            contentFit="cover"
          />
          <BlurView style={styles.posterBlur} blurType="dark" blurAmount={10} />
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
                {currentAnime?.title}
              </Typography>
              <View style={styles.actions}>
                <TouchableOpacity>
                  <SavedIcon focus />
                </TouchableOpacity>
                <TouchableOpacity>
                  <ShareIcon />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <TouchableOpacity style={styles.ratingItem}>
                <StarIcon />
                <Typography fontFamily="Urbanist" style={styles.infoText}>
                  {currentAnime?.material_data.shikimori_rating}
                </Typography>
                <ArrowRightIcon />
              </TouchableOpacity>
              <Typography fontFamily="Urbanist" style={styles.yearText}>
                {currentAnime.year}
              </Typography>
              <Typography fontFamily="Urbanist" style={styles.durationText}>
                ~{currentAnime.material_data.duration} мин
              </Typography>
              <Typography fontFamily="Urbanist" style={styles.countryText}>
                {currentAnime.material_data.countries?.[0]}
              </Typography>
            </View>
            <Button variant="contain" title="Смотреть" />
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
                    <TouchableOpacity style={styles.episodePlay}>
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
    zIndex: 1,
    transform: [{ translateY: 20 }],
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
  actions: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
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
});

export default Anime;
