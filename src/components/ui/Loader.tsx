import { View } from "react-native";
import React from "react";
import globalsStyle from "../../style/globals";
import CircleProgress from "./CircleProgress";

export default function Loader() {
  return (
    <View style={globalsStyle.progressContainer}>
      <CircleProgress />
    </View>
  );
}
