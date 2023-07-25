const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Customer, validate } = require("./models/customer");

mongoose
	.connect("mongodb://localhost/customers-excercise")
	.then(() => console.log("Connected to Customer's MongoDB"))
	.catch((err) => console.error("Error in connecting to DB:", err));

router.get("/", async (req, res) => {
	const customers = await Customer.find().sort("name");
	if (!customers) {
		return res.status(404).send("No Customers Found");
	}
	return res.send(customers);
});

router.get("/:id", async (req, res) => {
	try {
		const customer = await Customer.findById(req.params.id);
		return res.send(customer);
	} catch (err) {
		console.error(err.message);
		return res.status(404).send("Customer with the given id is not available");
	}
});

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	let customer = new Customer({
		name: req.body.name,
		isGold: req.body.isGold,
		phone: req.body.phone,
	});

	customer = await customer.save();
	return res.send(customer);
});

router.put("/:id", async (req, res) => {
	const { error } = validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	try {
		const customer = await Customer.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				isGold: req.body.isGold,
				phone: req.body.phone,
			},
			{ new: true },
		);
		return res.send(customer);
	} catch (err) {
		console.error(err.message);
		return res.status(404).send("Customer with given ID not found");
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const customer = await Customer.findByIdAndDelete(req.params.id);
		return res.send(customer);
	} catch (err) {
		console.error(err.message);
		return res.status(404).send("Customer with given ID not found");
	}
});

module.exports = router;
