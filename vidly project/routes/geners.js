const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const { Genre, validate } = require("./models/genre");

mongoose
	.connect("mongodb://localhost/vidly")
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Error Connecting to DB", err));

router.get("/", async (req, res) => {
	const genres = await Genre.find().sort("name");
	return res.send(genres);
});

router.get("/:id", async (req, res) => {
	const genre = await Genre.findById(req.params.id);
	if (!genre) {
		return res.status(404).send("The genre with given ID is not found");
	}
	return res.send(genre);
});

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	let genre = new Genre({
		name: req.body.name,
	});
	genre = await genre.save();
	return res.send(genre);
});

router.put("/:id", async (req, res) => {
	const { error } = validate(req.body);
	if (error) {
		return res.status(400).send(error.deatils[0].message);
	}
	const genre = await Genre.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{ new: true },
	);
	if (!genre) {
		return res.status(404).send("The resounce with the given ID is not found");
	}
	return res.send(genre);
});
router.delete("/:id", async (req, res) => {
	const genre = await Genre.findByIdAndDelete(req.params.id);
	if (!genre) {
		return res.status(404).send("The resource with the given ID is not found");
	}
	return res.send(genre);
});

module.exports = router;
