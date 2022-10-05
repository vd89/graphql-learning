import { connect } from 'mongoose';
import debug from 'debug';
import appConfig from '../../appConfig.js';

const logger = debug('app:dbConnection ->');
const { mongoUrl } = appConfig;
const mongoOpt = {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000,
  socketTimeoutMS: 50000,
};

const dbConnection = async () => {
  try {
    await connect(mongoUrl, mongoOpt);
    logger(`MongoDb -> Connected to mongoDb Server`);
  } catch (err) {
    logger(err.message);
  }
};
export default dbConnection;
