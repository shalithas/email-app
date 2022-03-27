require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./src/config');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

require('./src/server')(app);

app.listen(config.server.port);
