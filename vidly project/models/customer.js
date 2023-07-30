const mongoose = require("mongoose");
const Joi = require("joi");

const customerValidator = mongoose.Schema({
	isGold: { type: Boolean, default: false },
	name: { type: String, min: 3, max: 50, required: true },
	phone: { type: String, min: 5, max: 50, required: true },
});

const Customer = mongoose.model("Customer", customerValidator);

function validateInput(customer) {
	const schema = {
		name: Joi.string().min(3).max(50).required(),
		isGold: Joi.boolean(),
		phone: Joi.string().min(3).max(50).required(),
	};
	return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
