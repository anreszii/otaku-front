import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Typography from "../ui/Typography";
import Button from "../ui/Button";
import { Qualifier } from "../../icons";
import { commonStyles } from "../../style/releaseStyle";
import { Image } from "react-native-elements";
import Loader from "../ui/Loader";
import Skeleton from "../ui/Skeleton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userService from "../../api/user/userService";

interface ReleaseItemProps {
  seriesItem: OngoingData;
  flag: boolean;
  setFlag: any;
}

interface OngoingData {
  isFavorite: boolean;
  material_data: {
    anime_title: string;
    title: string;
    poster_url: string;
    next_episode_at: string;
    screenshots?: string[];
    episodes_aired: number;
    shikimori_rating: string;
  };
  screenshots: string[];
}

const ReleaseItem: React.FC<ReleaseItemProps> = ({
  seriesItem,
  flag,
  setFlag,
}) => {
  const [_inFavoriteList, setInFavoriteList] = useState(seriesItem.isFavorite);
  const handleAddList = async (
    title: string,
    poster: string,
    rating: string
  ) => {
    const id = await AsyncStorage.getItem("id");
    userService
      .addFavoriteList(String(id), { title, poster, rating })
      .then(() => {
        setInFavoriteList(true);
        setFlag(!flag);
      });
  };
  return (
    <View style={commonStyles.marginBottom16}>
      <View style={commonStyles.row}>
        <Qualifier style={commonStyles.marginRight8} />
        <Typography>
          {new Date(seriesItem.material_data.next_episode_at).getHours() +
            ":" +
            String(
              new Date(seriesItem.material_data.next_episode_at).getMinutes()
            ).padStart(2, "0")}
        </Typography>
      </View>
      <View style={commonStyles.row}>
        <Image
          source={{
            uri:
              seriesItem.material_data.screenshots?.[0] ||
              seriesItem.screenshots?.[0],
          }}
          style={commonStyles.image}
          PlaceholderContent={<Skeleton width={160} height={125} />}
        />

        <View style={commonStyles.column}>
          <Typography>
            {seriesItem.material_data.anime_title.length > 50
              ? seriesItem.material_data.anime_title.substring(0, 50) + "..."
              : seriesItem.material_data.anime_title}
          </Typography>
          <Typography>
            {seriesItem.material_data.episodes_aired + 1} Episode
          </Typography>
          {_inFavoriteList ? (
            <Button
              title="✓ My List"
              gradient={false}
              style={commonStyles.button}
              styleText={commonStyles.buttonText}
            />
          ) : (
            <Button
              title="+ My List"
              onPress={() =>
                handleAddList(
                  seriesItem.material_data.title,
                  seriesItem.material_data.poster_url,
                  seriesItem.material_data.shikimori_rating
                )
              }
              style={commonStyles.button}
              styleText={commonStyles.buttonText}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default ReleaseItem;
