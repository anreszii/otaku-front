export interface KodikDataProps {
  id: string;
  type: string;
  link: string;
  title: string;
  title_orig?: string;
  other_title?: string;
  translation: {
    id: number;
    title: string;
    type: string;
  };
  year: number;
  kinopoisk_id?: string;
  imdb_id?: string;
  worldart_link?: string;
  shikimori_id: string;
  quality: string;
  camrip: boolean;
  lgbt: boolean;
  blocked_countries: any[];
  created_at: string;
  updated_at: string;
  seasons?: {
    [key: string]: {
      link: string;
      episodes: {
        [key: string]: {
          link: string;
          screenshots: string;
        };
      };
    };
  };
  material_data: {
    title: string;
    anime_title: string;
    title_en: string;
    other_titles: string[];
    other_titles_en: string[];
    other_titles_jp: string[];
    anime_kind: string;
    all_status: string;
    anime_status: string;
    year: number;
    poster_url: string;
    screenshots: string[];
    duration: number;
    countries: string[];
    all_genres: string[];
    genres: string[];
    anime_genres: string[];
    anime_studios: string[];
    imdb_rating?: number;
    imdb_votes?: number;
    shikimori_rating: number;
    shikimori_votes: number;
    premiere_world: string;
    aired_at: string;
    rating_mpaa: string;
    episodes_total: string;
    episodes_aired: string;
    directors: string[];
    writers: string[];
    composers: string[];
  };
  screenshots: string[];
}
