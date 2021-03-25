import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';

@Injectable()
export class IsMultipartInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest() as FastifyRequest;
    if (!req.isMultipart()) {
      throw new BadRequestException('Content-Type must be multipart');
    }

    return next.handle();
  }
}
