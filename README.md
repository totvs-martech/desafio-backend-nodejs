# Desafio Backend Developer
A Totvs está criando um aplicativo de e-commerce, foi feita uma planning com o Time o qual você é integrante e a Sprint começou. Suas tarefas são as seguintes: 

##### Criação de Produtos na loja ###
Criar os endpoints para adicionar e listar os produtos da loja. Esse produto deve ter os seguintes atributos: Nome, Descrição, Imagem, Valor e Fator. Existem três fatores A, B e C.  

##### Criação do Carrinho de Compras ###
Criar endpoints para adicionar, consultar e remover os produtos do carrinho de compras. A consulta dos produtos deve conter além da lista, a quantidade e valor total dos produtos adicionados seguindo a seguinte regra de fator

 - Os produtos de fator A tem um desconto progressivo de 1% a cada item adicionado no carrinho limitado a 5% de desconto. 
 - Os produtos de fator B tem um desconto progressivo de 5% a cada item adicionado no carrinho limitado a 15% de desconto.
 - Os produtos de fator C tem um desconto progressivo de 10% a cada item adicionado no carrinho limitado a 30% de desconto.
 - Um detalhe importante, o total de desconto do carrinho de compras não pode superar 30%.

##### Checkout pagar.me ###
Para finalizar, crie um endpoint para fazer o checkout do carrinho de compras através do pagar.me

#### Requisitos:
 - Utilizar Node JS.
 - Gestão de dependências via gerenciador de pacotes.
 - Persistir os dados.
 - Descreva no README os passos para execução do seu projeto.
 - Deixe seu repositório público para analise do Pull Request.

#### Ganha mais pontos:
 - Criação testes unitários
 - Garantia da segurança dos dados
 - Criação de uma estrutura de deploy da aplicação
 - Garantia a escalabilidade da aplicação (Pessoas | Infraestrutura)
 - Fique a vontade para adicionar mais features na loja desde que esteja dentro do contexto.

#### Submissão
 - Criar um fork desse projeto e entregar via Pull Request

#### Prazo de Entrega
 - 4 Dias

#### Dados de acesso a api do pagar.me
 - Documentação: https://docs.pagar.me/reference
 - Endpoint para o Checkout: https://api.pagar.me/1/transactions
 - ApiKey: ak_test_Fdo1KyqBTdnTFeLgBhkgRcgm9hwdzd
###Json de Envio:
```js
{
    "amount": 21000,
    "card_number": "4111111111111111",
    "card_cvv": "123",
    "card_expiration_date": "0922",
    "card_holder_name": "João das Neves",
    "customer": {
      "external_id": "#3311",
      "name": "João das Neves Braulio",
      "type": "individual",
      "country": "br",
      "email": "joaodasneves@got.com",
      "documents": [
        {
          "type": "cpf",
          "number": "00000000000"
        }
      ],
      "phone_numbers": ["+5511999998888", "+5511888889999"],
      "birthday": "1965-01-01"
    },
    "billing": {
      "name": "João das Neves",
      "address": {
        "country": "br",
        "state": "sp",
        "city": "Cotia",
        "neighborhood": "Rio Cotia",
        "street": "Rua Matrix",
        "street_number": "9999",
        "zipcode": "06714360"
      }
    },
    "shipping": {
      "name": "Neo Reeves",
      "fee": 1000,
      "delivery_date": "2000-12-21",
      "expedited": true,
      "address": {
        "country": "br",
        "state": "sp",
        "city": "Cotia",
        "neighborhood": "Rio Cotia",
        "street": "Rua Matrix",
        "street_number": "9999",
        "zipcode": "06714360"
      }
    },
    "items": [
   ITEMS_DO_SEU_CARRINHO
    ]
}
```
# Boa Sorte!