const Joi = require("joi");
const mongoose = require("mongoose");

const genreValidator = mongoose.Schema({
	name: String,
});

const Genre = mongoose.model("Genre", genreValidator);

function validateGenre(genre) {
	const schema = {
		name: Joi.string().min(3).required(),
	};
	return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;
