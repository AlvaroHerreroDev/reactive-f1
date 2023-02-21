import { Status } from '../f1/types';
import { StatusPipe } from './status.pipe';

describe('StatusPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusPipe();
    expect(pipe).toBeTruthy();
  });

  it('should count finalized stats', () => {
    const pipe = new StatusPipe();
    const statuses = [{status: 'Finished', count: 5}] satisfies Status[];
    expect(pipe.transform(statuses, 'Finished')).toBe(5);
  });

});
