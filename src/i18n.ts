// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import Backend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";

// i18n
//   .use(Backend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: "uk",
//     supportedLngs: ["uk", "en"],
//     debug: true,
//     // debug: process.env.NODE_ENV === "development",
//     interpolation: {
//       escapeValue: false,
//     },
//     backend: {
//       loadPath: "/locales/{{lng}}/{{ns}}.json",
//     },
//     detection: {
//       order: [
//         "querystring",
//         "cookie",
//         "localStorage",
//         "sessionStorage",
//         "navigator",
//         "htmlTag",
//       ],
//       caches: ["localStorage", "cookie"],
//     },
//     react: {
//       useSuspense: false,
//     },
//   });

// export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    supportedLngs: ["en", "uk"], // Add all supported languages here
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
