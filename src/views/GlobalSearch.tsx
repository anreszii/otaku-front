import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Back, Filter as FilterIcon, Search } from "../icons";
import IconButton from "../components/ui/IconButton";
import Typography from "../components/ui/Typography";
import Input from "../components/ui/Input";
import Bagde from "../components/ui/Bagde";
import Filter from "../components/Search/Filter";
import { getNewAnimes } from "../api/kodik/getNewAnimes";
import { searchAnime } from "../api/kodik/searchAnime";
import { KodikDataProps } from "../interfaces/kodikData";
import categoriesData from "../data/categories.json";
import regionData from "../data/region.json";
import genreData from "../data/interests.json";
import { Image } from "expo-image";
import CircleProgress from "../components/ui/CircleProgress";

interface SearchFilterProps {
  title: string;
  filter: string;
}

interface BadgePropsWithRu extends BadgeProps {
  ru_title: string;
}

interface BadgeProps {
  title: string;
  focus: boolean;
}

export default function GlobalSearch({ route }: any) {
  const navigation = useNavigation<any>();
  const [newAnimesList, setNewAnimesList] = useState<KodikDataProps[]>([]);
  const [stage, setStage] = useState(1);
  const [searchFilter, setSearchFilter] = useState<SearchFilterProps[]>([]);
  const [categories, setCategories] = useState<BadgeProps[]>(categoriesData);
  const [region, setRegion] = useState<BadgeProps[]>(regionData);
  const [genre, setGenre] = useState<BadgePropsWithRu[]>(genreData);
  const [releaseYear, setReleaseYear] = useState<BadgeProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout | null>(null);
  const [searchData, setSearchData] = useState<KodikDataProps[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getNewAnimes();
        const uniqueAnimeList = Array.from(
          new Set(data.results.map((item: any) => item.title))
        ).map((title) =>
          data.results.find((item: any) => item.title === title)
        );
        setNewAnimesList(uniqueAnimeList);
        setIsLoading(false);
      } catch (e: any) {
        console.error(e.response.data, "hi");
      }
    })();
  }, []);

  useEffect(() => {
    setSearchData(null);
    setSearch("");
  }, [route]);

  const handleDeleteFilter = (title: string, filter: string) => {
    const result = searchFilter.filter((el) => el.title !== title);
    setSearchFilter(result);
    switch (filter) {
      case "categories":
        setCategories((prev) =>
          prev.map((el, index) => ({
            ...el,
            focus: el.title !== title && index === 0 ? true : false,
          }))
        );
        break;
      case "region":
        setRegion((prev) =>
          prev.map((el, index) => ({
            ...el,
            focus: el.title !== title && index === 0 ? true : false,
          }))
        );
        break;
      case "genre":
        setGenre((prev) =>
          prev.map((el) => ({
            ...el,
            focus: el.ru_title === title ? false : el.focus,
          }))
        );
        break;
      case "year":
        setReleaseYear((prev) =>
          prev.map((el, index) => ({
            ...el,
            focus: el.title !== title && index === 0 ? true : false,
          }))
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!searchFilter.length) {
      setSearchData(null);
      setSearch("");
    } else {
      searchAnimeList();
    }
  }, [searchFilter]);

  useEffect(() => {
    searchAnimeList();
  }, [search]);

  const fetchAnimeList = async (params: any) => {
    try {
      const { data } = await searchAnime(params);
      console.log(data);
      const uniqueAnimeList = Array.from(
        new Set(data.results.map((item: any) => item.material_data.title))
      ).map((title) =>
        data.results.find((item: any) => item.material_data.title === title)
      );
      console.log(uniqueAnimeList, "unique");
      setSearchData(uniqueAnimeList);
      setIsLoading(false);
    } catch (e: any) {
      console.error(e);
    }
  };

  const searchAnimeList = () => {
    if (search.trim() !== "" || searchFilter.length) {
      if (timeoutID !== null) {
        clearTimeout(timeoutID);
      }

      const timeout = setTimeout(async () => {
        setIsLoading(true);
        if (!searchFilter.length) {
          await fetchAnimeList({ title: search });
        } else {
          const filterItems: { [key: string]: any } = { title: search };
          const filters = searchFilter.map((filter) => filter.filter);
          filters.map((item) => {
            const titleFilter = searchFilter.find(
              (el) => el.filter === item
            )?.title;
            switch (item) {
              case "categories":
                filterItems.types = titleFilter;
                break;
              case "region":
                filterItems.region = titleFilter;
                break;
              case "year":
                filterItems.year = titleFilter;
                break;
              case "genre":
                const genres = searchFilter
                  .filter((el) => el.filter === "genre")
                  .map((obj) => obj.title);
                filterItems.genre = genres;
                break;
              default:
                break;
            }
          });
          fetchAnimeList(filterItems);
        }
      }, 1000);

      setTimeoutID(timeout);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        {stage === 1 && (
          <View>
            <View style={styles.header}>
              <View style={styles.searchInput}>
                <Input
                  left={
                    <TextInput.Icon
                      disabled
                      icon={() => <Search color="#7210FF" />}
                    />
                  }
                  value={search}
                  onChangeText={(value) => setSearch(value)}
                />
              </View>
              <IconButton
                icon={<FilterIcon />}
                style={styles.iconButtonSearch}
                onPress={() => setStage(2)}
              />
            </View>
            {!!searchFilter.length && (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.filters}>
                  {searchFilter.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.bagde}
                      onPress={() =>
                        handleDeleteFilter(item.title, item.filter)
                      }
                    >
                      <Bagde title={item.title} gradient={true} />
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            )}
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
        {isLoading ? (
          <View style={styles.loader}>
            <CircleProgress />
          </View>
        ) : (
          <>
            {stage === 1 && (
              <View style={styles.content}>
                {!!searchData ? (
                  <>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      style={
                        !!searchFilter.length
                          ? !!searchData
                            ? { marginBottom: 86 }
                            : { marginTop: 24 }
                          : !!searchData
                          ? {}
                          : { marginTop: 24 }
                      }
                    >
                      <View style={{ marginBottom: 152 }}>
                        {searchData.map((item, index) => (
                          <TouchableOpacity
                            key={index}
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
                                  : item?.material_data?.poster_url.includes(
                                      "https:"
                                    )
                                  ? item?.material_data?.poster_url
                                  : `https:${item?.material_data?.poster_url}`,
                              }}
                              style={styles.animeImage}
                              transition={1000}
                            />
                            <Typography type="title" style={styles.animeTitle}>
                              {item?.material_data?.anime_title.length >= 100
                                ? item?.material_data?.anime_title.substring(
                                    0,
                                    100
                                  ) + "..."
                                : item?.material_data?.anime_title}
                            </Typography>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>
                  </>
                ) : (
                  <>
                    <Typography type="title" style={styles.titleSearch}>
                      New Animes
                    </Typography>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      style={
                        !!searchFilter.length
                          ? !!searchData
                            ? {}
                            : { marginTop: 24, marginBottom: 136 }
                          : !!searchData
                          ? {}
                          : { marginTop: 24 }
                      }
                    >
                      {newAnimesList && (
                        <View style={{ marginBottom: 152 }}>
                          {newAnimesList.map((item, index) => (
                            <TouchableOpacity
                              key={index}
                              style={styles.animeContent}
                              onPress={() =>
                                navigation.navigate("AnimePage", {
                                  title: item.title,
                                })
                              }
                            >
                              <Image
                                source={{
                                  uri: !!item?.material_data?.screenshots
                                    ?.length
                                    ? item?.material_data?.screenshots[0]
                                    : item.material_data.poster_url,
                                }}
                                style={styles.animeImage}
                              />
                              <Typography
                                type="title"
                                style={styles.animeTitle}
                              >
                                {item.material_data.anime_title.length >= 100
                                  ? item.material_data.anime_title.substring(
                                      0,
                                      100
                                    ) + "..."
                                  : item.material_data.anime_title}
                              </Typography>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </ScrollView>
                  </>
                )}
              </View>
            )}
          </>
        )}

        {stage === 2 && (
          <View style={styles.content}>
            <Filter
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
              categories={categories}
              setCategories={setCategories}
              region={region}
              setRegion={setRegion}
              genre={genre}
              setGenre={setGenre}
              releaseYear={releaseYear}
              setReleaseYear={setReleaseYear}
            />
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
  filters: {
    flexDirection: "row",
    marginTop: 24,
  },
  bagde: {
    marginRight: 12,
  },
  loader: {
    width: "100%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
});
