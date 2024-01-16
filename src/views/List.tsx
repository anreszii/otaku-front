import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LogBox,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import userService from "../api/user/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Typography from "../components/ui/Typography";
import { Image } from "react-native-elements";
import Loader from "../components/ui/Loader";
import Skeleton from "../components/ui/Skeleton";
import AnimeItem from "../components/List/AnimeItem";
import Header from "../components/Layouts/Header";
import { Search } from "../icons";
import Input from "../components/ui/Input";
import { TextInput } from "react-native-paper";
import HeaderInput from "../components/Layouts/HeaderInput";
import { FlatList } from "react-native-gesture-handler";
import { backgroundColors } from "../constants/colors";
import { useFocusEffect } from "@react-navigation/native";

interface FavoriteItem {
  poster: string;
  title: string;
  rating: string;
}

export default function List({ route }: any) {
  const [favoriteList, setFavoriteList] = useState<FavoriteItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearch, setIsSearch] = useState(false);

  const filterData = () => {
    return favoriteList.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const headerInputOpacity = new Animated.Value(0);

  const animateHeaderInput = (show: boolean) => {
    Animated.timing(headerInputOpacity, {
      toValue: show ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setIsLoading(true);
        const id = await AsyncStorage.getItem("id");
        const list: FavoriteItem[] = (
          await userService.getFavoriteList(String(id))
        ).data;
        setFavoriteList(list);
        setIsLoading(false);
      })();
    }, [route])
  );

  useEffect(() => {
    animateHeaderInput(isSearch);
  }, [isSearch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#FFF",
            height: "100%",
          }}
        >
          {isSearch ? (
            <HeaderInput
              icon={<Search color="#000" />}
              onPress={() => {
                setIsSearch(false);
                setSearchQuery("");
              }}
              value={searchQuery}
              setValue={setSearchQuery}
              opacity={headerInputOpacity}
            />
          ) : (
            <Header
              title="My List"
              icon={<Search color="#000" />}
              onPress={() => setIsSearch(true)}
            />
          )}

          {favoriteList.length > 0 ? (
            <View style={styles.container}>
              <ScrollView
                contentContainerStyle={
                  isSearch
                    ? { ...styles.content, marginTop: 12 }
                    : styles.content
                }
                showsVerticalScrollIndicator={false}
              >
                {filterData().map((item) => (
                  <AnimeItem key={item.title} item={item} />
                ))}
              </ScrollView>
            </View>
          ) : (
            <View style={styles.contentNone}>
              <Image
                source={require("../../assets/listNone.png")}
                style={{ width: 380, height: 380 }}
                PlaceholderContent={<Skeleton width={380} height={380} />}
              />
              <View style={styles.noneTextContent}>
                <Typography
                  gradient={true}
                  type="title"
                  style={styles.titleNone}
                >
                  Your List is Empty
                </Typography>
                <Typography style={styles.subtitleNone}>
                  It seems that you haven't added any anime to the list
                </Typography>
              </View>
            </View>
          )}
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColors.backgroundLight,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 72,
    marginBottom: 72,
    marginHorizontal: 24,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  contentNone: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  noneTextContent: {
    width: "80%",
  },
  titleNone: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
    textAlign: "center",
  },
  subtitleNone: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 0.2,
    textAlign: "center",
    marginTop: 16,
  },
});
