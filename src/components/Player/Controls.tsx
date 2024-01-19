import React from "react";
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import {
  Back,
  ChromeCast,
  Episodes,
  Pause,
  PlayFill,
  SkipLeft,
  SkipRight,
  Speed,
  Voice,
} from "../../icons";
import Typography from "../ui/Typography";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { CastButton, useRemoteMediaClient } from "react-native-google-cast";

export default function Controls({
  position,
  duration,
  full,
  valueChange,
  skipBack,
  skipForward,
  isPlaying,
  setIsPlaying,
  setVisibleSpeed,
  setVisibleVoice,
  setVisibleEpisode,
  quality,
  setVisibleQuality,
  url,
}: any) {
  const navigation = useNavigation<any>();

  const formatTime = (minute: any) => {
    const hours = Math.trunc(minute / 60);
    const remainingMinutes = Math.trunc(minute) % 60;
    const remainingSeconds = Math.trunc(minute * 60 - Math.trunc(minute) * 60);

    if (hours > 0) {
      return `${String(hours).padStart(2, "0")}:${String(
        remainingMinutes
      ).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    } else {
      return `${String(remainingMinutes).padStart(2, "0")}:${String(
        remainingSeconds
      ).padStart(2, "0")}`;
    }
  };

  const client = useRemoteMediaClient();

  if (client) {
    client.loadMedia({
      mediaInfo: {
        contentUrl: url,
      },
      startTime: position,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.headerBack}>
          <TouchableOpacity
            onPress={() => {
              ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP
              );
              navigation.goBack();
            }}
          >
            <Back color="#FFF" style={styles.backArrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={full ? styles.iconsItemFull : styles.iconsItem}
            onPress={() => setVisibleSpeed(true)}
          >
            <Speed />
          </TouchableOpacity>
          <TouchableOpacity
            style={full ? styles.iconsItemFull : styles.iconsItem}
            onPress={() => setVisibleVoice(true)}
          >
            <Voice />
          </TouchableOpacity>

          <TouchableOpacity
            style={full ? styles.iconsItemFull : styles.iconsItem}
          >
            <CastButton style={{ width: 24, height: 20, tintColor: "#FFF" }}>
              <ChromeCast />
            </CastButton>
          </TouchableOpacity>
          <TouchableOpacity
            style={full ? styles.iconsItemFull : styles.iconsItem}
            onPress={() => setVisibleEpisode(true)}
          >
            <Episodes />
          </TouchableOpacity>
          <TouchableOpacity
            style={full ? styles.iconsItemFull : styles.iconsItem}
            onPress={() => setVisibleQuality(true)}
          >
            <Typography type="semibold" style={{ color: "#fff" }}>
              {quality}
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View
          style={
            full || Math.trunc(duration / 60) > 0
              ? Math.trunc(duration / 60) > 0
                ? { ...styles.sliderContentFull, marginRight: 24 }
                : styles.sliderContentFull
              : styles.sliderContent
          }
        >
          <Typography
            style={
              full || Math.trunc(duration / 60) > 0
                ? styles.timeTitleLeftFull
                : styles.timeTitleLeft
            }
            type="semibold"
          >
            {formatTime(position)}
          </Typography>
          <Slider
            style={
              full || Math.trunc(duration / 60) > 0
                ? { width: "70%", height: 20 }
                : { width: "75%", height: 20 }
            }
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onValueChange={(e) => valueChange(e)}
            minimumTrackTintColor="#7210FF"
            maximumTrackTintColor="#9D59FF"
          />
          <Typography
            style={
              full || Math.trunc(duration / 60) > 0
                ? styles.timeTitleRightFull
                : styles.timeTitleRight
            }
            type="semibold"
          >
            {formatTime(duration)}
          </Typography>
        </View>
        <View style={full ? styles.playContentFull : styles.playContent}>
          <TouchableOpacity style={styles.skipLeft} onPress={() => skipBack()}>
            <SkipLeft />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              isPlaying ? setIsPlaying(false) : setIsPlaying(true)
            }
          >
            {!isPlaying ? <PlayFill /> : <Pause />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skipRight}
            onPress={() => skipForward()}
          >
            <SkipRight />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between",
  },
  backArrow: {},
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  headerBack: {
    alignItems: "center",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconsItem: {
    marginRight: 16,
  },
  iconsItemFull: {
    marginRight: 32,
  },
  sliderContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  sliderContentFull: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 42,
  },
  timeTitleLeft: {
    color: "#FFF",
    fontWeight: "600",
    marginRight: 2,
    width: "11%",
  },
  timeTitleRight: {
    color: "#FFF",
    fontWeight: "600",
    marginLeft: 2,
    width: "11%",
  },
  timeTitleLeftFull: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
    width: "15%",
    textAlign: "right",
  },
  timeTitleRightFull: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
    width: "15%",
    textAlign: "left",
  },
  playContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  playContentFull: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  skipLeft: {
    marginRight: 44,
  },
  skipRight: {
    marginLeft: 44,
  },
});
