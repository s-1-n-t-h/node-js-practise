const express = require("express");
app = express();
const Joi = require("joi");
app.use(express.json());
const geners = [
	{ id: 1, name: "Horror" },
	{ id: 2, name: "Romance" },
	{ id: 3, name: "Thriller" },
	{ id: 4, name: "Action" },
];

app.get("/", (req, res) => {
	res.send("<h1>Welcome to Vidly!</h1>");
});

app.get("/api/geners", (req, res) => {
	res.send(geners);
});

app.get("/api/geners/:id", (req, res) => {
	const gener = geners.find((g) => g.id === parseInt(req.params.id));
	if (!gener) {
		return res.status(404).send("The gener with given ID is not found");
	}
	res.send(gener);
});

app.post("/api/geners", (req, res) => {
	const { error } = validateGener(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const gener = {
		id: geners.length + 1,
		name: req.body.name,
	};
	geners.push(gener);
	return res.send(gener);
});

app.put("/api/geners/:id", (req, res) => {
	const gener = geners.find((g) => g.id === parseInt(req.params.id));
	if (!gener)
		return res.status(404).send("The resounce with the given ID is not found");
	const { error } = validateGener(req.body);
	if (error) return res.status(400).send(error.deatils[0].message);
	gener.name = req.body.name;
	res.send(gener);
});
app.delete("/api/geners/:id", (req, res) => {
	const gener = geners.find((g) => g.id === parseInt(req.params.id));
	if (!gener)
		return res.status(404).send("The resource with the given ID is not found");
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

const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on ${port}`));
