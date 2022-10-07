import debug from 'debug';

import User from '../database/models/userModel.js';
import { comparePassword, encrypt, generateAuthToken } from '../helper/encryptHelper.js';

const logger = debug('app:userController ->');

export const getUserData = async (_email) => {
  try {
    const user = await User.findOne({ email: _email });
    if (!user) {
      throw new Error('User not found!');
    }
    return user;
  } catch (err) {
    logger(err.message);
    throw err;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found!');
    }
    return user;
  } catch (err) {
    logger(err.message);
    throw err;
  }
};

export const signupController = async (_input) => {
  try {
    const { email, password, name } = _input;
    const user = await User.findOne({ email: email });
    if (user) {
      user.message= 'User already exist';
      return user;
    }
    const hashedPassword = await encrypt(password);
    const newUser = new User({ name, email, password: hashedPassword });
    newUser.message = 'User Created';
    const result = await newUser.save();
    return result;
  } catch (err) {
    logger(err.message);
  }
};

export const loginController = async (_input) => {
  try {
    const { email, password } = _input;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User does not exists ');
    }
    const isPassword = await comparePassword(password, user.password);
    if (!isPassword) {
      throw new Error('Incorrect Password');
    }
    const token = await generateAuthToken(email);
    user.message= 'User Authorized';
    user.token = token;
    return user;
  } catch (err) {
    logger(err.message);
    throw err;
  }
};
