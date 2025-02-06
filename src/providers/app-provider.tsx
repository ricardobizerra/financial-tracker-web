import { composeProviders } from '@/lib/react-utils';
import { ZodTranslationProvider } from './zod-translation-provider';
import { ThemeProvider } from './theme-provider';
import { AuthProvider } from './auth-provider';
import { GraphqlApolloProvider } from './apollo-provider';

export const AppProvider = composeProviders([
  ZodTranslationProvider,
  ThemeProvider,
  GraphqlApolloProvider,
  AuthProvider,
]);
