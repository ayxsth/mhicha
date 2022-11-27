import { Observable } from 'rxjs';
import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { AuthRequest } from '@/common/interface/route.interface';

@Injectable()
export class SelfTransferInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<AuthRequest>();

    if (request.user.email === request.body.email) {
      throw new BadRequestException('Cannot transfer to self');
    }

    return next.handle();
  }
}
