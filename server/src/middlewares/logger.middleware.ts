import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.method, req.baseUrl);
    console.log('query:', JSON.stringify(req.query));
    console.log('body:', req.body);
    next();
  }
}
