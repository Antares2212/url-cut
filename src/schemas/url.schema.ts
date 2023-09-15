import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

export type UrlDocument = Url & Document 

@Schema()
export class Url {
  @Prop({
    required: true
  })
  originalUrl: string

  @Prop({
    required: true,
    unique: true
  })
  shortUrl: string 
}

export const UrlSchema = SchemaFactory.createForClass(Url)