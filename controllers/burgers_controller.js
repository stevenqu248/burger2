var db = require("../models");
var express = require("express");
var Sequelize = require("sequelize");
var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function(request, response) 
{
	db.Burger.findAll().then(function(data)
	{
		var handlebarObject = 
		{
			burgers: data
		};
		response.render("index", handlebarObject);
	});
});

router.post("/", function(request, response) 
{
	db.Burger.create(request.body).then(function(data) 
	{
		console.log(data);
		response.redirect("/");
	});
});

router.put("/:id", function(request, response) 
{
	var burgerId = request.params.id;

	db.Burger.update({ devoured: true },{ where: {id: burgerId} })
	.then(function()
	{
		response.redirect("/");
	});
});

module.exports = router;