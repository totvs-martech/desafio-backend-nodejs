# Backend
This project is backend by Eduardo.\
Follow the steps.\
** Install nodeJS before start. **\
** Open terminal and enter on project folder **

## First Step - Install
Install dependencies `npm install` or `yarn install`

## Secound Step - Copy
Copy `.env` using `cp .env.example .env`\
Add PORT to run the project (preference for 3000).\
On variable `PORT` you can use `3000`\
On variable `DATA_PATH` you can use `../`\
On variable `NODE_ENV` use `development`, if you testing.\
On variable `API_KEY_PAGARME` use your api_key getting on website.

## Third Step - Docker
Run docker compose for use PostgreSQL and Sequelize.\
Run the command `docker-compose up`

## Fourth Step - Database
When docker is up, generate database and tables.\
Run the command `npx sequelize-cli db:migrate`.

## Fifth Step - Start/Test
First copy the file `config` with command `npm run config`.\
To start Application run the command `npm start` or `npm run dev` if you are a dev.

## Final Step - Check all is ok
To check all is ok, you can use url `http://localhost:${PORT}/healthcheck`\
Can be return 'All is ok.'

## TDD
[V] CONTROLLER\
[X] REPOSITORY\
[X] ROUTES\
[X] CONNECTION TO DB\
If you need test the functions run the command `npm run test`.\
We are using [jest](https://jestjs.io)

## Use project
If you are on FINAL STEP your project is running. So, to create product and list you can do this without needing a hash. But if you agreggate products in your cart you need generate a hash (this is like a cookie in your browse), this is generate to use REDIS because the products in your cart is temporary.\
You should be the endpoint `/hash` with the method `POST`.\
To generate should be like this `http://localhost:${PORT}/hash`.