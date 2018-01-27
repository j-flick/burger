// Setup MySQL connection.
var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
	connection = mysql.createConnection({
		port: 3306,
		host: "localhost",
		user: "root",
		password: "root",
		database: "burgers_db"
	});
};

// Make the connection...
connection.connect(function(err) {
	if (err) {
		console.error("Error connecting: " + err.stack);
		return;
	}
	console.log("Connected as ID " + connection.threadId);
});

// Export connection to use with ORM.
module.exports = connection;