import axios from "axios";

export const getAllVoiceAnime = async (title: string) => {
  const PUBLIC_KEY: any = process.env.EXPO_PUBLIC_KODIK_PUBLIC_KEY;

  const data = await axios.get(
    `https://kodikapi.com/search?token=${PUBLIC_KEY}&title=${title}&full_match=true&types=anime,anime-serial`
  );

  const result = data.data.results.map((item: any) => item.translation.title);

  return result;
};
