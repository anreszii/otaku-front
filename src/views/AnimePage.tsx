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
import { ImageBackground } from "expo-image";
import ChoiceEpisodeModal from "../components/Modals/ChoiceEpisodeModal";
import ChoiceVoiceModal from "../components/Modals/ChoiceVoiceModal";
import { getAllVoiceAnime } from "../api/kodik/getAllVoiceAnime";
import { searchAnimeWithVoice } from "../api/kodik/searchAnimeWithVoice";
import PrepareDownload from "../components/Modals/PrepareDownload";
import ChoiceQualityModal from "../components/Modals/ChoiceQualityVideo";
import { useNetwork } from "../providers/NetworkContext";
import DownloadInternet from "../components/Modals/DownloadInternet";
import { i18n } from "../plugins/i18n";
import { t } from "i18next";
import data from "../data/interests.json";
import dataRegion from "../data/region.json";

export default function AnimePage({ route }: any) {
  const [animeInfo, setAnimeInfo] = useState<any>(null);
  const [showsFullDesc, setShowsFullDesc] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [visibleChoice, setVisibleChoice] = useState(false);
  const [visibleChoiseVoice, setVisibleChoiseVoice] = useState(false);
  const [visiblePrepare, setVisiblePrepare] = useState(false);
  const [visibleQuality, setVisibleQuality] = useState(false);
  const [visibleWiFi, setVisibleWiFi] = useState(false);
  const [mb, setMB] = useState(1);
  const [allMB, setAllMB] = useState(1);
  const [episodeArray, setEpisodeArray] = useState<any[]>([]);
  const [voiceArray, setVoiceArray] = useState<any[]>([]);
  const [valueVoice, setValueVoice] = useState<string>("");
  const [valueEpisode, setValueEpisode] = useState<string>("");
  const [valueQuality, setValueQuality] = useState<string>("");
  const [flag, setFlag] = useState(false);
  const { networkType } = useNetwork();
  const navigation = useNavigation<any>();
  const lang = i18n.language;

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

  const handlePreDownload = async () => {
    const settingWiFi = await AsyncStorage.getItem("downloadWiFi");
    if (settingWiFi === "true" && networkType === "cellular") {
      setVisibleWiFi(true);
    } else {
      setVisibleChoiseVoice(true);
    }
  };

  const handleDownload = async () => {
    setVisiblePrepare(true);

    let videoLink;

    if (!!animeInfo?.seasons) {
      videoLink = await getAnimeUrl(
        Object.values<any>(Object.values<any>(animeInfo.seasons)[0].episodes)[
          Number(valueEpisode) - 1
        ].link
      );
    } else {
      videoLink = await getAnimeUrl(
        animeInfo.link.includes("https:")
          ? animeInfo.link
          : `https:${animeInfo.link}`
      );
    }

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
      setVisible,
      flag,
      setFlag
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
            title_en: animeInfo?.material_data?.title_en,
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
            title_en: animeInfo?.material_data?.title_en,
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
    console.log(
      FileSystem.documentDirectory +
        animeInfo.title_orig.replaceAll(" ", "") +
        valueEpisode +
        valueVoice +
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
  const objectGenres = filteredGenres
    .map((item: any) => {
      return data.find(
        (el) => el.ru_title.toLowerCase() === item.toLowerCase()
      );
    })
    .filter((item) => item !== undefined);
  const genres = objectGenres
    .map((el: any) => (lang === "en" ? el.title : el.ru_title))
    .join(", ")
    .substring(0, filteredGenres.join(", ").length);
  const objectCountry = dataRegion.find((el) => {
    if (!!animeInfo?.material_data?.countries) {
      return (
        el.ru_title.toLowerCase() ===
        animeInfo?.material_data?.countries[0]?.toLowerCase()
      );
    }
  });
  const country =
    objectCountry === undefined
      ? false
      : lang === "en"
      ? objectCountry?.title
      : objectCountry?.ru_title;

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
                {lang === "en"
                  ? animeInfo.material_data.title_en
                  : animeInfo.material_data.anime_title}
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
                <Typography gradient={true} type="semibold">
                  {animeInfo.material_data.shikimori_rating}
                </Typography>
                <TouchableOpacity>
                  <ArrowGradient />
                </TouchableOpacity>
              </View>
              <Typography type="semibold">{animeInfo.year}</Typography>
              {!!animeInfo.material_data.rating_mpaa && (
                <OutlineTypography type="semibold" style={styles.infoTitle}>
                  {animeInfo.material_data.rating_mpaa}
                </OutlineTypography>
              )}
              {animeInfo?.material_data?.countries?.length && (
                <OutlineTypography type="semibold" style={styles.infoTitle}>
                  {country}
                </OutlineTypography>
              )}
            </View>
            <View style={styles.content}>
              <Button
                title={t("buttons.play")}
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
                title={t("buttons.download")}
                onPress={() => handlePreDownload()}
                gradient={false}
                style={styles.button}
              />
            </View>
            <View style={styles.content}>
              <Typography type="medium">
                {t("screens.animePage.labels.genre")} {genres}
              </Typography>
            </View>

            {!!animeInfo?.material_data?.anime_description ||
            !!animeInfo?.material_data?.description ? (
              <View style={styles.content}>
                {showsFullDesc ? (
                  <TouchableOpacity onPress={() => handleShowsDesc()}>
                    <Typography type="medium">
                      {!!animeInfo?.material_data?.anime_description
                        ? animeInfo.material_data.anime_description
                        : animeInfo.material_data.description}
                    </Typography>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => handleShowsDesc()}>
                    <Typography type="medium">
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
                            <Typography style={{ color: "#fff" }} type="medium">
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
                    <Typography style={{ color: "#fff" }} type="medium">
                      Episode 1
                    </Typography>
                  </View>
                </ImageBackground>
              </>
            )}
          </ScrollView>
          <DownloadInternet visible={visibleWiFi} setVisible={setVisibleWiFi} />
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
    fontSize: 12,
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
