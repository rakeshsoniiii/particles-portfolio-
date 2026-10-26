FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY server.mjs ./
COPY scripts/ ./scripts/
COPY public/ ./public/

RUN node scripts/build.mjs

EXPOSE 3000

CMD ["node", "server.mjs", "dist"]
