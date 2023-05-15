This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

clone and install npm packages

```bash
npm install
# or
yarn install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/features](http://localhost:3000/api/features).
There are 3 endpoints:

- get all features: GET http://localhost:3000/api/features
- add a feature: POST http://localhost:3000/api/features with title and description in body.
- vote/unvote a feature: PUT http://localhost:3000/api/features/[featureId]/vote with body.action "upvote" or "remove".
