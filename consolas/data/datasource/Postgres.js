const { Client } = require("pg");

const sql = new Client({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "root",
});


sql.connect();

module.exports = sql;