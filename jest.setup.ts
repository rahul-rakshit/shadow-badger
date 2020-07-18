import { succeeded, failed } from './src/types-d';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveSucceeded(): R;
      toHaveFailed(): R;
    }
  }
}

expect.extend({
  toHaveSucceeded(received) {
    const pass = succeeded(received);
    if (pass) {
      return {
        message: () => `expected ${received} not to have succeeded`,
        pass: true
      };
    } else {
      return {
        message: () => `expected ${received} to have succeeded`,
        pass: false
      };
    }
  },
  toHaveFailed(received) {
    const pass = failed(received);
    if (pass) {
      return {
        message: () => `expected ${received} not to have failed`,
        pass: true
      };
    } else {
      return {
        message: () => `expected ${received} to have failed`,
        pass: false
      };
    }
  }
});
