import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Button from "../ui/Button";
import {
  Back,
  ChromeCast,
  Episodes,
  PlayFill,
  Speed,
  Voice,
} from "../../icons";
import Typography from "../ui/Typography";
import MarqueeText from "react-native-marquee";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";

export default function Controls({
  video,
  status,
  position,
  duration,
  title,
  valueChange,
  full,
}: any) {
  const navigation = useNavigation<any>();

  const formatTime = (minute: any) => {
    const minutes = Math.trunc(minute);
    const remainingSeconds = Math.trunc(minute * 60 - minutes * 60);
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.headerTitle}>
          <TouchableOpacity
            onPress={async () => {
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP
              );
              navigation.goBack();
            }}
          >
            <Back color="#FFF" style={styles.backArrow} />
          </TouchableOpacity>
          <MarqueeText
            style={full ? styles.animeTitleFull : styles.animeTitle}
            speed={0.2}
            marqueeOnStart
            loop
            delay={4000}
          >
            {title}
          </MarqueeText>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={full ? styles.iconsItemFull : styles.iconsItem}
          >
            <Speed />
          </TouchableOpacity>
          <TouchableOpacity
            style={full ? styles.iconsItemFull : styles.iconsItem}
          >
            <Voice />
          </TouchableOpacity>
          <TouchableOpacity
            style={full ? styles.iconsItemFull : styles.iconsItem}
          >
            <ChromeCast />
          </TouchableOpacity>
          <TouchableOpacity
            style={full ? styles.iconsItemFull : styles.iconsItem}
          >
            <Episodes />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.sliderContent}>
          <Typography
            style={full ? styles.timeTitleLeftFull : styles.timeTitleLeft}
          >
            {formatTime(position)}
          </Typography>
          <Slider
            style={{ width: "80%", height: 20 }}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onValueChange={(e) => valueChange(e)}
            minimumTrackTintColor="#7210FF"
            maximumTrackTintColor="#9D59FF"
          />
          <Typography
            style={full ? styles.timeTitleRightFull : styles.timeTitleRight}
          >
            {formatTime(duration)}
          </Typography>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          >
            <PlayFill />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between",
  },
  durationText: {
    color: "white",
  },
  animeTitle: {
    fontFamily: "NeueHaasDisplay",
    fontSize: 12,
    width: "50%",
    color: "#FFF",
  },
  animeTitleFull: {
    fontFamily: "NeueHaasDisplay",
    fontSize: 20,
    width: "60%",
    color: "#FFF",
  },
  backArrow: {
    marginRight: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  headerTitle: {
    flexDirection: "row",
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
  },
  timeTitleLeft: {
    color: "#FFF",
    fontWeight: "600",
    marginRight: 2,
  },
  timeTitleRight: {
    color: "#FFF",
    fontWeight: "600",
    marginLeft: 2,
  },
  timeTitleLeftFull: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
  timeTitleRightFull: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
});
