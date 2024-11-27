// Importando as dependências
const express = require('express');
const mysql = require('mysql2');

// Criando a aplicação Express
const app = express();
const port = 3000;

// Middleware para manipular dados JSON
app.use(express.json());

// Conectando ao banco de dados MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',        // Usuário padrão do MySQL no XAMPP
  password: '57128989',        // Senha padrão do MySQL no XAMPP (geralmente está em branco)
  database: 'estetica_milagrinho', // Nome do banco de dados que você criou
  port:3306
});

// Testando a conexão
db.connect((err) => {
  if (err) {
    console.error('Erro de conexão ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota para criar um novo contato
app.post('/contato', (req, res) => {
  const { nome, email, mensagem } = req.body;
  const query = 'INSERT INTO contato (nome, email, mensagem) VALUES (?, ?, ?)';

  db.query(query, [nome, email, mensagem], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, nome, email, mensagem });
  });
});

// Rota para obter todos os contatos
app.get('/contato', (req, res) => {
  const query = 'SELECT * FROM contato';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

// Rota para obter um usuário por ID
app.get('/contato/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM contato WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }
    res.status(200).json(results[0]);
  });
});

// Rota para atualizar um usuário
app.put('/contato/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, mensagem } = req.body;
  const query = 'UPDATE contato SET nome = ?, email = ?, mensagem = ? WHERE id = ?';

  db.query(query, [nome, email, mensagem, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }
    res.status(200).json({ nome, email, mensagem });
  });
});

// Rota para deletar um usuário
app.delete('/contato/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM contato WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }
    res.status(200).json({ message: 'Contato deletado com sucesso' });
  });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
