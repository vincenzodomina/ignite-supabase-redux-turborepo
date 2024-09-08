# React-Native Template starter

This repo reworked the famous Ignite React native template into using:
- [Ignite Boilerplate](https://github.com/infinitered/ignite)
- [Supabase Auth](https://supabase.com/)
- [Redux](https://redux.js.org/)
- [Expo](https://expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Turborepo](https://turbo.build/repo/docs)

I added these according to their Recipes and documentation from the used tech, which still was an effort to go through and fix unclear issues.
This is a great way to kickstart a new mobile app that you want to use with re-using code from your existing Web-app that is using these technologies already.

The main advantage with this setup is to reuse the whole store code with slices, api services and typescript interfaces across the react-native mobile app and the react web app. Ideal for when you already have a web app and want to add a mobile app or vice versa.

The recipes and docs i went through:
- [Ignite Cookbook](https://ignitecookbook.com/)
- Add Supabase Auth according to https://ignitecookbook.com/docs/recipes/Authentication
- Add Expo Router according to https://ignitecookbook.com/docs/recipes/ExpoRouter/
- Add Redux according to https://ignitecookbook.com/docs/recipes/Redux
- Add Reactotron according to https://docs.infinite.red/reactotron/plugins/redux/
- Expo support for Turborepo according to https://docs.expo.dev/guides/monorepos/

## Getting Started

This starts the Ignite mobile app through Expo

```
npm install
cd ./apps/mobile
npx expo start
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `mobile`: a [React-Native](https://https://reactnative.dev/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```
