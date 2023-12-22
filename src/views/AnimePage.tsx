import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share as Sharing,
} from "react-native";
import React, { useEffect, useState } from "react";
import MarqueeText from "react-native-marquee";
import { ArrowGradient, List, Play, Share, Star } from "../icons";
import Typography from "../components/ui/Typography";
import OutlineTypography from "../components/ui/OutlineTypography";
import Button from "../components/ui/Button";
import { searchAnimeWithEpisodes } from "../api/kodik/searchAnimeWithEpisodes";
import userService from "../api/user/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { downloadAndSaveVideo } from "../api/downloadVideo";
import { getAnimeUrl } from "../api/kodik/getAnimeUrl";
import * as FileSystem from "expo-file-system";
import DownloadModal from "../components/Modals/DownloadModal";
import DownloadErrorModal from "../components/Modals/DownloadErrorModal";
import { useNavigation } from "@react-navigation/native";

export default function AnimePage({ route }: any) {
  const [animeInfo, setAnimeInfo] = useState<any>(null);
  const [showsFullDesc, setShowsFullDesc] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [mb, setMB] = useState(0);
  const [allMB, setAllMB] = useState(0);
  const navigation = useNavigation<any>();

  useEffect(() => {
    (async () => {
      console.log(
        route.params?.creature?.hasOwnProperty("title")
          ? route.params.creature.title
          : route.params.title
      );

      let res = await searchAnimeWithEpisodes(
        route.params?.creature?.hasOwnProperty("title")
          ? route.params.creature.title
          : route.params.title
      );
      const id: any = await AsyncStorage.getItem("id");
      const favoriteList = await userService.getFavoriteList(id);
      const inFavoriteList = favoriteList.data.find((el: any) =>
        el.title === route.params?.creature?.hasOwnProperty("title")
          ? route.params.creature.title
          : route.params.title
      );
      setAnimeInfo(res);

      if (inFavoriteList !== undefined) {
        res = { ...res, isFavorite: true, favoriteItem: inFavoriteList };
        setAnimeInfo(res);
      } else {
        setAnimeInfo(res);
      }
    })();
  }, []);

  const handleFavorite = async () => {
    if (animeInfo.isFavorite) {
      setAnimeInfo({ ...animeInfo, isFavorite: false });
      const id: any = await AsyncStorage.getItem("id");
      await userService
        .delFavoriteList(id, animeInfo.favoriteItem)
        .then((data) => {
          console.log(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      const id: any = await AsyncStorage.getItem("id");
      const favoriteItem = {
        poster: animeInfo.material_data.poster_url,
        rating: animeInfo.material_data.shikimori_rating,
        title: animeInfo.material_data.title,
      };
      await userService
        .addFavoriteList(id, favoriteItem)
        .then((data: any) => {
          console.log(data.data);
        })
        .catch((e: any) => {
          console.log(e);
        });
      setAnimeInfo({
        ...animeInfo,
        isFavorite: true,
        favoriteItem: favoriteItem,
      });
    }
  };

  const handleDownload = async () => {
    const videoLink = await getAnimeUrl(
      Object.values<any>(Object.values<any>(animeInfo.seasons)[0].episodes)[0]
        .link
    );

    const res: any = await downloadAndSaveVideo(
      videoLink.data.links["720"].Src.includes("https:")
        ? videoLink.data.links["720"].Src
        : `https:${videoLink.data.links["720"].Src}`,
      animeInfo.title_orig.replaceAll(" ", "") + "650" + ".mp4",
      setMB,
      setAllMB,
      setVisibleError,
      setVisible
    );

    await AsyncStorage.setItem(
      "animePath",
      FileSystem.documentDirectory +
        animeInfo.title_orig.replaceAll(" ", "") +
        "650" +
        ".mp4"
    );
    console.log(
      FileSystem.documentDirectory +
        animeInfo.title_orig.replaceAll(" ", "") +
        "650" +
        ".mp4"
    );
  };

  const handleShare = async () => {
    const result = await Sharing.share({
      message: `Посмотри аниме ${animeInfo.title}`,
      url: `aniup://AnimePage?title=${animeInfo.title}`,
    });
    console.log(result);
  };

  const handleShowsDesc = () => {
    setShowsFullDesc(!showsFullDesc);
  };

  const filteredGenres = [
    ...new Set<any>(
      (animeInfo?.material_data?.all_genres || []).map((genre: string) =>
        genre.toLowerCase()
      )
    ),
  ].filter((genre: string) => !["аниме", "мультфильм"].includes(genre));
  const genres = filteredGenres.join(", ");

  return (
    <>
      {animeInfo && (
        <>
          <ImageBackground
            source={{ uri: animeInfo.material_data.poster_url }}
            style={styles.poster}
          ></ImageBackground>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}
          >
            <View style={styles.content}>
              <MarqueeText
                style={styles.animeTitle}
                speed={0.5}
                marqueeOnStart
                loop
                delay={4000}
              >
                {animeInfo.material_data.anime_title}
              </MarqueeText>
              <TouchableOpacity onPress={() => handleFavorite()}>
                {animeInfo.isFavorite ? <Text>✓</Text> : <List />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleShare()}>
                <Share />
              </TouchableOpacity>
            </View>
            <View style={styles.content}>
              <View style={styles.ratingContent}>
                <Star />
                <Typography gradient={true}>
                  {animeInfo.material_data.shikimori_rating}
                </Typography>
                <TouchableOpacity>
                  <ArrowGradient />
                </TouchableOpacity>
              </View>
              <Typography>{animeInfo.year}</Typography>
              <OutlineTypography type="button" style={styles.infoTitle}>
                {animeInfo.material_data.rating_mpaa}
              </OutlineTypography>
              <OutlineTypography type="button" style={styles.infoTitle}>
                {animeInfo.material_data.countries[0]}
              </OutlineTypography>
            </View>
            <View style={styles.content}>
              <Button
                title="Play"
                onPress={() =>
                  navigation.navigate("Player", {
                    creature: route.params.creature,
                  })
                }
                style={styles.button}
              />
              <Button
                title="Download"
                onPress={() => handleDownload()}
                gradient={false}
                style={styles.button}
              />
            </View>
            <View style={styles.content}>
              <Typography>Genre: {genres}</Typography>
            </View>
            <View style={styles.content}>
              {showsFullDesc ? (
                <Typography>
                  {animeInfo.material_data.anime_description}
                  <TouchableOpacity
                    onPress={() => handleShowsDesc()}
                    style={{ margin: -1.5 }}
                  >
                    <Typography gradient={true}>View All</Typography>
                  </TouchableOpacity>
                </Typography>
              ) : (
                <Typography>
                  {animeInfo.material_data.anime_description.substring(0, 100) +
                    "..."}
                  <TouchableOpacity
                    onPress={() => handleShowsDesc()}
                    style={{ margin: -1.5 }}
                  >
                    <Typography gradient={true}> View All</Typography>
                  </TouchableOpacity>
                </Typography>
              )}
            </View>
            <View style={styles.content}>
              <Typography type="title" style={styles.episodesTitle}>
                Episodes
              </Typography>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.content}>
                {Object.values(
                  Object.values<any>(animeInfo.seasons)[0].episodes
                ).map((item: any, index) => {
                  return (
                    <View key={index}>
                      <ImageBackground
                        source={{ uri: item.screenshots[0] }}
                        blurRadius={5}
                        style={{
                          width: 150,
                          height: 113,
                          marginRight: 12,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        imageStyle={{
                          borderRadius: 10,
                        }}
                      >
                        <View style={styles.overlay}></View>
                        <TouchableOpacity>
                          <Play />
                        </TouchableOpacity>
                        <View
                          style={{ position: "absolute", bottom: 12, left: 12 }}
                        >
                          <Typography style={{ color: "#fff" }}>
                            Episode {index + 1}
                          </Typography>
                        </View>
                      </ImageBackground>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </ScrollView>
          <DownloadModal
            visible={visible}
            setVisible={setVisible}
            mb={mb}
            allMB={allMB}
          />
          <DownloadErrorModal
            visible={visibleError}
            setVisible={setVisibleError}
          />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  poster: {
    width: "100%",
    height: 320,
  },
  container: {
    margin: 24,
  },
  animeTitle: {
    fontFamily: "NeueHaasDisplay",
    fontSize: 24,
    width: "80%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  ratingContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "20%",
    justifyContent: "space-between",
  },
  infoTitle: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  button: {
    width: "48%",
    height: 42,
  },
  episodesTitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 21.6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
  },
});
