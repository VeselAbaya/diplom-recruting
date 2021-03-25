import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestRepository } from '@components/requests/request/request.repository';

@Injectable()
export class RequestReceiverGuard implements CanActivate {
  constructor(private requests: RequestRepository) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    return this.requests.userIsReceiverOfRequest(req.user, req.params.id);
  }
}
