import i18n from "i18next";

import ru from "./translations/ru.json";
import en from "./translations/en.json";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: {
    en,
    ru,
  },
  lng: "ru",

  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
