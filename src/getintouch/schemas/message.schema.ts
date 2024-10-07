import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  message: string;

  @Prop([String])
  files: string[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
