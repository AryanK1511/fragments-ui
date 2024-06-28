# https://github.com/vercel/next.js/blob/canary/examples/with-docker-multi-env/docker/production/Dockerfile
FROM node:20.11.0-alpine3.19@sha256:2f46fd49c767554c089a5eb219115313b72748d8f62f5eccb58ef52bc36db4ad AS base

# ==================== Stage 0: Install dependencies only when needed ====================

FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Setting the working directory
WORKDIR /app

# Install all production dependencies
# RUN sh -c 'printenv > .env.production'
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# ==================== Stage 1: Rebuild the source code only when needed ====================

FROM base AS builder

# Setting the working directory
WORKDIR /app

# Copy over files from the previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env.production ./.env.production

# Building the application
RUN npm run build

# ==================== Stage 2: Production image, copy all the files and run next ====================

FROM base AS runner

# Setting the work directory
WORKDIR /app

# Setting the NODE_ENV to production to apply some node-specific optimizations
ENV NODE_ENV=production

# Create a new group named 'nodejs' with a group ID (GID) of 1001
# The '-g 1001' option specifies the GID
# The '-S' option creates a system group, which is a group that does not have a home directory and is used for system tasks
RUN addgroup -g 1001 -S nodejs

# Create a new user named 'nextjs' with a user ID (UID) of 1001 and add it to the 'nodejs' group
# The '-S' option creates a system user
# The '-u 1001' option specifies the UID
RUN adduser -S nextjs -u 1001

# Copy the 'public' directory from the 'builder' stage to the current directory's 'public' directory
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env.production ./.env.production

# # Automatically leverage output traces to reduce image size
# # This helps in optimizing the Docker image by only copying necessary files
# # Copy the standalone server files from the 'builder' stage to the current directory
# # Change ownership of these files to 'nextjs' user and 'nodejs' group
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# # Copy the static files from the 'builder' stage to the '.next/static' directory in the current directory
# # Change ownership of these files to 'nextjs' user and 'nodejs' group
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the 'nextjs' user to run the subsequent commands for better security
USER nextjs

# Expose port 3000 to the host machine to allow access to the application
EXPOSE 3000

# Set an environment variable 'PORT' with a value of 3000
ENV PORT 3000

# Running the server
CMD node server.js
