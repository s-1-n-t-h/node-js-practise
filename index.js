const express = require("express");
const app = express();
const Joi = require("joi");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
app.use(express.json());
app.set("view engine", "pug");
app.set("views", "./views");

console.log("App Name: " + config.get("name"));
console.log("Server Name: " + config.get("mail.host"));
console.log("App password: " + config.get("mail.password"));
const courses = [
	{ id: 1, name: "Practical Data Science" },
	{ id: 2, name: "AI for Everybody" },
	{ id: 3, name: "ML Math Specalisation" },
];
app.get("/", (req, res) => {
	res.render("index", { title: "My Express App", message: "Welcomes You!!!" });
});
app.get("/api/courses", (req, res) => {
	res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course)
		return res.status(404).send("The course with the given ID is not found");
	res.send(course);
});
app.post("/api/courses", (req, res) => {
	const { error } = validateCourse(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const course = {
		id: courses.length + 1,
		name: req.body.name,
	};
	courses.push(course);
	res.send(course);
});
app.put("/api/courses/:id", (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course)
		return res.status(404).send("The course with the given ID is not found");
	const { error } = validateCourse(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	course.name = req.body.name;
	res.send(course);
});
app.delete("/api/courses/:id", (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course)
		return res.status(404).send("The course with the given ID is not found");
	const index = courses.indexOf(req.params.id);
	courses.splice(index, 1);
	return res.send(course);
});
function validateCourse(course) {
	const schema = {
		name: Joi.string().min(3).required(),
	};
	return Joi.validate(course, schema);
}
const port = process.env.PORT || 3000;
app.listen(port, () => startupDebugger(`Listening on port: ${port}`));
