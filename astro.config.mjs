import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import icon from "astro-icon"

// https://astro.build/config
export default defineConfig({
  site: "https://aalborg-hackathon.github.io",
  i18n: {
    defaultLocale: "da",
    locales: ["en", "da"],
    routing: {
      prefixDefaultLocale: true
    }
  },
  integrations: [tailwind(), icon()]
});