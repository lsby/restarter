import en from "@/locales/en.json"
import zh from "@/locales/zh.json"

import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: window.localStorage.getItem("i18currentLang") || "zh",
    fallbackLng: "zh",
    interpolation: {
      // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      escapeValue: false,
    },
    supportedLngs: ["en", "zh"],
  })
  .catch((err) => {
    console.error("init i18n error", err)
  })

export default i18n
