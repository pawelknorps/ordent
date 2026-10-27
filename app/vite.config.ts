import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import seo from './seo-plugin.ts'
import { SITE_URL } from './src/data/site.ts'

// https://vite.dev/config/
export default defineConfig({
  // The deploy path comes from SITE_URL, so the domain is configured in one place only.
  base: new URL(SITE_URL).pathname,
  plugins: [react(), seo()],
})
