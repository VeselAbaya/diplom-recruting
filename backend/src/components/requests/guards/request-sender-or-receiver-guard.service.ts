import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestRepository } from '@components/requests/request/request.repository';

@Injectable()
export class RequestSenderOrReceiverGuard implements CanActivate {
  constructor(private requests: RequestRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const isSender = await this.requests.userIsSenderOfRequest(req.user, req.params.id);
    const isReceiver = await this.requests.userIsReceiverOfRequest(req.user, req.params.id);
    return isSender || isReceiver;
  }
}
