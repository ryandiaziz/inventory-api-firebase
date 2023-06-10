const express = require("express");
const app = express();
const routes = require('./routes/itemRoute');
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`);
});