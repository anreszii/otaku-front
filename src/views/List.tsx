import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import userService from "../api/user/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Typography from "../components/ui/Typography";
import { Image } from "react-native-elements";
import Loader from "../components/ui/Loader";
import Skeleton from "../components/ui/Skeleton";
import AnimeItem from "../components/List/AnimeItem";
import Header from "../components/Layouts/Header";
import { Search } from "../icons";

interface FavoriteItem {
  poster: string;
  title: string;
  rating: string;
}

export default function List({ route }: any) {
  const [favoriteList, setFavoriteList] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem("id");
      const list: FavoriteItem[] = (
        await userService.getFavoriteList(String(id))
      ).data;
      setFavoriteList(list);
      setIsLoading(false);
    })();
  }, [route]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView
          style={{
            backgroundColor: "#FFF",
            height: "100%",
          }}
        >
          <Header title="My List" icon={<Search color="#000" />} />
          <>
            {favoriteList.length > 0 ? (
              <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.content}>
                  {favoriteList.map((item, index) => (
                    <AnimeItem key={index} item={item} />
                  ))}
                </View>
              </ScrollView>
            ) : (
              <View style={styles.contentNone}>
                <Image
                  source={require("../../assets/listNone.png")}
                  style={{ width: 380, height: 380 }}
                  PlaceholderContent={<Skeleton width={380} height={380} />}
                />
                <Typography
                  gradient={true}
                  type="title"
                  style={styles.titleNone}
                >
                  Your List is Empty
                </Typography>
                <Typography style={styles.subtitleNone}>
                  It seems that you haven't added{"\n"} any anime to the list
                </Typography>
              </View>
            )}
          </>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 72,
    marginHorizontal: 24,
    marginBottom: 72,
    width: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "89%",
  },
  contentNone: {
    height: "100%",
    marginTop: 50,
  },
  titleNone: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
  },
  subtitleNone: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 25.2,
    letterSpacing: 0.2,
  },
});
