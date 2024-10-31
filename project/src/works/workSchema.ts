import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Work extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'Artist', required: true })
  artistId: Types.ObjectId; // ID-ul artistului asociat

  // @Prop()
  // artistLink: string;

  @Prop({ default: true })
  isVisible: boolean;
}

export const WorkSchema = SchemaFactory.createForClass(Work);
