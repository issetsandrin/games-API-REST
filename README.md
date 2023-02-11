
# Uma API de games em arquitetura REST 

Este é um código que cria uma API REST usando o Express, body-parser e o módulo mysql do Node.js. A API permite que você crie, leia, atualize e exclua jogos em um banco de dados MySQL.

O código cria crinco rotas:

 - POST "/game" para criar um novo jogo.

 - GET "/games" para recuperar uma lista de todos os jogos.

 - GET "/game/:id" para recuperar um jogo específico pelo ID.

 - PUT "/game/:id" para atualizar um jogo específico pelo ID.

 - DELETE "/game/:id" para excluir um jogo específico pelo ID.

## Observação: Antes de executar a aplicação, é necessário executar o script SQL contido no arquivo banco.sql para criar a estrutura do banco de dados e suas informações.
