// Wird in Schritt 2.1 ausgefüllt
// PostgreSQL Connection Pool
const { Pool } = require('pg');
module.exports = new Pool({
  host:     process.env.POSTGRES_HOST || 'db',
  database: process.env.POSTGRES_DB,
  user:     process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port:     5432,
});
