import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import robotsTxt from "astro-robots-txt"

export default defineConfig({
  integrations: [tailwind(), react(), robotsTxt()],
  site: "https://muhammad-ahmed-dev.vercel.app/",
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
})
