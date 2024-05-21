# Nedenfor dannes et Node Docker-image baseret på en letvægtsversion af Node.
FROM node:18-alpine

# Nedenfor angives "/app" mappen, som applikationen kører indeni.
WORKDIR /app
 
# Nedenfor peges der på "package.json" filen, som kopieres for at angive applikationens afhænigheder.
COPY package.json ./
# Nedenfor kopieres "package-lock.json" filen for at sikre, at de præcise versioner af afhængighederne installeres.
COPY package-lock.json ./

# Nedenfor køres "npm i" for at hente alle afhængighederne i den virtuelle docker container.
RUN npm install
 
# Nedenfor kopieres alle applikationens filer for, at kunne starte en identisk virtuel applikation i en container.
COPY . .
 
# Nedenfor defineres hvilke kommandoer, som skal køres inde i containeren for at starte applikationen i udviklingsmode.
CMD ["npm", "run", "dev"]