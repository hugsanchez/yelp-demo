require("dotenv").config();

const express  = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(cors())
app.use(express.json());

const restauRouter = require('./api/restauRouter');
app.use('/api/v1/restaurants', restauRouter);

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});