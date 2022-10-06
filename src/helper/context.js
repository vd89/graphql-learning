import debug from 'debug';
import { tokenVerify } from './encryptHelper.js';

const logger = debug('app:context -> ');

export const verifyUser = async (req) => {
  try {
    req.email = null;
    const bearerHeader = req.header('Authorization');
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1];
      const payload = await tokenVerify(token);
      req.email = payload.email;
      logger(payload.email);
    }
  } catch (err) {
    logger(err.message);
    throw err;
  }
};
