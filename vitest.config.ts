import { defineConfig, configDefaults  } from 'vitest/config'
import react from '@vitejs/plugin-react'
 
export default defineConfig({
  plugins: [react()],
  test: {
    //exclude: [...configDefaults.exclude],
    environment: 'jsdom',
    coverage: {
      include: ['src/**/*'],
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        lines: 60,
      }
    }
  },
})