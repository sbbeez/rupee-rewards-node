const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const keys = require("./config/keys");
//DB setup
// mongoose.connect("mongodb://localhost:3000/auth");
mongoose.connect(keys.mongoDBUri);

//App Set up
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));

//App set up
require("./models/user");
require("./models/reward");
require("./Routes/authRoutes")(app);
require("./Routes/rewardRoutes")(app);

app.listen(3000);
