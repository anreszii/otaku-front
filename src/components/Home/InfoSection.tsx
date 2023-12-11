import React from "react";
import { View } from "react-native";
import Typography from "../ui/Typography";
import Button from "../ui/Button";
import homeStyles from "../../style/homeStyles";

interface InfoSectionProps {
  title: string;
  subtitle: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, subtitle }) => (
  <View style={homeStyles.infoContainer}>
    <Typography style={homeStyles.titleHeader} type="title">
      {title}
    </Typography>
    <Typography style={homeStyles.subtitle} type="sub">
      {subtitle}
    </Typography>
    <Button title="Play" style={homeStyles.playButton} />
  </View>
);

export default InfoSection;
