import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  require: ['dotenv'],
  documents: ['src/**/*.ts'],
  generates: {
    './src/graphql/': {
      preset: 'client',
      config: {
        avoidOptionals: {
          field: true,
        },
      },
      presetConfig: {
        fragmentMasking: false,
      },
    },
    './src/graphql/introspection.ts': {
      plugins: ['fragment-matcher'],
      config: {
        module: 'es2017',
      },
    },
  },
  ignoreNoDocuments: true,
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;
