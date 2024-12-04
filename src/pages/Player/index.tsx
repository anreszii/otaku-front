import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAnimeStore } from "shared/stores";
import { useRoute } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useVideoPlayer, VideoView } from "expo-video";
import { PlayIcon } from "shared/icons";
import { BackButton } from "ui";
import { cleanTitle } from "shared/helpers";
import MarqueeText from "react-native-marquee";
import Slider from "@react-native-community/slider";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

const Player = () => {
  const { fetchAnimeUrl, currentAnime } = useAnimeStore();

  const { episodeLink } = useRoute().params as { episodeLink: string };

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = false;
    player.play();
    player.muted = true;
  });

  useEffect(() => {
    const fetchVideoUrl = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
      const response = await fetchAnimeUrl(episodeLink);
      const formatLink = (link: string) => {
        if (!link.includes("https:")) return `https:${link}`;

        return link;
      };

      setVideoUrl(formatLink(response.links["720"].Src));
      setIsLoading(false);
    };

    setIsLoading(true);
    if (episodeLink) {
      fetchVideoUrl();
    }
  }, [episodeLink]);

  return (
    <View style={styles.container}>
      <VideoView style={styles.video} player={player} nativeControls={false} />
      <SafeAreaView style={styles.controlsContainer}>
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
          <BackButton />
        </View>
        <View style={styles.centerContainer}>
          <TouchableOpacity activeOpacity={0.7}>
            <PlayIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#fff"
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  controlsContainer: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, .5)",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat",
    color: "#fff",
  },
  centerContainer: {
    alignItems: "center",
  },
  bottomContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
});

export default Player;
