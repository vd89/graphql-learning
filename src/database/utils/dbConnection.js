import mongoPkg from 'mongoose';
import debugPkg from 'debug';
import appConfig from '../../appConfig.js';

const logger = debugPkg('app:dbConnection ->');
const { mongoUrl } = appConfig;

const { connect, set } = mongoPkg;
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
    set('debug', true); // get from mongoose
    logger(`MongoDb -> Connected to mongoDb Server`);
  } catch (err) {
    logger(err.message);
  }
};
export default dbConnection;
