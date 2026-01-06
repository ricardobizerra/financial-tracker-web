import { graphql } from '@/graphql';

export const AuthSignInMutation = graphql(`
  mutation AuthSignIn($data: AuthSignInInput!) {
    authSignIn(data: $data) {
      user {
        id
        email
        name
      }
    }
  }
`);

export const AuthSignOutMutation = graphql(`
  mutation AuthSignOut {
    authSignOut
  }
`);

export const CreateUserMutation = graphql(`
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      user {
        id
      }
    }
  }
`);

export const RequestPasswordResetMutation = graphql(`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`);

export const ResetPasswordMutation = graphql(`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`);

