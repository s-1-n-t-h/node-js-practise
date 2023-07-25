const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("index", {
		title: "Excercise API",
		message: "I am going to rock everything",
	});
});

module.exports = router;
