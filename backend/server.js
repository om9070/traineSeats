const { json } = require("express");
const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
var cors = require('cors')
require("./database");
const AdminDetail=require("./routes/admin")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: '*',
}));
app.use(bodyParser.json());




// all Routes will be hare
app.use("/",AdminDetail);





app.listen(port, () => {
  console.log(`port is running ${port}`);
});
