
import path from 'path';
import Express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import compression from 'compression';
import responseTime from 'response-time';

export default [
  morgan('dev'),
  compression({ level: 3 }),
  Express.static(path.join(__dirname, '../public')),
  responseTime(),
  helmet.hidePoweredBy({ setTo: 'human brains' }),
  helmet.frameguard('sameorigin'),
  helmet.xssFilter(),
  helmet.noSniff(),
  helmet.ieNoOpen()
]
