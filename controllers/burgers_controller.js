var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

router.get("/", function (req, res) {
  // console.log();

  burger.all(function (data) {
    // console.log("controller", data);
    var hbsObject = {
      burger_data: data
    };
    // console.log("handlebars obj", hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  console.log("POST body", req.body);

  burger.create(["burger", "devoured"], [req.body.burger, req.body.devoured], function (result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  console.log("req.body", req.body);

  burger.update(
   req.body.burger,
   req.body.devoured,
    condition,
    function (result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});

module.exports = router;