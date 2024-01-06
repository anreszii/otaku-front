import axios from "axios";

export const getNewAnimes = async (limit?: any) => {
  const PUBLIC_KEY: any = process.env.EXPO_PUBLIC_KODIK_PUBLIC_KEY;

  return axios.get("https://kodikapi.com/list", {
    params: {
      token: PUBLIC_KEY,
      types: "anime,anime-serial",
      with_material_data: true,
      sort: "year",
    },
  });
};
