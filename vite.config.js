import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true'
    ? `/${(process.env.GITHUB_REPOSITORY || 'aihub/aihub').split('/')[1]}/`
    : '/',
})
