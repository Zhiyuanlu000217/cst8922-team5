# ---- Build Stage ----
FROM --platform=linux/amd64 node:18-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Install dependencies first for better caching
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy application code
COPY app.js ./
COPY public ./public

# ---- Production Stage ----
FROM --platform=linux/amd64 node:18-alpine
WORKDIR /usr/src/app

# Copy dependencies from build stage
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/app.js ./
COPY --from=build /usr/src/app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
