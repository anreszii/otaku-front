import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Typography from "../ui/Typography";
import AnimeItem from "./AnimeItem";
import homeStyles from "../../style/homeStyles";
import ContainerMain from "../Layouts/ContainerMain";

interface TopHitsSectionProps {
  animeList: any[];
  navigation: any;
  navigateToPlayer: any;
}

const TopHitsSection: React.FC<TopHitsSectionProps> = ({
  animeList,
  navigation,
  navigateToPlayer,
}) => (
  <ScrollView style={homeStyles.scrollView}>
    <ContainerMain>
      <View style={homeStyles.titleContainer}>
        <Typography style={homeStyles.title} type="title">
          Top Hits Anime
        </Typography>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ListHist", { creature: animeList })
          }
        >
          <Typography style={homeStyles.subtitle} type="sub" gradient={true}>
            See all
          </Typography>
        </TouchableOpacity>
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
            onPress={navigateToPlayer}
          />
        ))}
      </ScrollView>
    </ContainerMain>
  </ScrollView>
);

export default TopHitsSection;
