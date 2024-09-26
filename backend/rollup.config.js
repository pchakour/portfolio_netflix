import typescript from '@rollup/plugin-typescript';
import graphql from '@rollup/plugin-graphql';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.ts',
  watch: true,
  output: {
    dir: 'output',
    format: 'es'
  },
  plugins: [
    json(),
    typescript(),
    graphql()
  ]
};