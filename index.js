require('dotenv').config();
const express = require('express');

const config = require('./src/config');

const app = express();

require('./src/server')(app);

app.listen(config.server.port);
