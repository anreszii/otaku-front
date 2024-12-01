import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "components";
import { Button, Typography } from "ui";
import useOngoingsStore from "shared/stores/ongoingsStore";
import { IAnime } from "shared/types";
import Carousel from "react-native-reanimated-carousel";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import { useTypedNavigation } from "shared/hooks/useTypedNavigation";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFavoriteStore } from "shared/stores";
import { cleanTitle } from "shared/helpers";

const Home = () => {
  const { ongoings } = useOngoingsStore();
  const { favorite } = useFavoriteStore();

  const [topOngoings, setTopOngoings] = useState<IAnime[]>([]);

  const { top } = useSafeAreaInsets();
  const navigation = useTypedNavigation();

  const snapPoints = useMemo(
    () => [
      Dimensions.get("window").height * 0.3,
      Dimensions.get("window").height - top - 15,
    ],
    []
  );

  const animatedIndex = useSharedValue(0);

  const bottomSheetRef = useRef<BottomSheet>(null);

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

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const interpolatedValue = interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      "clamp"
    );

    return {
      opacity: withSpring(interpolatedValue, {
        damping: 18,
        stiffness: 90,
        mass: 0.6,
      }),
    };
  });

  const handleNavigateAnime = (title: string) => {
    navigation.navigate("Anime", { title });
  };

  const handleNavigateSearch = () => {
    navigation.navigate("Search");
  };

  return (
    <View style={styles.container}>
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
      <Animated.View
        style={[
          styles.header,
          {
            paddingTop: top > 0 ? top - 15 : 0,
          },
          headerAnimatedStyle,
        ]}
      >
        <Image
          source={require("../../../assets/images/otakuLogo.png")}
          style={styles.headerLogo}
        />
      </Animated.View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        animatedIndex={animatedIndex}
        enablePanDownToClose={false}
        enableOverDrag={false}
        enableDynamicSizing={false}
        index={0}
        backgroundStyle={styles.bottomSheetBackground}
        animateOnMount={false}
        handleComponent={null}
      >
        <BottomSheetScrollView
          contentContainerStyle={{
            marginTop: 35,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.searchContainer}
            onPress={handleNavigateSearch}
          >
            <Typography fontFamily="Urbanist" style={styles.searchText}>
              Поиск
            </Typography>
          </TouchableOpacity>
          <View style={styles.animeBlock}>
            <Typography fontFamily="Montserrat" style={styles.animeBlockTitle}>
              Из вашего избранного
            </Typography>
            <ScrollView
              horizontal
              style={styles.animeBlockContainer}
              contentContainerStyle={styles.animeBlockContent}
              showsHorizontalScrollIndicator={false}
            >
              {favorite.map((el) => (
                <TouchableOpacity
                  key={el._id}
                  activeOpacity={0.7}
                  style={styles.animeBlockItem}
                  onPress={() => handleNavigateAnime(el.animeData?.title || "")}
                >
                  <Image
                    source={{
                      uri: el.animeData?.material_data.poster_url || "",
                    }}
                    style={styles.animeBlockItemPoster}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1218",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0B1218",
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  headerLogo: {
    width: 75,
    height: 50,
    marginRight: 10,
  },
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
  bottomSheetBackground: {
    backgroundColor: "#0B1218",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  searchText: {
    fontSize: 18,
    fontFamily: "Urbanist",
    color: "rgba(255, 255, 255, 0.5)",
  },
  animeBlock: {
    marginTop: 20,
  },
  animeBlockTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  animeBlockContainer: {
    marginHorizontal: -20,
  },
  animeBlockContent: {
    flexGrow: 1,
    gap: 10,
    marginTop: 15,
    paddingHorizontal: 20,
  },
  animeBlockItem: {
    height: 225,
    width: 175,
  },
  animeBlockItemPoster: {
    height: 225,
    width: "100%",
    borderRadius: 10,
  },
});

export default Home;
