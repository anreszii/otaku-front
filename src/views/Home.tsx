import React, { useEffect, useState } from "react";
import { Image, ImageBackground, SafeAreaView, View } from "react-native";
import { getAnimeList } from "../api/kodik/getAnimeList";
import { useNavigation } from "@react-navigation/native";
import HeaderHome from "../components/Layouts/HeaderHome";
import homeStyles from "../style/homeStyles";
import InfoSection from "../components/Home/InfoSection";
import TopHitsSection from "../components/Home/TopHitsSection";
import Loader from "../components/ui/Loader";

const Home: React.FC = () => {
  const navigation = useNavigation<any>();
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isBackgroundImageLoading, setIsBackgroundImageLoading] =
    useState(true);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const { data } = await getAnimeList();
        const uniqueAnimeList = Array.from(
          new Set(data.results.map((item: any) => item.material_data.title))
        ).map((title) =>
          data.results.find((item: any) => item.material_data.title === title)
        );
        setAnimeList(uniqueAnimeList);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchAnimeList();
  }, []);

  const loadBackgroundImage = () => {
    Image.getSize(
      "https://shikimori.one/system/screenshots/original/b13ecb9e1d5971f9d4abd4b5541e481de5dfe17c.jpg",
      () => {
        setIsBackgroundImageLoading(false);
      },
      () => {
        setIsBackgroundImageLoading(false);
      }
    );
  };

  useEffect(() => {
    loadBackgroundImage();
  }, []);

  const loadImages = () => {
    const promises = animeList.map((item) => {
      return new Promise((resolve) => {
        Image.getSize(
          item.material_data.poster_url,
          (width, height) => {
            resolve({ width, height });
          },
          () => {
            resolve(null);
          }
        );
      });
    });

    Promise.all(promises)
      .then(() => {
        setIsImageLoading(false);
      })
      .catch((error) => {
        console.error("Error loading images:", error);
        setIsImageLoading(false);
      });
  };

  useEffect(() => {
    if (animeList.length > 0) {
      loadImages();
    }
  }, [animeList]);

  const navigateToPlayer = (item: any) => {
    navigation.navigate("Player", { creature: item });
  };

  const firstAnime = animeList[0]?.material_data;
  const filteredGenres = (firstAnime?.all_genres || []).filter(
    (genre: any) => !["аниме", "мультфильм"].includes(genre)
  );

  const middleIndex = Math.floor(filteredGenres.length / 2);
  const firstHalf = filteredGenres.slice(0, middleIndex);

  const title = firstAnime?.title || "";
  const subtitle = firstHalf
    .join(", ")
    .substring(0, firstHalf.join(", ").length);

  return (
    <View style={homeStyles.container}>
      {isLoading || isImageLoading || isBackgroundImageLoading ? (
        <Loader />
      ) : (
        <>
          <ImageBackground
            source={{
              uri: animeList[0].material_data.screenshots[0],
            }}
            style={homeStyles.bg}
            blurRadius={5}
          >
            <View style={homeStyles.overlay}></View>
            <SafeAreaView>
              <HeaderHome />
            </SafeAreaView>
            <InfoSection title={title} subtitle={subtitle} />
          </ImageBackground>
          <TopHitsSection
            animeList={animeList}
            navigation={navigation}
            navigateToPlayer={navigateToPlayer}
          />
        </>
      )}
    </View>
  );
};

export default Home;
