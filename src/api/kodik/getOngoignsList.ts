import axios, { AxiosRequestConfig } from "axios";

export const getOngoingsList = async (limit?: any) => {
  const PUBLIC_KEY: any = process.env.EXPO_PUBLIC_KODIK_PUBLIC_KEY;
  let resultArray: any[] = [];

  let nextPage = "https://kodikapi.com/list";

  do {
    let requestConfig: AxiosRequestConfig = {
      url: nextPage,
      method: "get",
    };

    if (!resultArray.length) {
      requestConfig.params = {
        token: PUBLIC_KEY,
        with_material_data: true,
        anime_status: "ongoing",
        has_field: "shikimori_id",
      };
    }

    const response = await axios(requestConfig);

    resultArray = resultArray.concat(response.data.results);

    nextPage = response.data.next_page;
  } while (nextPage);

  return resultArray;
};
