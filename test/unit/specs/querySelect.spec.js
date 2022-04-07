import { createTest, destroyVM } from '../util';
import QuerySelect from 'packages/querySelect';

describe('QuerySelect', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(QuerySelect, true);
    expect(vm.$el).to.exist;
  });
});

