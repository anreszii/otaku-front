import axios from "axios";

export const searchAnimeWithEpisodes = async (title: string) => {
  const PUBLIC_KEY: string = process.env.EXPO_PUBLIC_KODIK_PUBLIC_KEY || "";

  try {
    const response = await axios.get(
      `https://kodikapi.com/search?token=${PUBLIC_KEY}&title=${title}&with_material_data=true&sort=shikimori_rating&types=anime,anime-serial&with_episodes_data=true&full_match=true`
    );

    const res = findAnimeWithMostEpisodes(response.data);

    return res;
  } catch (error) {
    throw error;
  }
};

const findAnimeWithMostEpisodes = (data: any) => {
  if (
    !data ||
    !data.results ||
    !Array.isArray(data.results) ||
    data.results.length === 0
  ) {
    throw new Error("No valid anime data found");
  }

  let animeWithMostEpisodes: any = null;
  const episodes_aired =
    data.results[0].material_data.anime_status !== "ongoing"
      ? data.results[0].material_data.episodes_total
      : data.results[0].material_data.episodes_aired;

  data.results.forEach((anime: any) => {
    const seasons = anime?.seasons;

    if (seasons && Object.keys(seasons).length > 0) {
      const firstSeason = Object.values<any>(seasons)[0];
      const episodes = firstSeason?.episodes;

      if (episodes) {
        const episodesCount = Object.values<any>(episodes).length;

        if (episodesCount === episodes_aired) {
          animeWithMostEpisodes = anime;
        }
      }
    }
  });

  console.log(animeWithMostEpisodes);

  return animeWithMostEpisodes;
};
