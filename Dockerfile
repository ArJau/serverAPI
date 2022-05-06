FROM node
WORKDIR /srv
COPY dao/ dao/
COPY package.json connectionDb.js model.js server.js transportRoutes.js .
RUN npm install
CMD ["node", "/server.js"]
