import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import userService from "../api/user/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContainerMain from "../components/Layouts/ContainerMain";
import Typography from "../components/ui/Typography";
import { Image } from "react-native-elements";
import Loader from "../components/ui/Loader";
import Skeleton from "../components/ui/Skeleton";
import HeaderMyList from "../components/Layouts/HeaderMyList";
import AnimeItem from "../components/List/AnimeItem";

export default function List({ route }: any) {
  const [favoriteList, setFavoriteList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem("id");
      const list = (await userService.getFavoriteList(String(id))).data;
      setFavoriteList(list);
      setIsLoading(false);
    })();
  }, [route]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView>
          <HeaderMyList />
          <>
            {favoriteList.length > 0 ? (
              <ScrollView style={{ marginTop: 48 }}>
                <ContainerMain>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      width: "89%",
                    }}
                  >
                    {favoriteList.map((item, index) => (
                      <AnimeItem key={index} item={item} />
                    ))}
                  </View>
                </ContainerMain>
              </ScrollView>
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "88%",
                }}
              >
                <Image
                  source={require("../../assets/listNone.png")}
                  style={{ width: 380, height: 380 }}
                  PlaceholderContent={<Skeleton width={380} height={380} />}
                />
                <Typography
                  gradient={true}
                  type="title"
                  style={{
                    fontSize: 24,
                    fontWeight: "600",
                    lineHeight: 28.8,
                  }}
                >
                  Your List is Empty
                </Typography>
                <Typography
                  style={{
                    textAlign: "center",
                    marginTop: 16,
                    fontSize: 18,
                    fontWeight: "500",
                    lineHeight: 25.2,
                    letterSpacing: 0.2,
                  }}
                >
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
