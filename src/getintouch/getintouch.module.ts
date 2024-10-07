import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetInTouchController } from './getintouch.controller';
import { GetInTouchService } from './getintouch.service';
import { Message, MessageSchema } from './schemas/message.schema';
import { FirebaseService } from '../firebase-admin/firebase-admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [GetInTouchController],
  providers: [GetInTouchService, FirebaseService],
})
export class GetInTouchModule {}
