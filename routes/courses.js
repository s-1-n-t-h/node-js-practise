const express = require("express");
const router = express.Router();

const courses = [
	{ id: 1, name: "Practical Data Science" },
	{ id: 2, name: "AI for Everybody" },
	{ id: 3, name: "ML Math Specalisation" },
];

router.get("/", (req, res) => {
	res.send(courses);
});
router.get("//:id", (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) {
		return res.status(404).send("The course with the given ID is not found");
	}
	res.send(course);
});
router.post("/", (req, res) => {
	const { error } = validateCourse(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	const course = {
		id: courses.length + 1,
		name: req.body.name,
	};
	courses.push(course);
	res.send(course);
});
router.put("/:id", (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) {
		return res.status(404).send("The course with the given ID is not found");
	}
	const { error } = validateCourse(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	course.name = req.body.name;
	res.send(course);
});
router.delete("/:id", (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) {
		return res.status(404).send("The course with the given ID is not found");
	}
	const index = courses.indexOf(req.params.id);
	courses.splice(index, 1);
	return res.send(course);
});

function validateCourse(course) {
	const schema = {
		name: Joi.string().min(3).required(),
	};
}

module.exports = router;
