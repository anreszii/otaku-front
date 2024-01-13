import {
  View,
  Text,
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
import * as ScreenOrientation from "expo-screen-orientation";
import axios from "axios";
import { ImageBackground } from "expo-image";
import ChoiceEpisodeModal from "../components/Modals/ChoiceEpisodeModal";
import ChoiceVoiceModal from "../components/Modals/ChoiceVoiceModal";
import { getAllVoiceAnime } from "../api/kodik/getAllVoiceAnime";
import { searchAnimeWithVoice } from "../api/kodik/searchAnimeWithVoice";
import PrepareDownload from "../components/Modals/PrepareDownload";
import ChoiceQualityModal from "../components/Modals/ChoiceQualityVideo";

export default function AnimePage({ route }: any) {
  const [animeInfo, setAnimeInfo] = useState<any>(null);
  const [showsFullDesc, setShowsFullDesc] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [visibleChoice, setVisibleChoice] = useState(false);
  const [visibleChoiseVoice, setVisibleChoiseVoice] = useState(false);
  const [visiblePrepare, setVisiblePrepare] = useState(false);
  const [visibleQuality, setVisibleQuality] = useState(false);
  const [mb, setMB] = useState(0);
  const [allMB, setAllMB] = useState(0);
  const [episodeArray, setEpisodeArray] = useState<any[]>([]);
  const [voiceArray, setVoiceArray] = useState<any[]>([]);
  const [valueVoice, setValueVoice] = useState<string>("");
  const [valueEpisode, setValueEpisode] = useState<string>("");
  const [valueQuality, setValueQuality] = useState<string>("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const navigation = useNavigation<any>();

  useEffect(() => {
    (async () => {
      setValueVoice("");
      setValueEpisode("");
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      const title = route.params?.creature?.hasOwnProperty("title")
        ? route.params.creature.title
        : route.params.title;
      const titleFavorite = route.params?.creature?.hasOwnProperty("title")
        ? route.params.creature.title
        : route.params.title;
      const res: any = await searchAnimeWithEpisodes(title);
      const id: any = await AsyncStorage.getItem("id");
      const animeID = res.shikimori_id;
      // const { data } = await axios.get(
      //   `https://shikimori.one/api/animes/${animeID}`
      // );
      // console.log(data);
      // const editPosterAnime = {
      //   ...res,
      //   material_data: {
      //     ...res.material_data,
      //     poster_url: `https://shikimori.one${data.image.original}`,
      //   },
      // };
      const favoriteList = await userService.getFavoriteList(id);
      const inFavoriteList = favoriteList.data.find(
        (el: any) => el.title === titleFavorite
      );

      const allVoice: any[] = await getAllVoiceAnime(title);
      const tempVoiceArray: any[] = [];
      Array.from({ length: allVoice.length }).map((item, index) =>
        tempVoiceArray.push({ label: allVoice[index], value: allVoice[index] })
      );
      setVoiceArray(tempVoiceArray);

      if (inFavoriteList !== undefined) {
        setAnimeInfo({
          ...res,
          isFavorite: true,
          favoriteItem: inFavoriteList,
        });
      } else {
        setAnimeInfo(res);
      }
    })();
  }, [route]);

  useEffect(() => {
    (async () => {
      if (valueVoice.trim() !== "") {
        const title = route.params?.creature?.hasOwnProperty("title")
          ? route.params.creature.title
          : route.params.title;
        const data = await searchAnimeWithVoice(title, valueVoice);
        const tempEpisodeArray: any[] = [];
        Array.from(
          data.type === "anime"
            ? { length: 1 }
            : {
                length: Object.values<any>(
                  Object.values<any>(data.seasons)[0].episodes
                ).length,
              }
        ).map((item, index) => {
          tempEpisodeArray.push({
            label: `Episode ${index + 1}`,
            value: String(index + 1),
          });
        });
        setEpisodeArray(tempEpisodeArray);
      }
    })();
  }, [visibleChoice]);

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
        title: animeInfo.title,
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

  const handlePreDownload = () => {
    setVisibleChoiseVoice(true);
  };

  const handleDownload = async () => {
    setVisiblePrepare(true);

    const videoLink = await getAnimeUrl(
      Object.values<any>(Object.values<any>(animeInfo.seasons)[0].episodes)[
        Number(valueEpisode) - 1
      ].link
    );

    console.log(
      Object.values<any>(animeInfo.seasons)[0].episodes,
      Number(valueEpisode) - 1,
      Object.values<any>(Object.values<any>(animeInfo.seasons)[0].episodes)[
        Number(valueEpisode) - 1
      ]
    );

    await downloadAndSaveVideo(
      videoLink.data.links[valueQuality].Src.includes("https:")
        ? videoLink.data.links[valueQuality].Src
        : `https:${videoLink.data.links[valueQuality].Src}`,
      animeInfo.title_orig.replaceAll(" ", "") +
        valueEpisode +
        valueVoice +
        ".mp4",
      setMB,
      setAllMB,
      setVisibleError,
      setVisiblePrepare,
      setVisible
    );

    const downloadsArray: any = await AsyncStorage.getItem("downloadsArray");

    const response = await fetch(
      videoLink.data.links[valueQuality].Src.includes("https:")
        ? videoLink.data.links[valueQuality].Src
        : `https:${videoLink.data.links[valueQuality].Src}`,
      { method: "HEAD" }
    );
    const fileSize: any = response.headers.get("content-length");
    const initialFileSize = parseFloat(fileSize);

    if (downloadsArray) {
      await AsyncStorage.setItem(
        "downloadsArray",
        JSON.stringify([
          ...JSON.parse(downloadsArray),
          {
            title: animeInfo?.title,
            displayTitle: animeInfo?.material_data?.anime_title,
            image: animeInfo?.material_data?.screenshots?.length
              ? animeInfo?.material_data?.screenshots[0]
              : animeInfo?.material_data?.poster_url,
            episodeNumber: valueEpisode,
            voiceName: valueVoice,
            memory: (initialFileSize / 1000000).toFixed(2),
            video_url:
              FileSystem.documentDirectory +
              animeInfo.title_orig.replaceAll(" ", "") +
              valueEpisode +
              valueVoice +
              ".mp4",
          },
        ])
      );
    } else {
      await AsyncStorage.setItem(
        "downloadsArray",
        JSON.stringify([
          {
            title: animeInfo?.title,
            displayTitle: animeInfo?.material_data?.anime_title,
            image: animeInfo?.material_data?.screenshots?.length
              ? animeInfo?.material_data?.screenshots[0]
              : animeInfo?.material_data?.poster_url,
            episodeNumber: valueEpisode,
            voiceName: valueVoice,
            memory: allMB,
            video_url:
              FileSystem.documentDirectory +
              animeInfo.title_orig.replaceAll(" ", "") +
              valueEpisode +
              valueVoice +
              ".mp4",
          },
        ])
      );
    }
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
            source={{
              uri: animeInfo.material_data.poster_url,
            }}
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
              {!!animeInfo.material_data.rating_mpaa && (
                <OutlineTypography type="button" style={styles.infoTitle}>
                  {animeInfo.material_data.rating_mpaa}
                </OutlineTypography>
              )}
              {animeInfo?.material_data?.countries?.length && (
                <OutlineTypography type="button" style={styles.infoTitle}>
                  {animeInfo?.material_data?.countries[0]}
                </OutlineTypography>
              )}
            </View>
            <View style={styles.content}>
              <Button
                title="Play"
                onPress={() =>
                  navigation.navigate("Player", {
                    creature: !!route.params.creature
                      ? route.params.creature
                      : { title: route.params.title },
                  })
                }
                style={styles.button}
              />
              <Button
                title="Download"
                onPress={() => handlePreDownload()}
                gradient={false}
                style={styles.button}
              />
            </View>
            <View style={styles.content}>
              <Typography>Genre: {genres}</Typography>
            </View>

            {!!animeInfo?.material_data?.anime_description ||
            !!animeInfo?.material_data?.description ? (
              <View style={styles.content}>
                {showsFullDesc ? (
                  <TouchableOpacity onPress={() => handleShowsDesc()}>
                    <Typography>
                      {!!animeInfo?.material_data?.anime_description
                        ? animeInfo.material_data.anime_description
                        : animeInfo.material_data.description}
                    </Typography>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => handleShowsDesc()}>
                    <Typography>
                      {!!animeInfo?.material_data?.anime_description
                        ? animeInfo.material_data.anime_description.substring(
                            0,
                            100
                          ) + "..."
                        : animeInfo.material_data.description.substring(
                            0,
                            100
                          ) + "..."}
                    </Typography>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <></>
            )}

            <View style={styles.content}>
              <Typography type="title" style={styles.episodesTitle}>
                Episodes
              </Typography>
            </View>
            {!!animeInfo?.seasons ? (
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
                            style={{
                              position: "absolute",
                              bottom: 12,
                              left: 12,
                            }}
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
            ) : (
              <>
                <ImageBackground
                  source={{
                    uri: !!animeInfo?.material_data?.screenshots
                      ? animeInfo?.material_data?.screenshots[0]
                      : animeInfo?.material_data?.poster_url,
                  }}
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
                    style={{
                      position: "absolute",
                      bottom: 12,
                      left: 12,
                    }}
                  >
                    <Typography style={{ color: "#fff" }}>Episode 1</Typography>
                  </View>
                </ImageBackground>
              </>
            )}
          </ScrollView>
          <ChoiceEpisodeModal
            visible={visibleChoice}
            setVisible={setVisibleChoice}
            data={episodeArray}
            value={valueEpisode}
            setValue={setValueEpisode}
            setVisibleQuality={setVisibleQuality}
          />
          <ChoiceVoiceModal
            visible={visibleChoiseVoice}
            setVisible={setVisibleChoiseVoice}
            data={voiceArray}
            setVisibleEpisode={setVisibleChoice}
            value={valueVoice}
            setValue={setValueVoice}
          />
          <ChoiceQualityModal
            visible={visibleQuality}
            setVisible={setVisibleQuality}
            data={[
              { label: "720", value: "720" },
              { label: "480", value: "480" },
              { label: "360", value: "360" },
            ]}
            value={valueQuality}
            setValue={setValueQuality}
            setVisiblePrepare={handleDownload}
          />
          <PrepareDownload
            visible={visiblePrepare}
            setVisible={setVisiblePrepare}
            episodeNumber={Number(valueEpisode)}
          />
          <DownloadModal
            visible={visible}
            setVisible={setVisible}
            mb={mb}
            allMB={allMB}
            episodeNumber={Number(valueEpisode)}
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
    padding: 0,
    backgroundColor: "#ccc",
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
  noneEpisodes: {
    width: "100%",
    alignItems: "center",
    marginTop: 12,
  },
  noneEpisodesTitle: {
    fontSize: 20,
  },
});
