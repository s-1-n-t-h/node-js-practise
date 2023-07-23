const express = require("express");
const router = express.Router();

const geners = [
	{ id: 1, name: "Horror" },
	{ id: 2, name: "Romance" },
	{ id: 3, name: "Thriller" },
	{ id: 4, name: "Action" },
];

router.get("/", (req, res) => {
	res.send(geners);
});

router.get("/:id", (req, res) => {
	const gener = geners.find((g) => g.id === parseInt(req.params.id));
	if (!gener) {
		return res.status(404).send("The gener with given ID is not found");
	}
	res.send(gener);
});

router.post("/", (req, res) => {
	const { error } = validateGener(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	const gener = {
		id: geners.length + 1,
		name: req.body.name,
	};
	geners.push(gener);
	return res.send(gener);
});

router.put("/:id", (req, res) => {
	const gener = geners.find((g) => g.id === parseInt(req.params.id));
	if (!gener) {
		return res.status(404).send("The resounce with the given ID is not found");
	}
	const { error } = validateGener(req.body);
	if (error) {
		return res.status(400).send(error.deatils[0].message);
	}
	gener.name = req.body.name;
	res.send(gener);
});
router.delete("/:id", (req, res) => {
	const gener = geners.find((g) => g.id === parseInt(req.params.id));
	if (!gener) {
		return res.status(404).send("The resource with the given ID is not found");
	}
	const index = geners.indexOf(gener);
	geners.splice(index, 1);
	return res.send(gener);
});
function validateGener(gener) {
	const schema = {
		name: Joi.string().min(3).required(),
	};
	return Joi.validate(gener, schema);
}

module.exports = router;
