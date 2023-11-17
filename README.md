# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## API

| No. | Method | URI | Description |
| --- | --- | --- | --- |
| 1 | GET | /api/quizzes | すべてのクイズを取得 |
| 2 | GET | /api/quizzes/{quizId} | 特定のクイズを取得 |
| 3 | POST | /api/quizzes | 新しいクイズを作成 |
| 4 | PUT | /api/quizzes/{quizId} | 特定のクイズを更新 |
| 5 | DELETE | /api/quizzes/{quizId} | 特定のクイズを削除 |
| 6 | GET | /api/users/{userId} | 特定のユーザの情報を取得 |
| 7 | POST | /api/users/ | 新しいユーザを作成 |
| 8 | PUT | /api/users/{userId} | 特定のユーザの情報を更新 |
| 9 | DELETE | /api/users/{userId} | 特定のユーザを削除 |
