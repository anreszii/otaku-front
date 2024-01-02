import React from "react";
import { View } from "react-native";
import Typography from "../ui/Typography";

const NoScheduleMessage: React.FC = () => (
  <View>
    <Typography
      style={{
        fontSize: 24,
        fontWeight: "600",
        lineHeight: 28.8,
        textAlign: "center",
        marginTop: 124,
      }}
      type="title"
      gradient={true}
    >
      No Release Schedule
    </Typography>
    <Typography
      style={{
        fontSize: 18,
        fontWeight: "500",
        lineHeight: 25.2,
        letterSpacing: 0.2,
        textAlign: "center",
      }}
      type="sub"
    >
      Sorry, there is no anime release schedule on this date
    </Typography>
  </View>
);

export default NoScheduleMessage;
