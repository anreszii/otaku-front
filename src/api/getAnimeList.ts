import axios from "axios";

export const getAnimeList = async (limit?: any) => {
  return axios.get("https://kodikapi.com/list", {
    params: {
      token: "af1f9932e98b5d0615e90afe015ee23e",
      types: "anime-serial",
      limit: limit,
      with_material_data: true,
      with_episodes: true,
    },
  });
};
