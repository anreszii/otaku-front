import React from "react";
import { TouchableOpacity, View } from "react-native";
import BadgeRating from "../ui/BadgeRating";
import homeStyles from "../../style/homeStyles";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "expo-image";

interface AnimeItem {
  poster: string;
  title: string;
  rating: string;
}

interface AnimeItemProps {
  item: AnimeItem;
  flag?: boolean;
  setFlag?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnimeItem: React.FC<AnimeItemProps> = ({ item, flag, setFlag }) => {
  const navigation = useNavigation<any>();

  return (
    <View style={{ ...homeStyles.animeItem, marginBottom: 24 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("AnimePage", { title: item.title })}
      >
        <ImageBackground
          contentFit="fill"
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
