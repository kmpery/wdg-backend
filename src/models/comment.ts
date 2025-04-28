import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  name: string;
  message: string;
  createdAt: Date;
}

const commentSchema: Schema = new Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IComment>('Comment', commentSchema);
