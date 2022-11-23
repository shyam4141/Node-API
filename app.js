const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv/config");
const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

/// import routes
const postsRoute = require("./routes/posts");
const activityRoute = require("./routes/activity");

///Database controls

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log(err.message));

///// middleware
app.use("/posts", postsRoute);
app.use("/", activityRoute);

/// routes
app.get("/", (req, res) => {
  res.send("we are here");
});

app.listen("3000");
