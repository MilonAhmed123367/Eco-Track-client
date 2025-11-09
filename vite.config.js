import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { RiTailwindCssFill } from 'react-icons/ri'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), RiTailwindCssFill()],
})
