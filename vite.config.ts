import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Matches the main site's convention: the build output is committed and
    // GitHub Pages (or the Pages Actions artifact) serves it from ./docs.
    outDir: 'docs',
    emptyOutDir: true,
  },
  // Project site, served from https://leoncheng.dev/agent-skills/ — the user
  // site (leoncheng57.github.io) owns the apex domain, this repo is a subpath.
  base: '/agent-skills/',
})
