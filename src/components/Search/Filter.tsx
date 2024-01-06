import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Typography from "../ui/Typography";
import Bagde from "../ui/Bagde";
import sortData from "../../data/sort.json";
import categoriesData from "../../data/categories.json";
import regionData from "../../data/region.json";
import genreData from "../../data/interests.json";

interface BadgeProps {
  title: string;
  focus: boolean;
}

const Filter = () => {
  const [sort, setSort] = useState<BadgeProps[]>(sortData);
  const [categories, setCategories] = useState<BadgeProps[]>(categoriesData);
  const [region, setRegion] = useState<BadgeProps[]>(regionData);
  const [genre, setGenre] = useState<BadgeProps[]>(
    genreData.map((el) => {
      if (el.title === "Action") {
        return { title: "Action", focus: true };
      } else {
        return el;
      }
    })
  );
  const [releaseYear, setReleaseYear] = useState<BadgeProps[]>([]);

  useEffect(() => {
    Array.from({length: 81})
  }, [])

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.filterItem}>
        <Typography style={styles.filterTitleFirst} type="title">
          Sort
        </Typography>
        <View style={styles.filterContent}>
          {sort.map((item) => (
            <TouchableOpacity key={item.title} style={styles.badge}>
              <Bagde title={item.title} gradient={item.focus} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.filterItem}>
        <Typography style={styles.filterTitle} type="title">
          Categories
        </Typography>
        <View style={styles.filterContent}>
          {categories.map((item) => (
            <TouchableOpacity key={item.title} style={styles.badge}>
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
          {region.map((item) => (
            <TouchableOpacity key={item.title} style={styles.badge}>
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
          <TouchableOpacity>
            <Typography gradient={true} style={styles.seeAllTitle}>
              See All
            </Typography>
          </TouchableOpacity>
        </View>
        <View style={styles.filterContent}>
          {genre.map((item, index) => (
            <>
              {!(index >= 9) && (
                <TouchableOpacity key={item.title} style={styles.badge}>
                  <Bagde title={item.title} gradient={item.focus} />
                </TouchableOpacity>
              )}
            </>
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
