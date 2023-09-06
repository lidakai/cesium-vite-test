import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import cesium from 'vite-plugin-cesium'; // 引入插件
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cesium()],
})
