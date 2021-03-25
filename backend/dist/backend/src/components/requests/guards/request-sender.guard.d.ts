import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RequestRepository } from '@components/requests/request/request.repository';
export declare class RequestSenderGuard implements CanActivate {
    private requests;
    constructor(requests: RequestRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
