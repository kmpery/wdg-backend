import { Schema, Document, models, model } from 'mongoose';

export interface IRSVP extends Document {
  name: string;
  willAttend: string;
}

const rsvpSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    willAttend: { type: String, required: true },
  },
  { timestamps: true }
);

export const RSVP = models.RSVP || model<IRSVP>('RSVP', rsvpSchema);
