const express = require("express");
const app = express();
const customers = require("./routes/customers");
const home = require("./routes/home");

app.use(express.json());
app.use("/", home);
app.use("/api/customers", customers);
app.set("view engine", "pug");
app.set("views", "./views");

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}`));
