require("dotenv").config();

const Pool = require("pg").Pool;

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: "Mi.51205231",
	port: process.env.DB_PORT,
});

module.exports = pool;
