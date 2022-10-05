import { model, Schema } from 'mongoose';

const _schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tasks: [{ type: Schema.ObjectId, ref: 'Task' }],
}, {
  timestamps: true,
});

// eslint-disable-next-line require-jsdoc
class User {}

_schema.loadClass(User);

export default model('User', _schema);
