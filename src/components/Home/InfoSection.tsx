import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Typography from "../ui/Typography";
import Button from "../ui/Button";
import homeStyles from "../../style/homeStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userService from "../../api/user/userService";

interface InfoSectionProps {
  title: string;
  subtitle: string;
  poster: string;
  rating: string;
  inFavoriteList: boolean;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  subtitle,
  poster,
  rating,
  inFavoriteList,
}) => {
  const [_inFavoriteList, setInFavoriteList] = useState(inFavoriteList);
  const handleAddList = async (
    title: string,
    poster: string,
    rating: string
  ) => {
    setInFavoriteList(true);
    const id = await AsyncStorage.getItem("id");
    userService.addFavoriteList(String(id), { title, poster, rating });
  };
  return (
    <View style={homeStyles.infoContainer}>
      <Typography style={homeStyles.titleHeader} type="title">
        {title}
      </Typography>
      <Typography style={homeStyles.subtitle} type="sub">
        {subtitle}
      </Typography>
      <View style={homeStyles.buttonContainer}>
        <Button
          title="Play"
          style={homeStyles.playButton}
          styleText={homeStyles.playButtonText}
        />
        {_inFavoriteList && (
          <Button
            title="+ My List"
            gradient={false}
            onPress={async () => await handleAddList(title, poster, rating)}
            style={homeStyles.listButton}
            styleText={homeStyles.listButtonText}
          />
        )}
      </View>
    </View>
  );
};

export default InfoSection;
