-- Cria a tabela "games"
CREATE TABLE games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- Insere jogos na tabela "games"
INSERT INTO games (title, year, price)
VALUES ('GTA 5', 2015, 59.99),
       ('Terraria', 2015, 66.80),
       ('Kakele', 2020, 0),
       ('The Last of Us - pt2', 2021, 199.99);
