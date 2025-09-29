FROM node:22-alpine
WORKDIR /app

# Install the application dependencies
COPY ./books-by-isbn.db ./

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm ci --omit dev

# Copy in the source code
COPY ./build ./build
COPY ./DATABASE.db ./

EXPOSE 4173

# Setup an app user so the container doesn't run as the root user
ENV ORIGIN=http://localhost:4173
ENV HOST=0.0.0.0
ENV PORT=4173
ENV NODE_ENV=production
CMD ["node", "build"]