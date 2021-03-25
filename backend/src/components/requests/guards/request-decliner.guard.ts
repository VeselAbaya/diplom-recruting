import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestRepository } from '@components/requests/request/request.repository';

@Injectable()
export class RequestDeclinerGuard implements CanActivate {
  constructor(private requests: RequestRepository) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    return this.requests.userIsDeclinerOfRequest(req.user, req.params.id);
  }
}
