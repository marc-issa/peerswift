const Pool = require("pg").Pool;

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "peerswift",
	password: "Mi.51205231",
	port: 5432,
});

module.exports = pool;
