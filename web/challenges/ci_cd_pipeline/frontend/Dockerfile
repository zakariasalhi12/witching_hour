FROM node:20-alpine AS builder

WORKDIR /app

RUN npm i -g @angular/cli
COPY package*.json ./
RUN npm ci
COPY . .

RUN npx ng build --configuration production

FROM node:20-alpine AS final
COPY --from=builder /app/dist/frontend /dist

EXPOSE 4000

CMD ["node", "/dist/server/server.mjs"]