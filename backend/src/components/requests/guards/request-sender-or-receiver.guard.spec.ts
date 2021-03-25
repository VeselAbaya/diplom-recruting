import { RequestSenderOrReceiverGuard } from './request-sender-or-receiver-guard.service';

describe('RequestSenderOrReceiverGuard', () => {
  it('should be defined', () => {
    expect(new RequestSenderOrReceiverGuard()).toBeDefined();
  });
});
