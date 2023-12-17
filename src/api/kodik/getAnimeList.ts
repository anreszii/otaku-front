import axios from "axios";

export const getAnimeList = async (limit?: any) => {
  const PUBLIC_KEY: any = process.env.EXPO_PUBLIC_KODIK_PUBLIC_KEY;

  return axios.get("https://kodikapi.com/list", {
    params: {
      token: PUBLIC_KEY,
      types: "anime-serial",
      with_material_data: true,
      with_episodes_data: true,
      sort: "shikimori_rating",
    },
  });
};
