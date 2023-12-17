import "react-native-gesture-handler";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Audio, ResizeMode, Video } from "expo-av";
import { useNavigation } from "@react-navigation/core";
import { getAnimeUrl } from "../api/kodik/getAnimeUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Asset } from "expo-asset";
import { downloadAndSaveVideo } from "../api/downloadVideo";

export default function Player({ route }: any) {
  const video = useRef<any>(null);
  const [status, setStatus] = useState<any>({});
  const [urlVideo, setUrlVideo] = useState("");
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
    (async () => {
      const url: any = await AsyncStorage.getItem("videoPath");
      setUrlVideo(url);
      if (status.isPlaying) triggerAudio(video);
    })();
  }, [video, status.isPlaying]);

  return (
    <View style={styles.container}>
      <Text>{route.params.creature.material_data.title}</Text>
      {urlVideo && (
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "file:///Users/reszi./Library/Developer/CoreSimulator/Devices/2D5946DE-A346-4772-A81E-9041A95D8F53/data/Containers/Data/Application/9AC0561C-AA98-46CA-B627-9DD43810EBDD/Library/Caches/ExponentExperienceData/%2540anonymous%252Faniup-front-e17ec6c5-3021-4101-8fd3-e1f769708639/ExponentAsset-76c381922169eb741af156794fca1f91.m3u8",
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls={true}
          volume={1}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      )}

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
