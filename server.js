const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const routes = require('./api/routes/routes');

const server = express();
const corsOptions = {
  'origin': 'http://localhost:3000',
  'credentials': true
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/auth-users', {
  useMongoClient: true
});

server.use(bodyParser.json());
server.use(cors(corsOptions));

routes(server);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
