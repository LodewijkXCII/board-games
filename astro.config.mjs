import { defineConfig } from "astro/config";

import db from "@astrojs/db";
// import netlify from "@astrojs/netlify";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
  server: { host: true },
  integrations: [db()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
