import { Document, Schema, model } from 'mongoose';

export interface UrlDocument extends Document {
  originalUrl: string;
  shortUrl: string;
}

const urlSchema = new Schema<UrlDocument>({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
});

const UrlModel = model<UrlDocument>('Url', urlSchema);

export default UrlModel;