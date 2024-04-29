FROM node:18-alpine
 
WORKDIR /app
 
COPY package.json ./
COPY package-lock.json ./
 
RUN npm install
 
COPY . .
 
# Add chokidar for watching file changes
RUN npm install chokidar-cli -g
 
# Define a start script to run the watcher
CMD ["npm", "run", "dev:watch"]