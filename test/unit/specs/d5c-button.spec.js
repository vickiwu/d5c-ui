import { createTest, destroyVM } from '../util';
import D5cButton from 'packages/d5c-button';

describe('D5cButton', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(D5cButton, true);
    expect(vm.$el).to.exist;
  });
});

