import { graphql } from '@/graphql';

export const SuggestCategoryQuery = graphql(`
  query SuggestCategory($description: String!) {
    suggestCategory(description: $description) {
      category
      confidence
      reasoning
    }
  }
`);

export const ChatMutation = graphql(`
  mutation Chat($message: String!) {
    chat(message: $message) {
      message
    }
  }
`);
