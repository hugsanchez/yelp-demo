require("dotenv").config();

const express  = require("express");
const app = express();

app.use(express.json());

const restauRouter = require('./api/restauRouter');
app.use('/api/v1/restaurants', restauRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});