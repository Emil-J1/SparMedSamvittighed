FROM node:18-alpine
 
WORKDIR /app
 
COPY package.json ./
COPY package-lock.json ./
 
RUN npm install
 
COPY . .
 
# Define a start script to run the watcher
CMD ["npm", "run"]