import mysql from 'mysql2/promise';

// Configuração para o banco de dados MySQL
const db = mysql.createPool({
  host: 'srv1435.hstgr.io', // Nome do host fornecido pela Hostinger
  user: 'u181504957_depsModels', // Seu usuário MySQL
  password: 'M18,E25@deps', // Sua senha MySQL
  database: 'u181504957_stockDeps', // Nome do banco de dados
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;