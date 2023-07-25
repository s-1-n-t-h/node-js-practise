const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

mongoose
	.connect("mongodb://localhost/vidly")
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Error Connecting to DB", err));

const genreValidator = mongoose.Schema({
	name: String,
});

const Genre = mongoose.model("Genre", genreValidator);

router.get("/", async (req, res) => {
	const genres = await Genre.find().sort("name");
	res.send(genres);
});

router.get("/:id", async (req, res) => {
	const genre = await Genre.findById(req.params.id);
	if (!genre) {
		return res.status(404).send("The genre with given ID is not found");
	}
	res.send(genre);
});

router.post("/", async (req, res) => {
	const { error } = validateGenre(req.body);
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
	const { error } = validateGenre(req.body);
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
	res.send(genre);
});
router.delete("/:id", async (req, res) => {
	const genre = await Genre.findByIdAndDelete(req.params.id);
	if (!genre) {
		return res.status(404).send("The resource with the given ID is not found");
	}
	return res.send(genre);
});
function validateGenre(genre) {
	const schema = {
		name: Joi.string().min(3).required(),
	};
	return Joi.validate(genre, schema);
}

module.exports = router;
