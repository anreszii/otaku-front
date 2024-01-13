import React from "react";
import { TouchableOpacity, View } from "react-native";
import BadgeRating from "../ui/BadgeRating";
import Typography from "../ui/Typography";
import homeStyles from "../../style/homeStyles";
import { ImageBackground } from "expo-image";

interface AnimeItemSimpleProps {
  item: any;
  index: number;
  onPress: (item: any) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnimeItemSimple: React.FC<AnimeItemSimpleProps> = ({
  item,
  index,
  onPress,
  setLoading,
}) => (
  <View style={homeStyles.animeItem}>
    <TouchableOpacity onPress={() => onPress(item)}>
      <ImageBackground
        contentFit="fill"
        source={{ uri: item.material_data.poster_url }}
        style={homeStyles.poster}
        imageStyle={homeStyles.posterImage}
        onLoadEnd={() => setLoading(false)}
      >
        <View style={homeStyles.posterContainer}>
          <BadgeRating
            style={homeStyles.badgeRating}
            title={item.material_data.shikimori_rating}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  </View>
);

export default AnimeItemSimple;
