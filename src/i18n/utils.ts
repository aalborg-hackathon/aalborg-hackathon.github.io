import { ui, defaultLang } from "./ui";
import { getLocaleByPath } from "astro:i18n";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  return getLocaleByPath(lang) as keyof typeof ui;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
