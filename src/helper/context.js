import debug from 'debug';
import { tokenVerify } from './encryptHelper.js';
import User from '../database/models/userModel.js';

const logger = debug('app:context -> ');

export const verifyUser = async (req) => {
  try {
    req.email = null;
    req.loggedInUserId = null;
    const bearerHeader = req.header('Authorization');
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1];
      const payload = await tokenVerify(token);
      req.email = payload.email;
      const user = await User.findOne({ email: payload.email });
      req.loggedInUserId = user.id;
    }
  } catch (err) {
    logger(err.message);
    throw err;
  }
};
