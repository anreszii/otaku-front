export const cleanTitle = (title: string) => {
  return title
    .replace(
      /\[(ТВ|TB)[-\s]?(\d+)?(?:,\s*[чЧ]асть\s*(\d+))?\]/g,
      (match, _, season, part) => {
        if (season && part) {
          return `${season}, часть ${part}`;
        } else if (season) {
          return `${season}`;
        } else if (part) {
          return `часть ${part}`;
        }
        return "";
      }
    )
    .trim();
};
