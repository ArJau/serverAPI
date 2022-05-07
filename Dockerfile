FROM node
WORKDIR /srv
COPY dao/ dao/
RUN MKDIR /log
COPY package.json connectionDb.js model.js server.js transportRoutes.js ./
RUN npm install
CMD ["node", "server.js"]
