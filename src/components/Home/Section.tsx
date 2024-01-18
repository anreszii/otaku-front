import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Typography from "../ui/Typography";
import AnimeItem from "./AnimeItem";
import homeStyles from "../../style/homeStyles";
import AnimeItemSimple from "./AnimeItemSimple";

interface SectionProps {
  animeList: any[];
  navigateToAnimePage: any;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  lastElement: boolean;
}

const Section: React.FC<SectionProps> = ({
  animeList,
  navigateToAnimePage,
  setLoading,
  title,
  lastElement,
}) => {
  return (
    <View style={lastElement ? homeStyles.lastWrapper : homeStyles.wrapper}>
      <View style={homeStyles.titleContainer}>
        <Typography style={homeStyles.title} type="title">
          {title}
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
};

export default Section;
