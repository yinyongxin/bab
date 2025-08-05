import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 记录请求信息
    // 这里可以根据需要记录更多的信息
    // 例如：请求体、查询参数等
    const startTime = Date.now();
    res.on('finish', () => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      const requestInfo = {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        method: req.method,
        baseUrl: req.baseUrl,
        params: req.params,
        query: req.query,
        body: req.body,
        statusCode: res.statusCode,
        duration,
      };
      console.log('Request Info:', requestInfo);
    });
    // 继续处理请求
    next();
  }
}
