import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://rickandmortyapi.com/graphql',
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client',
      config: {
        enumsAsTypes: true,
        futureProofEnums: true,
        withResultType: true,
        withHooks: true,
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};
export default config;
