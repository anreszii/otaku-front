import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../components/ui/Input";
import { TextInput } from "react-native-paper";
import { Back, Filter as FilterIcon, Search } from "../icons";
import IconButton from "../components/ui/IconButton";
import Typography from "../components/ui/Typography";
import { getNewAnimes } from "../api/kodik/getNewAnimes";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Filter from "../components/Search/Filter";
import HeaderBackStage from "../components/Layouts/HeaderBackStage";

export default function GlobalSearch() {
  const navigation = useNavigation<any>();
  const [newAnimesList, setNewAnimesList] = useState<any[]>([]);
  const [stage, setStage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getNewAnimes();

        const uniqueAnimeList = Array.from(
          new Set(data.results.map((item: any) => item.material_data.title))
        ).map((title) =>
          data.results.find((item: any) => item.material_data.title === title)
        );

        setNewAnimesList(uniqueAnimeList);
      } catch (e: any) {
        console.log(e.response.data, "hi");
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        {stage === 1 && (
          <View style={styles.header}>
            <View style={styles.searchInput}>
              <Input
                left={
                  <TextInput.Icon
                    disabled
                    icon={() => <Search color="#7210FF" />}
                  />
                }
              />
            </View>
            <IconButton
              icon={<FilterIcon />}
              style={styles.iconButtonSearch}
              onPress={() => setStage(2)}
            />
          </View>
        )}
        {stage === 2 && (
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setStage(1)}>
              <Back color="#000" />
            </TouchableOpacity>
            <Typography type="title" style={styles.filterTitle}>
              Sort & Filter
            </Typography>
          </View>
        )}

        {stage === 1 && (
          <View style={styles.content}>
            <Typography type="title" style={styles.titleSearch}>
              New Animes
            </Typography>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.newAnimesContent}
            >
              {newAnimesList && (
                <View style={{ marginBottom: 152 }}>
                  {newAnimesList.map((item) => (
                    <TouchableOpacity
                      key={item.title}
                      style={styles.animeContent}
                      onPress={() =>
                        navigation.navigate("AnimePage", {
                          title: item.title,
                        })
                      }
                    >
                      <Image
                        source={{
                          uri: !!item?.material_data?.screenshots?.length
                            ? item?.material_data?.screenshots[0]
                            : item.material_data.poster_url,
                        }}
                        style={styles.animeImage}
                      />
                      <Typography type="title" style={styles.animeTitle}>
                        {item.material_data.anime_title}
                      </Typography>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        )}
        {stage === 2 && (
          <View style={styles.content}>
            <Filter />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    marginTop: 12,
  },
  searchInput: {
    marginRight: 12,
    width: "80%",
    marginBottom: 12,
  },
  iconButtonSearch: {
    height: 56,
    width: 56,
  },
  content: {
    marginTop: 24,
  },
  titleSearch: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
  },
  newAnimesContent: {
    marginTop: 24,
  },
  animeContent: {
    flexDirection: "row",
    alignItems: "center",
    height: 113,
    marginBottom: 12,
  },
  animeImage: {
    width: "45%",
    height: 113,
    borderRadius: 10,
    marginRight: 20,
  },
  animeTitle: {
    width: "45%",
  },
  filterTitle: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
    marginLeft: 16,
  },
});
