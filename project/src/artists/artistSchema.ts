import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Artist extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  linkUrl: string;


  @Prop()
  imageUrl: string;
  

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Work' }] })
  works: Types.ObjectId[];  // Array cu ID-urile lucrărilor

}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
