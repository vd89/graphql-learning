import crypto from 'crypto';
import appConfig from '../appConfig.js';

const { encryptionKey, algorithm } = appConfig;

export const generateRandomString = (_length) => {
  return crypto
      .randomBytes(Math.ceil(_length / 2))
      .toString('hex')
      .slice(0, _length);
};

export const hashString = (_value, _salt) => {
  const hash = crypto.createHmac('sha512', _salt);
  hash.update(_value);
  return hash.digest('hex');
};

export const encrypt = async (_text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(encryptionKey), iv);
  let encrypted = cipher.update(_text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decrypt = async (_text) => {
  const textParts = _text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryptionKey), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};
