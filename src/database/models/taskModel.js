import { model, Schema } from 'mongoose';

const _schema = new Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, required: true },
  user: { type: Schema.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

// eslint-disable-next-line require-jsdoc
class Task {}

_schema.loadClass(Task);

export default model('Task', _schema);
