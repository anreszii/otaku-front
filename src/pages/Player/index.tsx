import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAnimeStore } from "shared/stores";
import { useRoute } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { AVPlaybackStatus, Video } from "expo-av";
import { PauseIcon, PlayFillIcon, PlayIcon } from "shared/icons";
import { BackButton, Loader, Typography } from "ui";
import { cleanTitle } from "shared/helpers";
import MarqueeText from "react-native-marquee";
import Slider from "@ptomasroos/react-native-multi-slider";
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const Player = () => {
  const { fetchAnimeUrl, currentAnime } = useAnimeStore();

  const { episodeLink } = useRoute().params as { episodeLink: string };

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const videoRef = useRef<Video>(null);

  const opacity = useSharedValue(0);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      await ScreenOrientation.unlockAsync();
      const response = await fetchAnimeUrl(episodeLink);
      const formatLink = (link: string) => {
        if (!link.includes("https:")) return `https:${link}`;

        return link;
      };

      setVideoUrl(formatLink(response.links["720"].Src));
    };

    setIsLoading(true);
    if (episodeLink) {
      fetchVideoUrl();
    }
  }, [episodeLink]);

  const togglePlay = async () => {
    if (isPlaying) {
      await videoRef.current?.pauseAsync();
      setIsPlaying(false);
    } else {
      await videoRef.current?.playAsync();
      setIsPlaying(true);
    }
  };

  const handleLoad = async (status: AVPlaybackStatus) => {
    await videoRef.current?.playAsync();
    if (status.isLoaded && status.durationMillis) {
      setDuration(status.durationMillis);
      setIsLoading(false);
    }
  };

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.positionMillis) {
      setVideoTime(status.positionMillis);
    }
  };

  const handleSeek = async (values: number[]) => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(values[0]);
    }
  };

  const resetControlsTimer = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    controlsTimeoutRef.current = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 300 });
      setShowControls(false);
    }, 4000);
  };

  const handleShowControls = () => {
    const showControlsValue = !showControls;
    setShowControls(showControlsValue);

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    opacity.value = withTiming(showControlsValue ? 1 : 0, { duration: 300 });

    if (showControlsValue) {
      resetControlsTimer();
    }
  };

  const handleSlidingStart = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  const handleSlidingComplete = () => {
    resetControlsTimer();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        onLoad={handleLoad}
        style={styles.video}
        useNativeControls={false}
        isLooping={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        isMuted={true}
        source={{
          uri: videoUrl || "",
        }}
      />
      <TouchableOpacity
        activeOpacity={1}
        style={StyleSheet.absoluteFill}
        onPress={handleShowControls}
      >
        <Animated.View style={[styles.controlsContainer, animatedStyle]}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
              <BackButton />
              <MarqueeText
                style={styles.headerTitle}
                speed={0.5}
                marqueeOnStart
                loop
                delay={4000}
              >
                {cleanTitle(currentAnime?.title || "")}
              </MarqueeText>
              <View style={styles.headerPlaceholderIcon} />
            </View>
            <View style={styles.centerContainer}>
              <TouchableOpacity activeOpacity={0.7} onPress={togglePlay}>
                {isLoading ? (
                  <Loader />
                ) : isPlaying ? (
                  <PauseIcon />
                ) : (
                  <PlayFillIcon />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.bottomContainer}>
              <Typography style={styles.time} fontFamily="Montserrat">
                {formatTime(videoTime)} / {formatTime(duration)}
              </Typography>
              <Slider
                containerStyle={styles.slider}
                values={[videoTime]}
                min={0}
                max={duration ? duration : 1}
                sliderLength={Dimensions.get("window").width - 40}
                onValuesChange={handleSeek}
                onValuesChangeStart={handleSlidingStart}
                onValuesChangeFinish={handleSlidingComplete}
                selectedStyle={styles.sliderSelected}
                markerStyle={styles.sliderMarker}
              />
            </View>
          </SafeAreaView>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  controlsContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, .7)",
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat",
    color: "#fff",
    width: "60%",
  },
  headerPlaceholderIcon: {
    width: 32,
    height: 31,
  },
  centerContainer: {
    alignItems: "center",
  },
  bottomContainer: {
    marginBottom: 15,
    marginHorizontal: 20,
  },
  slider: {
    height: 40,
    borderRadius: 100,
  },
  sliderSelected: {
    backgroundColor: "#1A80E5",
  },
  sliderMarker: {
    backgroundColor: "#1A80E5",
    borderWidth: 0,
    width: 16,
    height: 16,
  },
  time: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Player;
