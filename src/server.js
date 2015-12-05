import debug from 'debug';
import logger from 'debug-dude';
import PrettyError from 'pretty-error';
import Express from 'express';
import { Server } from 'http';
import middleware from './middleware.js';

const prettyError = new PrettyError();

debug.enable('server:*');
const { info, log, warn, error } = logger('server');

const app = new Express();
const server = new Server(app);

middleware.forEach(m => app.use(m));  // setup middleware

app.use((req, res) => {
  throw new Error('some pizdec has occured');
  res.status(200).send('hello');
});

app.use((err, req, res, next) => {
  error('server error: ', prettyError.render(err));
  next(err);
});

const PORT = 3000;

server.listen(PORT, (err) => {
  if (err) {
    // error(prettyError.render(err));
  } else {
    info(
      '🚀  server is running at: %s\n',
      `http://localhost:${PORT}`
    );
  }
});
