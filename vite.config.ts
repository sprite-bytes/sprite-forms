import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "node:path"
import dts from "vite-plugin-dts"
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue({
            include: [/\.vue$/]
        }),
        dts({
            tsconfigPath: 'tsconfig.app.json',
            insertTypesEntry: true,
            copyDtsFiles: true,
            // 指定需要为哪些文件生成类型定义
            include: ['src/**/*.d.ts', 'src/**/*.vue', 'src/**/*.ts'],
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@packages': path.resolve(__dirname, './src/packages'),
        }
    },
    build: {
        rollupOptions: {
            external: ['vue'],
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue',
                },
            },
        },
        lib: {
            entry: path.resolve(__dirname, './src/packages/index.ts'),
            name: 'sprite-forms',
            fileName: 'sprite-forms'
        }
    },
})
