import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import ts from 'typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/esm',
      entryFileNames: 'index.js',
      format: 'esm',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src'
    }
  ],
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  plugins: [
    postcss({ extract: false, minimize: true }),
    typescript({ typescript: ts, tsconfig: './tsconfig.json', useTsconfigDeclarationDir: true })
  ]
};
