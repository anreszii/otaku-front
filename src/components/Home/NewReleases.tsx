import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Typography from "../ui/Typography";
import AnimeItem from "./AnimeItem";
import homeStyles from "../../style/homeStyles";
import AnimeItemSimple from "./AnimeItemSimple";

interface NewReleasesProps {
  animeList: any[];
  navigation: any;
  navigateToAnimePage: any;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewReleases: React.FC<NewReleasesProps> = ({
  animeList,
  navigation,
  navigateToAnimePage,
  setLoading,
}) => (
  <View style={homeStyles.lastWrapper}>
    <View style={homeStyles.titleContainer}>
      <Typography style={homeStyles.title} type="title">
        New Episode Releases
      </Typography>
    </View>
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={homeStyles.content}
    >
      {animeList.map((item, index) => (
        <AnimeItemSimple
          key={index}
          item={item}
          index={index}
          onPress={() => navigateToAnimePage(item)}
          setLoading={setLoading}
        />
      ))}
    </ScrollView>
  </View>
);

export default NewReleases;
