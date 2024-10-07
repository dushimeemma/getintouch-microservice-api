import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const key = req.headers['x-api-key'];
    if (key !== process.env.API_KEY) {
      throw new UnauthorizedException('Invalid API key');
    }
    next();
  }
}
