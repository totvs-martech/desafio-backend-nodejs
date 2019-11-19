# Backend
This project is backend by Eduardo

## Install
Install dependencies
`npm install`

## Copy
`cp .env.example .env`
Copy `.env` and add PORT to run de project (preference for 3000). Add to `.env` for connection with DOCKER.\
On variable `DATA_PATH` you can use `../`\
On variable `PORT` you can use `3000`\
On variable `NODE_ENV` use iqual `development`, if you testing.\

## Database
Generate tables. Run the command `npx sequelize-cli db:migrate`.

## Docker
Run docker compose for use PostgreSQL and Sequelize.\
`docker-compose up`

## Start/Test
First copy the file `config` with command `npm run config`\
To start Application run the command `npm start` of `npm run dev` if you are a dev.

## Check all is ok
To check all is ok, you can use url `http://localhost:{YOUR_PORT}/healthcheck`\
Can be return 'All is ok.'