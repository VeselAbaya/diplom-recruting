import { IsBidirectionalPipe } from './is-bidirectional.pipe';

describe('IsBidirectionalPipe', () => {
  it('create an instance', () => {
    const pipe = new IsBidirectionalPipe();
    expect(pipe).toBeTruthy();
  });
});
