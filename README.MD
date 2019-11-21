# Backend
This project is backend by Eduardo.\
Follow the steps.\
** Install nodeJS before start. **\
** Open terminal and enter on project folder **

## First Step - Install
Install dependencies `npm install` or `yarn install`

## Second Step - Copy
Copy `.env` using `cp .env.example .env`\
Add PORT to run the project (preference for 3000).\
On variable `PORT` you can use `3000`\
On variable `DATA_PATH` you can use `../`\
On variable `NODE_ENV` use `development`, if you testing.\
On variable `API_KEY_PAGARME` use your api_key getting on website.\
On variable `REDIS_PORT` by pattern are `6379`, but you can alter.\
On variable `REDIS_HOST` by pattern are `127.0.0.1`, but you can alter.\

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
If you are on FINAL STEP your project is running. So, to create product and list you can do this without needing login. To agreggate products in your cart you need login on backend to (this is like a cookie in your browse), this are use on REDIS because the products in your cart is temporary and the JWT to.\
OBS: Always to access any endpoints is necessary in header `Authorization: Bearer ${YOUR_TOKEN_LOGIN}`\
1) Register:\
Use `/user` with method `POST`.\
Required: Name, email and password.\

2) Login:\
Use `/user/login` with method `POST`.\
Required: email and password.\
OBS: Returned on response the key `token` you'll use on `header`.\

3) Create Product:\
On Header you are add `Authorization` with value `token` returned on second step\
Use `/product` with method `POST`.\
Required: name, value and factor.\

4) Get all Products:\
On Header you are add `Authorization` with value `token` returned on second step\
Use `/product` with method `GET`.\

OBS: Cart key is generate by your cookie. For default is the website generate this token, but if you prefer you can add the key `cookie` on your `header`.\

5) List cart:\
Use `/cart` with method `GET`.\

6) Add Product on cart:\
Use `/product/:id/add-cart` with method `POST`.\

7) Remove Product on cart:\
Use `/product/:id/remove-cart` with method `POST`.\

7) Checkout on cart:\
On Header you are add `Authorization` with value `token` returned on second step\
Use `/cart/checkout` with method `POST`.\