import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import BadgeRating from "../ui/BadgeRating";
import Typography from "../ui/Typography";
import homeStyles from "../../style/homeStyles";

interface AnimeItemProps {
  item: any;
  index: number;
  onPress: (item: any) => void;
}

const AnimeItem: React.FC<AnimeItemProps> = ({ item, index, onPress }) => (
  <View style={homeStyles.animeItem}>
    <TouchableOpacity onPress={() => onPress(item)}>
      <ImageBackground
        resizeMode="stretch"
        source={{ uri: item.material_data.poster_url }}
        style={homeStyles.poster}
        imageStyle={homeStyles.posterImage}
      >
        <View style={homeStyles.posterContainer}>
          <BadgeRating
            style={homeStyles.badgeRating}
            title={item.material_data.shikimori_rating}
          />
          <Typography type="title" style={homeStyles.posterNumber}>
            {index + 1}
          </Typography>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  </View>
);

export default AnimeItem;
