import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  // ...vite configures
  server: {
    // vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)
    port: 3000,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './index.js',
      tsCompiler: 'esbuild',
      swcOptions: {},
    }),
  ],
});
