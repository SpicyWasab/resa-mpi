# Use a Node.js Alpine image for the builder stage
FROM node:22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./src ./src
COPY ./static ./static
COPY ./jsconfig.json .
COPY ./svelte.config.js .
COPY ./vite.config.js .
COPY .env .

ENV SKIP_DB_ACCESS=true

RUN npm run build
RUN npm prune --production

# final stage layer
FROM node:22
WORKDIR /app

# Install the application dependencies
# COPY ./books-by-isbn.db ./
COPY ./package.json ./

# Copy in the source code
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/

# copy in the database
VOLUME /app/databases

EXPOSE 4173

# Setup an app user so the container doesn't run as the root user
USER node
CMD ["node", "build"]