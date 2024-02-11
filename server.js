require('dotenv').config();

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const authRoute = require("./routes/authRoute");
const rolesRoute = require("./routes/roleRoute");
const usersRoute = require("./routes/userRoute");
const deviceRoute = require("./routes/deviceRoute");
const rentRoute = require("./routes/rentRoute");
const statusRoute = require("./routes/statusRoute");
const availabilityRoute = require("./routes/availabilityRoute");
const deviceInformationRoute = require("./routes/deviceInformationRoute");
const renterRoute = require("./routes/renterRoute");

const app = express();
const PORT = process.env.PORT
app.use(cors());
app.use(bodyParser.json());


app.use("/auth", authRoute)
app.use("/",rolesRoute,usersRoute,deviceRoute,rentRoute,statusRoute, availabilityRoute,deviceInformationRoute
,renterRoute)

app.listen(PORT, () => {
    console.log(`Server Address:`,PORT)
});