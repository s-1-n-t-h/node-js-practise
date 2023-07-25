const express = require("express");
app = express();
const geners = require("./routes/geners");
const home = require("./routes/home");

app.use(express.json());
app.use("/", home);
app.use("/api/geners", geners);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on ${port}`));
