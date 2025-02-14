import mysql from 'mysql2/promise';

// Configuração para o banco de dados MySQL
const db = mysql.createPool({
  host: '127.0.0.1', // Endereço do servidor MySQL
  user: 'u181504957_depsModels',      // Usuário do MySQL
  password: 'M18,E25@deps',      // Senha do MySQL
  database: 'stockDeps', // Nome do banco de dados
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;

