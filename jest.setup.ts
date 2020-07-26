import { succeeded, failed } from './src/types-d';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveSucceeded(): R;
      toHaveFailed(): R;
    }
  }
}

const invalidOperationMessage =
  'Invalid operation. Checking success/failure is only supported for Either-objects.';

expect.extend({
  toHaveSucceeded(received) {
    const isEither = received?.tag === 'left' || received?.tag === 'right';
    const pass = succeeded(received);

    if (!isEither) {
      return {
        message: () => invalidOperationMessage,
        pass: this.isNot
      };
    } else if (pass) {
      return {
        message: () =>
          'expected Either-object not to have succeeded, but it did.',
        pass: true
      };
    } else {
      return {
        message: () =>
          'expected Either-object to have succeeded, but it failed.',
        pass: false
      };
    }
  },
  toHaveFailed(received) {
    const isEither = received?.tag === 'left' || received?.tag === 'right';
    const pass = isEither && failed(received);

    if (!isEither) {
      return {
        message: () => invalidOperationMessage,
        pass: this.isNot
      };
    } else if (pass) {
      return {
        message: () => 'expected Either-object not to have failed, but it did.',
        pass: true
      };
    } else {
      return {
        message: () =>
          'expected Either-object to have failed, but it succeeded.',
        pass: false
      };
    }
  }
});
