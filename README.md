# Desafio Backend Developer - TOTVS
## 1) verificar o Node está instalado
## 2) Baixar o repositório e instalar dpendencias com npm install
## 3) Verificar se o Docker está instalado e rodando
## 4) Configurar o docker-compose.yml levando em consideração os parâmetros
  db:
    image: `imagem do posgres no docker`
    ports:
    - "5432:5432"
    environment:
      POSTGRES_USER: `usuário postgres`
      POSTGRES_PASSWORD: `senha postgres`      
      POSTGRES_DB: `banco postgres` 
  redis:
      image: `imagem redis`
      container_name: `nome do container`
      expose:
        - `porta para o redis`
      ports:
        - "`IP:range`"  
  app:
      build: ./
      volumes:
        - ./:/var/www/app
      links:
        - redis
      ports:
        - 3000:3000
      environment:
        REDIS_URL: `redis image`://`redis conatainer_name`
        NODE_ENV: development
        PORT: 3000
        DATABASE_URL: `URL de conexão postgres`  
        PAGARME_API_KEY : `chave do pagarme`    
      command:
        sh -c 'npm i && npm start'    
## 5)Configurar o Sequelize (config/config.json) será necessário para fazer migração
{
  "development": {
    "username": "usuário postgres",
    "password": "senha postgres",
    "database": "banco postgres",
    "host": "host do postgres",
    "port": 5432,
    "dialect": "postgresql"
  },
  "test": {
    "username": "usuário postgres",
    "password": "senha postgres",
    "database": "banco postgres",
    "host": "host do postgres",
    "port": 5432,
    "dialect": "postgresql"
  },
  "production": {
    "username": "usuário postgres",
    "password": "senha postgres",
    "database": "banco postgres",
    "host": "host do postgres",
    "port": 5432,
    "dialect": "postgresql"
  }
}
## 6) Criar a imagem do Postgres no Docker e rodar a migração 
  `sequelize db:migrate`
## 7) iniciar a aplicação utilizando o docker 
  `docker-compose up` 

rotas disponíveis
get->/api/products
get->/api/products/:id
post->/api/products
   Exemplo de Body JSON: 
       {
        "name": "Terminal Tipo D",
        "description": "Maquinha de transação D",
        "image": "www.site.com.br/mtD.jpg",
        "value": "100",
        "factor": "C"
      }
put->/api/products/:id
   Exemplo de Body JSON: 
       {
        "name": "Terminal Tipo D",
        "description": "Maquinha de transação D",
        "image": "www.site.com.br/mtD.jpg",
        "value": "100",
        "factor": "C"
      }
delete->/api/products/:id
get->/api/cart/:key
post->/api/cart/:key
  Exemplo de Body JSON
    {            
    "id": 5,
    "name":"Maquina transacao D",
    "value": 10,
    "quantity": 5,
    "factor": "D"
    }
post->/api/payment/:key



