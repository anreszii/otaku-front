import "react-native-gesture-handler";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Audio, Video } from "expo-av";
import { useNavigation } from "@react-navigation/core";
import * as ScreenOrientation from "expo-screen-orientation";
import Controls from "../components/Player/Controls";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Player({ route }: any) {
  const video = useRef<any>(null);
  const [status, setStatus] = useState<any>({});
  // const [urlVideo, setUrlVideo] = useState("");
  const navigation = useNavigation<any>();
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [full, setFull] = useState(false);
  const [timeoutID, setTimeoutID] = useState<any>(null);
  const [visible, setVisible] = useState(true);

  const triggerAudio = async (ref: any) => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: false,
    });
    ref.current.playAsync();
  };

  const changeOrientation = (e: ScreenOrientation.OrientationChangeEvent) => {
    if (e.orientationInfo.orientation > 1) {
      setFull(true);
    } else {
      setFull(false);
    }
  };

  const handlePlaybackStatusUpdate = (status: any) => {
    setStatus(() => status);
    setPosition(status.positionMillis / 60000);
  };

  const handleSliderChange = (value: any) => {
    if (video.current) {
      if (timeoutID !== null) {
        clearTimeout(timeoutID);
      }

      const timeout = setTimeout(() => {
        video.current.setPositionAsync(value * 60000);
        setPosition(value);
      }, 1000);

      setTimeoutID(timeout);
    }
  };

  const handleLoad = (meta: any) => {
    setDuration(meta.durationMillis / 60000);
  };

  const toggleOverlayVisibility = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    // const url: any = await AsyncStorage.getItem("videoPath");
    // setUrlVideo(url);
    (async () => {
      await ScreenOrientation.unlockAsync();
      if (status.isPlaying) triggerAudio(video);
      const subscription = ScreenOrientation.addOrientationChangeListener((e) =>
        changeOrientation(e)
      );
      return () => {
        ScreenOrientation.removeOrientationChangeListener(subscription);
      };
    })();
  }, [video, status.isPlaying]);

  return (
    <SafeAreaView
      edges={full ? ["left", "right"] : ["left", "right", "bottom", "top"]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "file:///Users/reszi./Documents/SousounoFrieren220.mp4",
          }}
          useNativeControls={false}
          volume={1}
          onLoad={handleLoad}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />

        <View
          style={
            visible ? styles.controlsOverlay : styles.controlsOverlaySecure
          }
        >
          {visible && (
            <View
              style={full ? [styles.controls, { left: 32 }] : styles.controls}
            >
              <Controls
                video={video}
                status={status}
                position={position}
                duration={duration}
                title={route.params.creature.title}
                full={full}
                valueChange={handleSliderChange}
              />
            </View>
          )}
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: "100%",
              height: "80%",
            }}
            onPress={toggleOverlayVisibility}
          ></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  controlsOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, .5)",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  controls: {
    position: "absolute",
    top: 16,
    bottom: 16,
    right: 16,
    left: 16,
  },
  controlsOverlaySecure: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
