const { response } = require("express");
const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.json());

const courses = [
	{ id: 1, name: "Practical Data Science" },
	{ id: 2, name: "AI for Everybody" },
	{ id: 3, name: "ML Math Specalisation" },
];
app.get("/", (req, res) => {
	res.send("Welcome!!!!");
});
app.get("/api/courses", (req, res) => {
	res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) {
		res.status(404).send("The course with the given ID is not found");
		return;
	}
	res.send(course);
});
app.post("/api/courses", (req, res) => {
	const { error } = validateCourse(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}
	const course = {
		id: courses.length + 1,
		name: req.body.name,
	};
	courses.push(course);
	res.send(course);
});
app.put("/api/courses/:id", (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) {
		res.status(404).send("The course with the given ID is not found");
		return;
	}
	const { error } = validateCourse(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}
	course.name = req.body.name;
	res.send(course);
});

function validateCourse(course) {
	const schema = {
		name: Joi.string().min(3).required(),
	};
	return Joi.validate(course, schema);
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
