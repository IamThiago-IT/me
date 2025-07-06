const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

// Caminho absoluto para o diretório do banco
const dbDir = path.resolve(__dirname, '../src/database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}
const dbPath = path.join(dbDir, 'sqlite.db');
const db = new Database(dbPath);

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

console.log('Banco e tabela de usuários criados com sucesso!');
db.close();