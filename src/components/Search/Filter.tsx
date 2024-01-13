import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import Typography from "../ui/Typography";
import Bagde from "../ui/Bagde";

interface BadgePropsWithRu {
  title: string;
  ru_title: string;
  focus: boolean;
}

interface BadgeProps {
  title: string;
  focus: boolean;
}

interface searchFilterProps {
  title: string;
  filter: string;
}

interface FilterProps {
  searchFilter: searchFilterProps[];
  setSearchFilter: React.Dispatch<React.SetStateAction<searchFilterProps[]>>;
  categories: BadgeProps[];
  setCategories: React.Dispatch<React.SetStateAction<BadgeProps[]>>;
  region: BadgeProps[];
  setRegion: React.Dispatch<React.SetStateAction<BadgeProps[]>>;
  genre: BadgePropsWithRu[];
  setGenre: React.Dispatch<React.SetStateAction<BadgePropsWithRu[]>>;
  releaseYear: BadgeProps[];
  setReleaseYear: React.Dispatch<React.SetStateAction<BadgeProps[]>>;
}

const Filter: FC<FilterProps> = ({
  searchFilter,
  setSearchFilter,
  categories,
  setCategories,
  region,
  setRegion,
  genre,
  setGenre,
  releaseYear,
  setReleaseYear,
}) => {
  const [seeAllGenre, setSeeAllGenre] = useState(false);
  const [seeAllYear, setSeeAllYear] = useState(false);

  useEffect(() => {
    const nowYear = new Date().getFullYear();
    let tempReleaseYears: BadgeProps[] = [];
    Array.from({ length: nowYear - 1941 }).map((item, index) => {
      tempReleaseYears = [
        ...tempReleaseYears,
        {
          title: index === 0 ? "All" : String(nowYear - index + 1),
          focus: index === 0 ? true : false,
        },
      ];
    });
    setReleaseYear(tempReleaseYears);
  }, []);

  const handleGradient = (title: string, filter: string) => {
    if (filter === "categories") {
      categories[categories.findIndex((el) => el.focus === true)].focus = false;
      categories[categories.findIndex((el) => el.title === title)].focus =
        !categories[categories.findIndex((el) => el.title === title)].focus;
      const categoriesTrue = categories.filter((el) => el.focus === true);
      const searchSort: searchFilterProps[] = categoriesTrue.map((el) => {
        return { title: el.title, filter: "categories" };
      });
      const tempData = [...searchFilter, ...searchSort];
      let foundEpisode = false;
      const result = tempData.filter((item) => {
        if (
          item.filter === "categories" &&
          item.title === title &&
          !foundEpisode
        ) {
          foundEpisode = true;
          return true;
        } else if (item.filter !== "categories") {
          return true;
        }
      });
      setSearchFilter([...result]);
      setCategories([...categories]);
    } else if (filter === "region") {
      region[region.findIndex((el) => el.focus === true)].focus = false;
      region[region.findIndex((el) => el.title === title)].focus =
        !region[region.findIndex((el) => el.title === title)].focus;
      const regionTrue = region.filter((el) => el.focus === true);
      const searchSort: searchFilterProps[] = regionTrue.map((el) => {
        return { title: el.title, filter: "region" };
      });
      const tempData = [...searchFilter, ...searchSort];
      let foundRegion = false;
      const result = tempData.filter((item) => {
        if (item.filter === "region" && item.title === title && !foundRegion) {
          foundRegion = true;
          return true;
        } else if (item.filter !== "region") {
          return true;
        }
      });
      setSearchFilter([...result]);
      setRegion([...region]);
    } else if (filter === "genre") {
      genre[genre.findIndex((el) => el.title === title)].focus =
        !genre[genre.findIndex((el) => el.title === title)].focus;
      const genreTrue = genre.filter((el) => el.focus === true);
      const searchSort: searchFilterProps[] = genreTrue.map((el) => {
        return { title: el.ru_title, filter: "genre" };
      });
      const filterSearchFilter = searchFilter.filter(
        (obj) => obj.filter !== "genre"
      );
      setSearchFilter([...filterSearchFilter, ...searchSort]);
      setGenre([...genre]);
    } else if (filter === "year") {
      releaseYear[releaseYear.findIndex((el) => el.focus === true)].focus =
        false;
      releaseYear[releaseYear.findIndex((el) => el.title === title)].focus =
        !releaseYear[releaseYear.findIndex((el) => el.title === title)].focus;
      const yearTrue = releaseYear.filter((el) => el.focus === true);
      const searchSort: searchFilterProps[] = yearTrue.map((el) => {
        return { title: el.title, filter: "year" };
      });
      const tempData = [...searchFilter, ...searchSort];
      let foundYear = false;
      const result = tempData.filter((item) => {
        if (item.filter === "year" && item.title === title && !foundYear) {
          foundYear = true;
          return true;
        } else if (item.filter !== "year") {
          return true;
        }
      });
      setSearchFilter([...result]);
      setReleaseYear([...releaseYear]);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.filterItem}>
        <Typography style={styles.filterTitle} type="title">
          Categories
        </Typography>
        <View style={styles.filterContent}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.badge}
              onPress={() => handleGradient(item.title, "categories")}
              disabled={item.focus}
            >
              <Bagde title={item.title} gradient={item.focus} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.filterItem}>
        <Typography style={styles.filterTitle} type="title">
          Region
        </Typography>
        <View style={styles.filterContent}>
          {region.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.badge}
              onPress={() => handleGradient(item.title, "region")}
              disabled={item.focus}
            >
              <Bagde title={item.title} gradient={item.focus} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.filterItem}>
        <View style={styles.seeAllHeader}>
          <Typography style={styles.filterTitle} type="title">
            Genre
          </Typography>
          <TouchableOpacity onPress={() => setSeeAllGenre(!seeAllGenre)}>
            <Typography gradient={true} style={styles.seeAllTitle}>
              See All
            </Typography>
          </TouchableOpacity>
        </View>
        <View style={styles.filterContent}>
          {genre.map((item, index) => (
            <View key={index}>
              {seeAllGenre ? (
                <TouchableOpacity
                  key={index}
                  style={styles.badge}
                  onPress={() => handleGradient(item.title, "genre")}
                >
                  <Bagde title={item.title} gradient={item.focus} />
                </TouchableOpacity>
              ) : (
                <>
                  {!(index >= 9) && (
                    <TouchableOpacity
                      key={index}
                      style={styles.badge}
                      onPress={() => handleGradient(item.title, "genre")}
                    >
                      <Bagde title={item.title} gradient={item.focus} />
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          ))}
        </View>
      </View>
      <View style={styles.filterItem}>
        <View style={styles.seeAllHeader}>
          <Typography style={styles.filterTitle} type="title">
            Release Year
          </Typography>
          <TouchableOpacity onPress={() => setSeeAllYear(!seeAllYear)}>
            <Typography gradient={true} style={styles.seeAllTitle}>
              See All
            </Typography>
          </TouchableOpacity>
        </View>
        <View style={styles.filterContent}>
          {releaseYear.map((item, index) => (
            <View key={index}>
              {seeAllYear ? (
                <TouchableOpacity
                  key={index}
                  style={styles.badge}
                  onPress={() => handleGradient(item.title, "year")}
                  disabled={item.focus}
                >
                  <Bagde title={item.title} gradient={item.focus} />
                </TouchableOpacity>
              ) : (
                <>
                  {!(index >= 4) && (
                    <TouchableOpacity
                      key={index}
                      style={styles.badge}
                      onPress={() => handleGradient(item.title, "year")}
                      disabled={item.focus}
                    >
                      <Bagde title={item.title} gradient={item.focus} />
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 90,
  },
  filterItem: {},
  filterTitleFirst: {
    fontSize: 20,
    fontWeight: "600",
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  filterContent: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    marginBottom: 24,
  },
  badge: {
    marginTop: 24,
    marginRight: 12,
  },
  seeAllHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  seeAllTitle: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19.6,
    letterSpacing: 0.2,
    marginTop: 2,
  },
});

export default Filter;
