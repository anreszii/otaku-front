import "react-native-gesture-handler";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Audio, ResizeMode, Video } from "expo-av";
import { useNavigation } from "@react-navigation/core";
import { getAnimeUrl } from "../api/getAnimeUrl";

export default function Player({ route }: any) {
  const video = useRef<any>(null);
  const [status, setStatus] = useState<any>({});
  const navigation = useNavigation<any>();

  const triggerAudio = async (ref: any) => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: false,
    });
    ref.current.playAsync();
  };

  useEffect(() => {
    getAnimeUrl(Object.values<any>(route.params.creature.seasons)[0].link)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (status.isPlaying) triggerAudio(video);
  }, [video, status.isPlaying]);

  return (
    <View style={styles.container}>
      <Text>{route.params.creature.title}</Text>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://scu1.sovetromantica.com/anime/1422_gyokou-no-nikuko-chan/episodes/dubbed/episode_1/episode_1.m3u8",
        }}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls={true}
        volume={1}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
      <Button title="Go" onPress={() => navigation.navigate("Profile")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: 400,
    height: 200,
  },
});
