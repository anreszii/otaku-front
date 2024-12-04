import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useAnimeStore } from "shared/stores";
import { useRoute } from "@react-navigation/native";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";

const Player = () => {
  const { fetchAnimeUrl } = useAnimeStore();

  const { episodeLink } = useRoute().params as { episodeLink: string };

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
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
      <Video
        source={{ uri: videoUrl || "" }}
        style={styles.video}
        useNativeControls
      />
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
});

export default Player;
