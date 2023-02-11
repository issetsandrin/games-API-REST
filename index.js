/*
ATENÇÂO: EXECUTAR O SQL DA APLICAÇÃO banco.sql ANTES DE RODAR A APLICAÇÃO
*/

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "api",
});

connection.connect();

// Endpoint para criar um game em especifico.
app.post("/game", (req, res) => {
  var { title, year, price } = req.body;
  if (title === "") {
    res.sendStatus(400);
  } else {
    if (isNaN(year)) {
      res.sendStatus(400);
    } else {
      if (isNaN(price)) {
        res.sendStatus(400);
      } else {
        connection.query(
          "INSERT INTO games (title, year, price) VALUES (?, ?, ?)",
          [title, year, price],
          function (error, results, fields) {
            if (error) {
              console.error(error);
              res.sendStatus(500);
            } else {
              res.sendStatus(200);
            }
          }
        );
      }
    }
  }
});

// Endpoint para buscar todos o jogos cadastrados
app.get("/games", (req, res) => {
  connection.query("SELECT * FROM games", function (error, results, fields) {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      res.statusCode = 200;
      res.json(results);
    }
  });
});

// Endpoint para buscar e listar um game em especifico.
app.get("/game/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    connection.query(
      "SELECT * FROM games WHERE id = ?",
      [id],
      function (error, results, fields) {
        if (error) {
          console.error(error);
          res.sendStatus(500);
        } else {
          if (results.length > 0) {
            res.json(results[0]);
            res.statusCode = 200;
          } else {
            res.sendStatus(404);
          }
        }
      }
    );
  }
});

// Endpoint para editar um game em especifico.
app.put("/game/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    // Consultando o jogo no banco de dados
    connection.query(
      `SELECT * FROM games WHERE id = ${id}`,
      function (err, results) {
        if (err) throw err;
        // Verificando se o jogo foi encontrado
        if (results.length > 0) {
          var game = results[0];

          var { title, year, price } = req.body;

          // Criando a lista de atualizações para o jogo
          var updates = [];

          // Editando o title com as condições estipuladas;
          if (title != undefined) {
            updates.push(`title = '${title}'`);
          }

          // Editando o year com as condições estipuladas;
          if (year != undefined) {
            updates.push(`year = '${year}'`);
          }

          // Editando o price com as condições estipuladas;
          if (price != undefined) {
            updates.push(`price = '${price}'`);
          }

          // Atualizando o jogo no banco de dados
          connection.query(
            `UPDATE games SET ${updates.join(", ")} WHERE id = ${id}`,
            function (err) {
              if (err) throw err;
              res.sendStatus(200);
            }
          );
        } else {
          res.sendStatus(404);
        }
      }
    );
  }
});

// Endpoint para deletar um game em especifico.
app.delete("/game/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);

    connection.query(
      "DELETE FROM games WHERE id = ?",
      [id],
      function (error, results, fields) {
        if (error) throw error;

        if (results.affectedRows == 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(200);
        }
      }
    );
  }
});

app.listen(8080, () => {
  console.log("Running");
});
