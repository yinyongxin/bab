import mantine from 'eslint-config-mantine';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...mantine,
  {
    ignores: [
      '**/*.{mjs,cjs,js,d.ts,d.mts,md}',
      './.storybook/main.ts',
      './node_modules/**',
    ],
  },
  {
    files: ['**/*.story.tsx'],
    rules: { 'no-console': 'off' },
  },
);
