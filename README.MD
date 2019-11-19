# Backend
This project is backend by Eduardo

## Install
Install dependencies
`npm install` or `yarn install`

## Copy
Copy `.env` using `cp .env.example .env`\ 
Add PORT to run the project (preference for 3000).\
On variable `PORT` you can use `3000`\
On variable `DATA_PATH` you can use `../`\
On variable `NODE_ENV` use `development`, if you testing.\

## Docker
Run docker compose for use PostgreSQL and Sequelize.\
`docker-compose up`

## Database
When docker is up, generate database and tables.\
Run the command `npx sequelize-cli db:migrate`.

## Start/Test
First copy the file `config` with command `npm run config`\
To start Application run the command `npm start` or `npm run dev` if you are a dev.

## Check all is ok
To check all is ok, you can use url `http://localhost:${PORT}/healthcheck`\
Can be return 'All is ok.'