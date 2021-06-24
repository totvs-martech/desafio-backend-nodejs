# execultando criação da imagem docker
docker build -t desafio:1 .
# Subindo API docker
comando: docker run -p 3001:3001 -d desafio:1 
# Subindo API SEM docker
npm install
npm run dev


# endpoints
# criando produto
POST: localhost:3001/product

payload ===> {
    "name": "Product B",
    "description": "aqui em a descricao",
    "urlImage": "http://url",
    "price": 300,
    "fator": 5
}
# listando all produtos
GET: localhost:3001/product

# criando customer
POST: 

payload ===> {
    "phone_numbers": [
        "+556198112595",
        "556198112592"
    ],
    "external_id": "XXA1234",
    "name": "Thales Andrade",
    "type": "",
    "country": "Brasil",
    "birthday": "2021-06-23T17:42:07.523Z",
    "address": [
        {
            "country": "br",
            "state": "sp",
            "city": "Cotia",
            "neighborhood": "Rio Cotia",
            "street": "Rua Matrix",
            "street_number": "9999",
            "zipcode": "06714360"
        }
    ],
    "documents": [
        {
            "type": "cpf",
            "number": "00000000000"
        }
    ],
    "card": [
        {
            "amount": "21000",
            "card_number": "4111111111111111",
            "card_cvv": 123,
            "card_expiration_date": "0922",
            "card_holder_name": "João das Neves"
        }
    ]
}
# criando o carrinho de compras
POST localhost:3001/shoppingcard
payload ==> 

{
    "products":[],
    "customer": "60d467aff66abf06cd6c0979"
}
# add produto mo carrinho de compras
PUT localhost:3001/shoppingcard/60d467faf66abf06cd6c097e

payload ==> 

{
    "products": ["60d46784f66abf06cd6c0973"]
}

# removendo produto mo carrinho de compras
DELETE localhost:3001/shoppingcard/60d467faf66abf06cd6c097e
{
    "product": "60d46784f66abf06cd6c0973"
}

# REALIZANDO O PAGAMENTO 
POST localhost:3001/shoppingcard/payment/60d467faf66abf06cd6c097e