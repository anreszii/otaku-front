import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Typography from "../ui/Typography";
import Button from "../ui/Button";
import { Qualifier } from "../../icons";
import { commonStyles } from "../../style/releaseStyle";
import { Image } from "react-native-elements";
import Loader from "../ui/Loader";
import Skeleton from "../ui/Skeleton";

interface ReleaseItemProps {
  seriesItem: OngoingData;
}

interface OngoingData {
  material_data: {
    anime_title: string;
    title: string;
    next_episode_at: string;
    screenshots?: string[];
    episodes_aired: number;
  };
  screenshots: string[];
}

const ReleaseItem: React.FC<ReleaseItemProps> = ({ seriesItem }) => {
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
          <Typography>{seriesItem.material_data.anime_title}</Typography>
          <Typography>
            {seriesItem.material_data.episodes_aired + 1} Episode
          </Typography>
          <Button
            title="+ My List"
            style={commonStyles.button}
            styleText={commonStyles.buttonText}
          />
        </View>
      </View>
    </View>
  );
};

export default ReleaseItem;
