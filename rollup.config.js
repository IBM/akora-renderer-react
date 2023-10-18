/**
 * © Copyright IBM Corp. 2021, 2023
 * SPDX-License-Identifier: Apache-2.0
 */

import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';

import packageJson from './package.json';

const plugins = [
  eslint({
    exclude: ['node_modules/**', '**/*.html']
  }),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled'
  }),
  resolve({
    extensions: ['.js', '.jsx']
  }),
  commonjs()
];

export default [
  {
    input: 'lib/index.js',
    external: id => {
      return packageJson.peerDependencies[id] ||
        Object.keys(packageJson.peerDependencies).some(dep => {
          return id.startsWith(dep + '/');
        });
    },
    output: [
      {
        file: packageJson.module,
        format: 'es',
        sourcemap: true,
        exports: 'default'
      },
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'default'
      }
    ],
    plugins,
    watch: {
      clearScreen: false
    }
  },
  {
    input: 'lib/index.js',
    output: [
      {
        file: packageJson.browser,
        format: 'umd',
        name: 'AkoraReactRenderer',
        sourcemap: true,
        exports: 'default'
      }
    ],
    plugins
  }
];
