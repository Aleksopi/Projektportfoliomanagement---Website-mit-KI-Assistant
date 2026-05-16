# Wird in Schritt 2.2 ausgefüllt
FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "src/index.js"]
