const express = require("express");
const app = express();
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const courses = require("./routes/courses");
const home = require("./routes/home");
const logger = require("./middleware/logger");

app.use(express.json());
app.set("view engine", "pug");
app.set("views", "./views");

app.use("/", home);
app.use("/api/courses/", courses);
app.use(logger);

console.log("App Name: " + config.get("name"));
console.log("Server Name: " + config.get("mail.host"));
console.log("App password: " + config.get("mail.password"));

const port = process.env.PORT || 3000;
app.listen(port, () => startupDebugger(`Listening on port: ${port}`));
