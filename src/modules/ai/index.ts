// Componentes de IA
export { AiChatButton } from './components/ai-chat-button';
export {
  CategorySuggestButton,
  categoryLabels,
} from './components/category-suggest-button';

// Hooks
export { useCategorySuggestion } from './hooks/use-category-suggestion';
export type { CategorySuggestionResult } from './hooks/use-category-suggestion';

// GraphQL
export { SuggestCategoryQuery, ChatMutation } from './graphql/ai-queries';
