sed -i -r "s/.*CHANGE_URL.*/        mongoDbUrl= $URL_MONGO_PROD;/g" connectionDb.js