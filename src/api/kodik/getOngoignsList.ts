import axios from "axios";

export const getOngoingsList = async (limit?: any) => {
  const PUBLIC_KEY: any = process.env.EXPO_PUBLIC_KODIK_PUBLIC_KEY;

  return axios.get("https://kodikapi.com/list", {
    params: {
      token: PUBLIC_KEY,
      with_material_data: true,
      anime_status: "ongoing",
    },
  });
};
