FROM node
WORKDIR /srv
COPY dao connectionDb.js model.js server.js transportRoutes.js ./
COPY package.json .
RUN npm install
CMD ["node", "/server.js"]
