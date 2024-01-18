import axios, { AxiosResponse } from "axios";

interface SearchAnimeProps {
  title: string;
  types?: string;
  limit?: number;
  region?: string;
  genre?: string[];
  year?: string;
}

interface RequestConfig {
  token: string;
  types: string;
  with_material_data: boolean;
  has_field: string;
  title?: string;
  countries: string;
  all_genres_and?: string;
  year?: string;
}

export const searchAnime = async ({
  title,
  types,
  limit,
  region,
  genre,
  year,
}: SearchAnimeProps): Promise<AxiosResponse> => {
  const PUBLIC_KEY: any = process.env.EXPO_PUBLIC_KODIK_PUBLIC_KEY;

  let type = "anime,anime-serial";
  let country = "Япония,Китай";
  let genreList = genre?.join(",") || "";
  let yearAnime = year === "All" ? "" : year || "";

  if (types === "Episode") {
    type = "anime-serial";
  } else if (types === "Movie") {
    type = "anime";
  }

  if (region === "Japan") {
    country = "Япония";
  } else if (region === "Chinese") {
    country = "Китай";
  }

  const baseConfig: RequestConfig = {
    token: PUBLIC_KEY,
    types: type,
    with_material_data: true,
    has_field: "shikimori_id",
    countries: country,
    all_genres_and: genreList,
  };

  const requestConfig: RequestConfig =
    title.trim() === ""
      ? yearAnime === ""
        ? {
            ...baseConfig,
          }
        : { ...baseConfig, year: yearAnime }
      : yearAnime === ""
      ? { ...baseConfig, title: title }
      : { ...baseConfig, title: title, year: yearAnime };

  const url =
    title?.replaceAll(" ", "") === ""
      ? "https://kodikapi.com/list"
      : "https://kodikapi.com/search";

  return axios.get(url, {
    params: requestConfig,
  });
};
