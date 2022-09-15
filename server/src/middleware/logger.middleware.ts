import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('Request');

  private getLog(method: string, originalUrl: string, statusCode: number, timeTaken: number, contentLength: string) {
    const baseLog = `[${method}] ${originalUrl} Status: ${statusCode} CPU Time: ${timeTaken}ms Content Length: ${contentLength}`;

    return baseLog;
  }

  use(req: Request, res: Response, next: () => void) {
    const { method, originalUrl } = req;

    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;

      const contentLength = res.get('content-length');

      const timeTaken = Date.now() - startTime;

      this.logger.log(this.getLog(method, originalUrl, statusCode, timeTaken, contentLength));
    });

    next();
  }
}
