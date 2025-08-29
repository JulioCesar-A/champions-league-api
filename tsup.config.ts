// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  
  format: 'cjs',

  outDir: 'dist',

  clean: true,

  splitting: false,

  sourcemap: true,

  publicDir: 'data',

  dts: true,

  onSuccess: async () => {
    console.log('➡️  Run: npm run exec:dist to start compiled version');
  },
});