import { defineConfig } from 'vite';


export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'ridge-ui',
            fileName: 'index',
        },
        rollupOptions: {
            external: ['lit'],
            output: {
                globals: {
                    lit: 'lit'
                }
            }
        },
    },
});