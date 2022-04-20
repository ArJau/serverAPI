FROM node
WORKDIR /srv
COPY app.js .
COPY dao connectionDb.js model.js server.js transportRoutes.js my_generic_mongo_client.js .
COPY package.json .
RUN npm install
CMD ["node", "/server.js"]
