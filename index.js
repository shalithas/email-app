import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import config from './src/config';
import server from './src/server';

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

server(app);

app.listen(config.server.port, () => {
  console.log(`Server started on port ${config.server.port}`);
});

export const viteNodeApp = app;
