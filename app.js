// Importa o módulo mysql2
const mysql = require('mysql2');

// Cria uma conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',        // Usuário padrão do MySQL no XAMPP
  password: '57128989',        // Senha padrão do MySQL no XAMPP (geralmente está em branco)
  database: 'estetica_milagrinho', // Nome do banco de dados que você criou
  port:3306
});

// Conecta ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

// Exemplo de uma consulta simples
/*connection.query('SELECT * FROM usuarios', (err, results) => {
  if (err) {
    console.error('Erro ao realizar a consulta:', err);
    return;
  }
  console.log('Resultados da consulta:', results);
});*/

// Fecha a conexão
connection.end();

