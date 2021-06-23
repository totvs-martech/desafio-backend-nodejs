FROM keymetrics/pm2:10-alpine

COPY . .

RUN npm install
RUN npm run build

WORKDIR dist/
EXPOSE 3001

CMD node index.js