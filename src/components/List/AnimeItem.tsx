import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import BadgeRating from "../ui/BadgeRating";
import homeStyles from "../../style/homeStyles";

interface AnimeItemProps {
  item: any;
  onPress?: (item: any) => void;
}

const AnimeItem: React.FC<AnimeItemProps> = ({ item, onPress }) => {
  return (
    <View style={homeStyles.animeItem}>
      <TouchableOpacity onPress={() => {}}>
        <ImageBackground
          resizeMode="stretch"
          source={{ uri: item.poster }}
          style={homeStyles.poster}
          imageStyle={homeStyles.posterImage}
        >
          <View style={homeStyles.posterContainer}>
            <BadgeRating style={homeStyles.badgeRating} title={item.rating} />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default AnimeItem;
