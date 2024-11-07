interface ITranslation {
  id: number;
  title: string;
  type: string;
}

interface IMaterialData {
  title: string;
  anime_title: string;
  title_en: string;
  other_titles_en: string[];
  other_titles_jp: string[];
  anime_kind: string;
  all_status: string;
  anime_status: string;
  poster_url: string;
  anime_poster_url: string;
  shikimori_rating: number;
  shikimori_votes: number;
  aired_at: string;
  rating_mpaa: string;
  minimal_age: number;
  episodes_total: number;
  episodes_aired: number;
  description?: string;
  duration?: number;
  countries?: string[];
  all_genres?: string[];
  genres?: string[];
  anime_genres?: string[];
  anime_studios?: string[];
  imdb_rating?: number;
  imdb_votes?: number;
  premiere_world?: string;
  released_at?: string;
  next_episode_at?: string;
  actors?: string[];
  directors?: string[];
  producers?: string[];
  writers?: string[];
  composers?: string[];
  editors?: string[];
  designers?: string[];
  operators?: string[];
}

interface Episode {
  link: string;
  screenshots: string[];
  number: number;
}

export interface IAnime {
  id: string;
  type: string;
  link: string;
  title: string;
  title_orig: string;
  other_title?: string;
  translation: ITranslation;
  year: number;
  last_season: number;
  last_episode: number;
  episodes_count: number;
  shikimori_id?: string;
  kinopoisk_id?: string;
  imdb_id?: string;
  worldart_link?: string;
  quality: string;
  camrip: boolean;
  lgbt: boolean;
  blocked_countries: string[];
  blocked_seasons: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  seasons: Episode[];
  material_data: IMaterialData;
  screenshots: string[];
}
