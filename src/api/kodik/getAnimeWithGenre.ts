import axios from "axios";
import data from "../../data/interests.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { i18n } from "../../plugins/i18n";

export const getAnimeWithGenre = async (genreList: any) => {
  const PUBLIC_KEY: any = process.env.EXPO_PUBLIC_KODIK_PUBLIC_KEY;

  const genres = genreList;
  let animeByInterest: any = [];

  while (!!genres.length) {
    const result = await axios.get("https://kodikapi.com/list", {
      params: {
        token: PUBLIC_KEY,
        types: "anime,anime-serial",
        with_material_data: true,
        sort: "shikimori_rating",
        has_field: "shikimori_id",
        all_genres_and: genres[0],
      },
    });

    const genre = data.find((el: any) => el.ru_title === genres[0]);
    const lang = i18n.language;

    animeByInterest = [
      ...animeByInterest,
      [lang === "en" ? genre?.title : genre?.ru_title, result.data.results],
    ];

    genres.splice(0, 1);
  }

  return animeByInterest;
};
