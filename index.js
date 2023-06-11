require("dotenv").config();
const express = require("express");
const app = express();
const routes = require('./routes/itemRoute');
const cors = require('cors');
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`);
});