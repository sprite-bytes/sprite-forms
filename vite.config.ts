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
            include: ['packages/**/*.d.ts', 'packages/**/*.vue', 'packages/**/*.ts'],
        })
    ],
    resolve: {},
    build: {
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
        lib: {
            entry: path.resolve(__dirname, './packages/index.ts'),
            name: 'SpriteForms',
            fileName: (format) => `sprite-forms.${format}.js`
        }
    },
})
