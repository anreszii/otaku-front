import axios from "axios";

export const getAnimeList = async (limit?: any) => {
  console.log(process.env);
  const PUBLIC_KEY: any = process.env.EXPO_PUBLIC_KODIK_PUBLIC_KEY;

  return axios.get("https://kodikapi.com/list", {
    params: {
      token: PUBLIC_KEY,
      types: "anime-serial",
      limit: limit,
      with_material_data: true,
      with_episodes: true,
    },
  });
};
