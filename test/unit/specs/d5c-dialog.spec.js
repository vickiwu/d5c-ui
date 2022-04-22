import { createTest, destroyVM } from '../util';
import D5cDialog from 'packages/d5c-dialog';

describe('D5cDialog', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(D5cDialog, true);
    expect(vm.$el).to.exist;
  });
});

