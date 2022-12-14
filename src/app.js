import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import APServer from './gql/index.js';
import appConfig from './appConfig.js';

const app = express();
const { whiteList } = appConfig;

const corsOptionsDelegate = function(req, callback) {
  let corsOptions;
  if (whiteList.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      credentials: true,
      optionsSuccessStatus: 200,
      methods: ['OPTIONS', 'HEAD', 'GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    };
  } else {
    corsOptions = {
      origin: false,
      credentials: true,
      optionsSuccessStatus: 200,
      methods: ['OPTIONS', 'HEAD', 'GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    };
  }
  callback(null, corsOptions);
};

// Model import
import './database/models/index.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use('*', cors(corsOptionsDelegate));
app.use(helmet());
// app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));


await APServer.start();
APServer.applyMiddleware({ app, path: '/graphql' });


export default app;
