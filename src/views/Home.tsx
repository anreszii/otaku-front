import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
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
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { getAnimeWithGenre } from "../api/kodik/getAnimeWithGenre";
import Section from "../components/Home/Section";
import data from "../data/interests.json";
import { i18n } from "../plugins/i18n";

interface HomeProps {
  route: any;
}

interface IFavoriteList {
  poster: string;
  rating: number;
  title: string;
}

interface IInterestsList {
  rating: number;
  title: string;
  ru_title: string;
}

interface IUser {
  id: string;
  avatar: string;
  email: string;
  favoriteList: IFavoriteList[];
  password: string;
  username: string;
  interests: IInterestsList[];
}

const Home: React.FC<HomeProps> = ({ route }) => {
  const navigation = useNavigation<any>();
  const [animeListHits, setAnimeListHits] = useState<any[]>([]);
  const [animeListNew, setAnimeListNew] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isBackgroundImageLoading, setIsBackgroundImageLoading] =
    useState(true);
  const [animeByInterests, setAnimeByInterests] = useState<any[]>([]);
  const [lang, setLang] = useState("");

  useEffect(() => {
    (async () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );

      const lang = i18n.language;

      setLang(lang);

      const getUniqueAnimeArray = (animeByInterest: any) => {
        const uniqueAnimeArray: any = [];
        const animeMap = new Map();

        animeByInterest.forEach(([genre, animeList]: any) => {
          const uniqueAnimeList: any = [];

          animeList.forEach((anime: any) => {
            const animePoster = anime.material_data.poster_url;

            if (!animeMap.has(animePoster)) {
              animeMap.set(animePoster, true);
              uniqueAnimeList.push(anime);
            }
          });

          uniqueAnimeArray.push([genre, uniqueAnimeList]);
        });

        return uniqueAnimeArray;
      };

      const getAnimeByInterests = async () => {
        const id: any = await AsyncStorage.getItem("id");
        const userData: IUser = (await userService.getUser(id)).data;
        const interests = userData.interests.map((item) => item.ru_title);
        const result = await getAnimeWithGenre(interests);
        const uniqueAnimeArray = getUniqueAnimeArray(result);
        setAnimeByInterests(uniqueAnimeArray);
      };

      await getAnimeByInterests();

      const fetchAnimeListHits = async () => {
        try {
          const { data } = await getAnimeList();
          const uniqueAnimeList = Array.from(
            new Set(data.results.map((item: any) => item.material_data.title))
          ).map((title) =>
            data.results.find((item: any) => item.material_data.title === title)
          );
          const editPostersAnimeList = await Promise.all(
            uniqueAnimeList.map(async (item, index) => {
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
          console.log("hi error");
          console.error(error);
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
            uniqueAnimeList.map(async (item, index) => {
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
          setIsLoading(false);
          return editPostersAnimeList;
        } catch (error: any) {
          console.log("hi error two");
          if (error.response.status === 429) {
            setTimeout(async () => {
              await fetchAnimeListNew();
            }, 5000);
          }
          console.log(error.response.data);
        }
      };

      await fetchAnimeListNew();
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

  const displayTitle =
    lang === "en" ? firstAnime?.title_en || "" : firstAnime?.title || "";
  const title =
    lang === "en"
      ? animeListHits[0]?.material_data.title_en || ""
      : animeListHits[0]?.material_data.title || "";
  const objectGenres = firstHalf.map((item: any) => {
    return data.find((el) => el.ru_title.toLowerCase() === item.toLowerCase());
  });
  const subtitle = objectGenres
    .map((el: any) => (lang === "en" ? el.title : el.ru_title))
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
              last={!!animeByInterests.length}
            />
            {animeByInterests.map((el, index) => (
              <Section
                key={index}
                animeList={el[1]}
                navigateToAnimePage={navigateToAnimePage}
                setLoading={setIsImageLoading}
                title={el[0]}
                lastElement={
                  index + 1 === animeByInterests.length ? true : false
                }
              />
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Home;
