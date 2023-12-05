import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getAnimeList } from "../api/getAnimeList";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation<any>();
  const [animeList, setAnimeList] = useState<any[]>([]);

  useEffect(() => {
    getAnimeList(5).then((data) => {
      setAnimeList(data.data.results);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {animeList.map((item) => (
        <View key={item.id}>
          <TouchableOpacity
            style={styles.content}
            onPress={() =>
              navigation.navigate("Player", {
                creature: item,
              })
            }
          >
            <Image
              source={{ uri: item.material_data.poster_url }}
              resizeMode="contain"
              style={styles.poster}
            />
            <View style={styles.titles}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.title_orig}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    width: 200,
    marginTop: 20,
  },
  poster: {
    width: 150,
    height: 150,
  },
  titles: {
    flex: 0,
  },
  title: {},
  subtitle: {
    opacity: 0.5,
  },
});
