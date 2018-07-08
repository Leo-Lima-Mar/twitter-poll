# Twitter Poll

## Instalação (produção)
1. Realizar o download do projeto completo.
2. Acessar o diretório "server".
3. No arquivo `config.ts`, utilizar o valor `http://localhost:8080` em **accessControlAllowOrigin**
4. Ainda em `config.ts`: para quem deseja utilizar o projeto, preencher os dados da autenticação do Twitter via Oauth.
5. Já para os avaliadores o arquivo com esses dados foi enviado no e-mail, basta usá-lo no lugar do arquivo commitado.
6. Abrir o terminal, executar o comando `npm install` e aguardar a instalação de todas as dependências do servidor.
7. Ainda no terminal, executar o comando `npm start` para iniciar o servidor.
8. Acessar o diretório "client".
9. Abrir o terminal, executar o comando `npm install` e aguardar a instalação de todas as dependências do cliente.
10. Ainda no terminal, executar o comando `npm run build` e aguardar a geração da versão da aplicação para produção.
11. Ainda no terminal, executar o comando `npm start` para iniciar o cliente.
12. Abrir o browser no endereço `http://localhost:8080`.


## Instalação (desenvolvimento)
1. Realizar o download do projeto completo.
2. Acessar o diretório "server".
3. No arquivo `config.ts`, utilizar o valor `http://localhost:4200` em **accessControlAllowOrigin**
4. Ainda em `config.ts`: preencher os dados da autenticação do Twitter via Oauth.
5. Abrir o terminal, executar o comando `npm install` e aguardar a instalação de todas as dependências do servidor.
6. Ainda no terminal, executar o comando `npm run start:dev` para iniciar o servidor.
7. Acessar o diretório "client".
8. Abrir o terminal, executar o comando `npm install` e aguardar a instalação de todas as dependências do cliente.
9.  Ainda no terminal, executar o comando `npm run start:dev` para iniciar o cliente.
10. Abrir o browser no endereço `http://localhost:4200`.

## Uso
- Apenas uma enquete fica disponível por vez.
- Cada enquete possui um nome identificador, uma hashtag e opções.
    - A hashtag utilizada é a que marca o tweet como participante da pesquisa.
    - Cada opção tem um nome identificador e uma hashtag. Essa hashtag deve ser usada em conjunto com a hashtag da enquete para que o voto seja corretamente computado.
- Ao finalizar uma enquete, seus dados são perdidos.
- Ao cadastrar uma nova enquete, os dados da enquete anterior são perdidos.

## Exemplos de Tweets computados
- "Quero shampoo de maçã! #MaisShampooSedoso #maça"
- "Pera é o melhor! #MaisShampooSedoso Eu sei que é! #pera"
- "Cabelos Lisos! #maisShampooSedoso #cabelosLisos #shampoo"
- "#maisshampoosedoso #rosas"

## Testando o funcionamento
- Enquete:
    - Nome: "World Cup"
    - Hashtag: "WorldCup"
    - Opções: 
        - Nome: France, Hashtag: france
        - Nome: Belgium, Hashtag: belgium
        - Nome: England, Hashtag: england
        - Nome: Croatia, Hashtag: croatia