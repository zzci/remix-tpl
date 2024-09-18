ARG IMAGES=node:20-alpine3.19
FROM $IMAGES AS node-build

WORKDIR /node

COPY app ./app
COPY public ./public
COPY server ./server
COPY package.json pnpm-lock.yaml tsconfig.json \
     nuxt.config.ts .env drizzle.config.ts ./

RUN npm install -g pnpm && pnpm install && pnpm build

FROM $IMAGES

WORKDIR /app

RUN apk add --no-cache curl bash; npm install pm2 -g

COPY --from=node-build /node/.output /app/

EXPOSE 3000

CMD ["pm2-runtime", "server/index.mjs"]
