# Financial Tracker Web

Next.js frontend for Financial Tracker.

## Stack

- Next.js 15 App Router and React 18.
- Apollo Client with GraphQL Code Generator.
- Tailwind CSS and shadcn/Radix UI components.
- Recharts for financial charts.
- Zustand for simulation state.
- HTTP-only auth cookies verified with `jose`.

## Setup

```bash
yarn install
cp .env.example .env
yarn codegen
yarn dev
```

The dev server defaults to `http://localhost:3000`.

## Common Commands

```bash
yarn dev
yarn build
yarn codegen
yarn prettier
```

## Important Files

- `src/app` - routes and layouts.
- `src/modules` - feature modules.
- `src/components/ui` - shared shadcn/Radix primitives.
- `src/lib/apollo.ts` - Apollo client, auth header, subscriptions split.
- `src/middleware.ts` - protected-route redirects.
- `graphql-codegen.ts` - frontend GraphQL generation config.
- `src/graphql` - generated GraphQL artifacts.

Do not hand-edit generated GraphQL files. See [repository docs](../docs/README.md) and [design system](../DESIGN.md) before changing UI.
