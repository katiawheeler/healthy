// /* eslint-disable import/no-anonymous-default-export */
// import resolve from '@rollup/plugin-node-resolve'
// import {babel} from '@rollup/plugin-babel'
// import commonjs from '@rollup/plugin-commonjs'

// const extensions = ['.js', '.jsx', '.ts', '.tsx']

// const config = {
//   input: './src/index.ts',

//   // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
//   // https://rollupjs.org/guide/en#external-e-external
//   external: ['@emotion/core', '@emotion/styled', 'react'],

//   plugins: [
//     // Allows node_modules resolution
//     resolve({extensions}),

//     // Allow bundling cjs modules. Rollup doesn't understand cjs
//     commonjs(),

//     // Transform files
//     babel({
//       extensions,
//       include: ['src/**/*'],
//       exclude: ['src/setupTests.js', 'src/tests/**/*'],
//       babelHelpers: 'bundled',
//     }),
//   ],

//   output: {dir: 'dist', format: 'cjs'},
// }

// export default config

import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const formats = ['esm', 'umd']

const plugins = [
  babel({extensions, exclude: 'node_modules/**', babelHelpers: 'inline'}),
  resolve({extensions}),
  commonjs(),
]

export default [
  {
    input: 'src/index.ts',
    external: ['react', 'react-dom'],
    plugins,
    output: formats.map(format => ({
      file: `dist/browser.${format}.js`,
      format,
      sourcemap: true,
      name: 'react-healthy',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    })),
  },
]
