import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Everything under test is pure TypeScript (frontmatter parsing, skill
    // derivation, install-command templating), so there is no need for jsdom
    // or a DOM testing library — keeping the environment at `node` keeps the
    // dependency list to what the site itself actually needs.
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
