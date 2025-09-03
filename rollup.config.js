import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  /^lit/,
];

export default [
  // ES Modules build
  {
    input: 'packages/components/src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'es',
      sourcemap: true,
    },
    external,
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: false,
      }),
    ],
  },
  
  // CommonJS build
  {
    input: 'packages/components/src/index.ts',
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
    },
    external,
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: false,
      }),
    ],
  },
  
  // Type definitions
  {
    input: 'packages/components/src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    external,
    plugins: [dts()],
  },
];