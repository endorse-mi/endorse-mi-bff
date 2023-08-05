import { UTC_TIME } from '../__tests__/fixture';

const mock = function () {
  return {
    add: vi.fn().mockReturnThis(),
    toDate: vi.fn().mockReturnValue(new Date(UTC_TIME)),
  };
};

mock.extend = vi.fn();

module.exports = mock;
