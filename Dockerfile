# Stage 1: Build React frontend
FROM node:18 as build-stage

WORKDIR /app

COPY client/package*.json ./client/

RUN cd client && npm install

COPY client/ ./client/

# Build the React app
RUN cd client && npm run build

# Stage 2: Set up the server environment
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --from=build-stage /app/client/build ./client/build

COPY . .

# Set environment variable
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "dev"]
