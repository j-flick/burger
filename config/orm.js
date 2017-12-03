// Import MySQL connection...
var connection = require("../config/connection.js");

// Helper function to insert questionmarks ("?") for SQL queries.
function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}

	return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax.
function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		var value = ob[key];

		// If there are hidden properties, skip them.
		if (Object.hasOwnProperty.call(ob, key)) {
			// If the string has spaces, add quotes.
			if (typeof value === "string" && value.indexOf(" ") >= 0) {
				value = "'" + value + "'";
			}
			// e.g. {burger_name: 'Luther Burger'} => ["burger_name='Luther Burger'"]
			arr.push(key + "=" + value);
		}
	}

	// Convert array of strings into a single, comma-separated string.
	return arr.toString();
}

// ORM object containing all SQL statment functions.
var orm = {
	// Select all method...
	selectAll: function(tableInput, cb) {
		var queryString = "SELECT * FROM " + tableInput + ";";

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	// Insert a burger method...
	insertOne: function(table, cols, vals, cb) {
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString +=") ";

		console.log(queryString);

		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	// Update a burger method...
	updateOne: function(table, objColVals, condition, cb) {
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		console.log(queryString);

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	}

};

// Export the ORM object for the model (burger.js).
module.exports = orm;