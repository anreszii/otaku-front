import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useAnimeStore } from "shared/stores";
import { useRoute } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useVideoPlayer, VideoView } from "expo-video";
import { PlayIcon } from "shared/icons";
import {useEvent} from "expo"

const Player = () => {
  const { fetchAnimeUrl } = useAnimeStore();

  const { episodeLink } = useRoute().params as { episodeLink: string };

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = false;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

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
      <VideoView style={styles.video} player={player} />
      <View style={styles.controlsContainer}>
        <TouchableOpacity activeOpacity={0.7}>
          <PlayIcon />
        </TouchableOpacity>
      </View>
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
    padding: 10,
  },
});

export default Player;
