import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { getAnimeList } from "../api/kodik/getAnimeList";
import { useNavigation } from "@react-navigation/native";
import HeaderHome from "../components/Layouts/HeaderHome";
import homeStyles from "../style/homeStyles";
import InfoSection from "../components/Home/InfoSection";
import TopHitsSection from "../components/Home/TopHitsSection";
import Loader from "../components/ui/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userService from "../api/user/userService";
import axios from "axios";
import * as ScreenOrientation from "expo-screen-orientation";
import NewReleases from "../components/Home/NewReleases";
import { getNewReleases } from "../api/kodik/getNewReleases";

interface HomeProps {
  route: any;
}

const Home: React.FC<HomeProps> = ({ route }) => {
  const navigation = useNavigation<any>();
  const [animeListHits, setAnimeListHits] = useState<any[]>([]);
  const [animeListNew, setAnimeListNew] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isBackgroundImageLoading, setIsBackgroundImageLoading] =
    useState(true);

  useEffect(() => {
    (async () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      const fetchAnimeListHits = async () => {
        try {
          const { data } = await getAnimeList();
          const uniqueAnimeList = Array.from(
            new Set(data.results.map((item: any) => item.material_data.title))
          ).map((title) =>
            data.results.find((item: any) => item.material_data.title === title)
          );
          const editPostersAnimeList = await Promise.all(
            uniqueAnimeList.map(async (item) => {
              const animeID = item.shikimori_id;
              const { data } = await axios.get(
                `https://shikimori.one/api/animes/${animeID}`
              );
              return await {
                ...item,
                material_data: {
                  ...item.material_data,
                  poster_url: `https://shikimori.one${data.image.original}`,
                },
              };
            })
          );
          setAnimeListHits(editPostersAnimeList);
          return editPostersAnimeList;
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };

      const tempAnimeData: any = await fetchAnimeListHits();

      const getFavoriteList = async () => {
        const id = await AsyncStorage.getItem("id");
        const favorites = (await userService.getFavoriteList(String(id))).data;
        const title = tempAnimeData[0].material_data.title;
        favorites.map((item: any) => {
          if (item.title == title) {
            setInFavoriteList(true);
          }
        });
      };

      await getFavoriteList();

      const fetchAnimeListNew = async () => {
        try {
          const { data } = await getNewReleases();
          const uniqueAnimeList = Array.from(
            new Set(data.results.map((item: any) => item.material_data.title))
          ).map((title) =>
            data.results.find((item: any) => item.material_data.title === title)
          );
          const editPostersAnimeList = await Promise.all(
            uniqueAnimeList.map(async (item) => {
              const animeID = item.shikimori_id;
              const { data } = await axios.get(
                `https://shikimori.one/api/animes/${animeID}`
              );
              return await {
                ...item,
                material_data: {
                  ...item.material_data,
                  poster_url: `https://shikimori.one${data.image.original}`,
                },
              };
            })
          );
          setAnimeListNew(editPostersAnimeList);
          return editPostersAnimeList;
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };

      await fetchAnimeListNew();

      setIsLoading(false);
    })();
  }, []);

  const [inFavoriteList, setInFavoriteList] = useState(false);

  const navigateToAnimePage = (item: any) => {
    navigation.navigate("AnimePage", { creature: item });
  };

  const firstAnime = animeListHits[0]?.material_data;
  const filteredGenres = (firstAnime?.all_genres || []).filter(
    (genre: any) => !["аниме", "мультфильм"].includes(genre)
  );

  const middleIndex = Math.floor(filteredGenres.length / 2);
  const firstHalf = filteredGenres.slice(0, middleIndex);

  const displayTitle = firstAnime?.title || "";
  const title = animeListHits[0]?.title || "";
  const subtitle = firstHalf
    .join(", ")
    .substring(0, firstHalf.join(", ").length);
  const poster = firstAnime?.poster_url;
  const rating = firstAnime?.shikimori_rating;

  return (
    <View style={homeStyles.container}>
      {isLoading && isImageLoading && isBackgroundImageLoading ? (
        <Loader />
      ) : (
        <>
          <ImageBackground
            source={{
              uri: animeListHits[0]?.material_data?.screenshots[0],
            }}
            onLoadEnd={() => setIsBackgroundImageLoading(false)}
            style={homeStyles.bg}
            blurRadius={5}
          >
            <View style={homeStyles.overlay}></View>
            <SafeAreaView>
              <HeaderHome />
            </SafeAreaView>
            <InfoSection
              title={title}
              displayTitle={displayTitle}
              subtitle={subtitle}
              poster={poster}
              rating={rating}
              inFavoriteList={inFavoriteList}
            />
          </ImageBackground>
          <ScrollView
            style={homeStyles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <TopHitsSection
              animeList={animeListHits}
              navigation={navigation}
              navigateToAnimePage={navigateToAnimePage}
              setLoading={setIsImageLoading}
            />
            <NewReleases
              animeList={animeListNew}
              navigation={navigation}
              navigateToAnimePage={navigateToAnimePage}
              setLoading={setIsImageLoading}
            />
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Home;
