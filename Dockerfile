FROM node:17.4-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN apk add --no-cache alpine-sdk libc6-compat python3
RUN yarn install --immutable

FROM deps AS builder
WORKDIR /app
COPY . .
RUN yarn build

FROM node:17.4-alpine
WORKDIR /app
ENV NODE_ENV production
RUN adduser -u 1001 -S next

COPY --from=deps /app .
COPY --from=builder /app/next.config.js .
COPY --from=builder /app/public public
COPY --from=builder --chown=next:node /app/.next .next

USER next
EXPOSE 3000

CMD ["yarn", "start"]
