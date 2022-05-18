const db = process.env.CONFIG_MYSQL_DATABASE || "cookbookdb";
const host = process.env.CONFIG_MYSQL_HOST || "127.0.0.1";
const password = process.env.CONFIG_MYSQL_PASSWORD || "secret";
const user = process.env.CONFIG_MYSQL_USER || "root";
const mysqlPort = process.env.CONFIG_MYSQL_PORT || "13306";
const mysql = require("mysql");

const con = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: db,
  connectionLimit: 100,
  port: mysqlPort,
});

module.exports = con;
