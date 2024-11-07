import React, { useEffect, useState } from "react";
import { Layout } from "components";
import { Button, Typography } from "ui";
import useOngoingsStore from "shared/stores/ongoingsStore";
import { IAnime } from "shared/types";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { interpolate } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation";

const Home = () => {
  const { ongoings } = useOngoingsStore();

  const [topOngoings, setTopOngoings] = useState<IAnime[]>([]);

  const navigation = useTypedNavigation();

  useEffect(() => {
    const topOngoings = [
      ...ongoings.filter((el) => el.title_orig !== "One Piece"),
    ].slice(0, 5);

    setTopOngoings(topOngoings);
  }, [ongoings]);

  const animationStyle = React.useCallback((value: number) => {
    "worklet";

    const zIndex = interpolate(value, [-2, -1, 0, 1, 2], [10, 20, 30, 20, 10]);
    const opacity = interpolate(value, [-0.75, 0, 1], [0, 1, 0]);

    return {
      zIndex,
      opacity,
    };
  }, []);

  const cleanTitle = (title: string) => {
    return title
      .replace(/\[(ТВ|TB)[-\s]?(\d+)?(?:,\s*[чЧ]асть\s*(\d+))?\]/g, (match, _, season, part) => {
        if (season && part) {
          return `${season}, часть ${part}`;
        } else if (season) {
          return `${season}`;
        } else if (part) {
          return `часть ${part}`;
        }
        return "";
      })
      .trim();
  };

  const renderItem = ({ item, index }: { item: IAnime; index: number }) => {
    return (
      <>
        <View style={styles.background}>
          <Image
            source={{ uri: item.material_data.poster_url }}
            style={styles.poster}
          />
          <LinearGradient
            colors={["transparent", "#0B1218"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.backgroundGradient}
          />
        </View>
        <View style={[styles.infoContainer, { zIndex: 999 - index }]}>
          <Typography fontFamily="Urbanist" style={styles.title}>
            {cleanTitle(item.title)}
          </Typography>
          {item.material_data.anime_genres && (
            <View style={styles.genreContainer}>
              {item.material_data.anime_genres.slice(0, 3).map((el) => (
                <Typography key={el} fontFamily="Urbanist" style={styles.genre}>
                  {el}
                </Typography>
              ))}
            </View>
          )}
          <Button
            title="Смотреть"
            variant="gradient"
            style={styles.button}
            height={30}
            onPress={() => {
              navigation.navigate("Anime", { title: item.title });
            }}
          />
        </View>
      </>
    );
  };

  return (
    <Layout noMargin noSafe scroll>
      <Carousel
        data={topOngoings}
        renderItem={renderItem}
        width={Dimensions.get("window").width}
        height={Dimensions.get("window").height * 0.6}
        customAnimation={animationStyle}
        autoPlay
        loop
        autoPlayInterval={8000}
        scrollAnimationDuration={1000}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  backgroundGradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  poster: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  infoContainer: {
    alignSelf: "center",
    width: "80%",
    position: "absolute",
    bottom: 0,
    zIndex: 10,
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flexWrap: "wrap",
  },
  genreContainer: {
    alignSelf: "center",
    flexDirection: "row",
    gap: 10,
  },
  genre: {
    fontSize: 12,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    width: "50%",
    alignSelf: "center",
    height: 30,
  },
});

export default Home;
