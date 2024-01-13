import axios from "axios";

export const searchAnimeWithVoice = async (
  title: string,
  translation_title: string
) => {
  const PUBLIC_KEY: any = process.env.EXPO_PUBLIC_KODIK_PUBLIC_KEY;

  const data = await axios.get(
    `https://kodikapi.com/search?token=${PUBLIC_KEY}&title=${title}&full_match=true&types=anime,anime-serial&with_material_data=true&with_episodes_data=true`
  );

  const result = data.data.results.find(
    (item: any) => item.translation.title === translation_title
  );

  return result;
};
