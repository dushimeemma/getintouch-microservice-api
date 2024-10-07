import {
  Controller,
  Post,
  Body,
  Get,
  Headers,
  UploadedFiles,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
import { GetInTouchService } from './getintouch.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

@Controller('getintouch')
export class GetInTouchController {
  constructor(private getInTouchService: GetInTouchService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, { storage: multer.memoryStorage() }),
  )
  async handleGetInTouch(
    @Body() body: any,
    @UploadedFiles() files: Express.Multer.File[],
    @Headers('x-api-key') key: string,
  ) {
    if (key !== process.env.API_KEY) {
      throw new UnauthorizedException('Invalid API key');
    }

    if (body.saveToDB === 'true') {
      return this.getInTouchService.saveMessage(body, files);
    } else {
      await this.getInTouchService.sendEmail(body, files);
      return { message: 'Email sent successfully' };
    }
  }

  @Get()
  async getAllMessages(@Headers('x-api-key') key: string) {
    if (key !== process.env.API_KEY) {
      throw new UnauthorizedException('Invalid API key');
    }

    return this.getInTouchService.getAllMessages();
  }
}
