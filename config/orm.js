var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

var orm = {
  all: function (tableInput, cb) {
    console.log("orm", tableInput);

    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  create: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (" + cols.toString() + ") ";

    queryString += "VALUES (" + printQuestionMarks(vals.length) + ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },


  update: function (table,condition, cb) {
    connection.query("UPDATE " + table+ " SET devoured=true WHERE id = " + condition + ";", function (err, result) {
      if (err) throw err;
      cb(result);
    })
  },

};

module.exports = orm;