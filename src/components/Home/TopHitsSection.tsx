import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Typography from "../ui/Typography";
import AnimeItem from "./AnimeItem";
import homeStyles from "../../style/homeStyles";
import { useTranslation } from "react-i18next";

interface TopHitsSectionProps {
  animeList: any[];
  navigation: any;
  navigateToAnimePage: any;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopHitsSection: React.FC<TopHitsSectionProps> = ({
  animeList,
  navigation,
  navigateToAnimePage,
  setLoading,
}) => {
  const { t } = useTranslation();

  return (
    <View style={homeStyles.wrapper}>
      <View style={homeStyles.titleContainer}>
        <Typography style={homeStyles.title} type="title">
          {t("screens.home.topHitsSection.topHitsSectionTitle")}
        </Typography>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={homeStyles.content}
      >
        {animeList.map((item, index) => (
          <AnimeItem
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

export default TopHitsSection;
