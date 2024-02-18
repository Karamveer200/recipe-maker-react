require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const env = process.env.NODE_ENV;
console.log(`Node environment set to - ${env}`);

module.exports = Object.freeze({
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD_KEY,
  database: process.env.DATABASE,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
});
