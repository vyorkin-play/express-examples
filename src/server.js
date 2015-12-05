import debug from 'debug';
import logger from 'debug-dude';

import Express from 'express';
import { Server } from 'http';

const { info, log, warn, error } = logger('server');

debug.enable('server:info');
debug.enable('server:log');
debug.enable('server:warn');
debug.enable('server:error');

const app = new Express();
const server = new Server(app);

app.use((req, res) => {
  res.status(200).send('hello');
});

app.use((err, req, res, next) => {
  error('server error: ', error);

  res.status(500);
  res.send(err.stack);
});

const PORT = 3000;

server.listen(PORT, (err) => {
  if (err) {
    error(err);
  } else {
    info(
      '🚀  server is running at: %s\n',
      `http://localhost:${PORT}`
    );
  }
});
