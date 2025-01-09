import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "node:path"
import dts from "vite-plugin-dts"
import {fileURLToPath} from "node:url";
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
            include: ['packages/**/*.d.ts', 'packages/**/*.vue', 'packages/**/*.ts'],
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./packages', import.meta.url)),
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
            entry: path.resolve(__dirname, './packages/index.ts'),
            name: 'sprite-forms',
            fileName: 'sprite-forms'
        }
    },
})
