import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { Message } from './schemas/message.schema';
import { FirebaseService } from '../firebase-admin/firebase-admin.service';

@Injectable()
export class GetInTouchService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private firebaseService: FirebaseService,
  ) {}

  async saveMessage(
    messageData,
    files: Express.Multer.File[],
  ): Promise<Message> {
    try {
      const uploadedFiles = await Promise.all(
        files.map((file) => this.firebaseService.uploadFile(file)),
      );
      const message = new this.messageModel({
        ...messageData,
        files: uploadedFiles,
      });

      return message.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async sendEmail(messageData, files: Express.Multer.File[]) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const attachments = files.map((file) => ({
      filename: file.originalname,
      content: file.buffer,
    }));

    await transporter.sendMail({
      from: messageData.email,
      to: process.env.RECEIVER_EMAIL,
      subject:
        process.env.EMAIL_SUBJECT || `Message from ${messageData.fullName}`,
      text: `${messageData.message} \n\n ${messageData.phone} \n\n ${messageData.email}`,
      attachments,
    });
  }
}
