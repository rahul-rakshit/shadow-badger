export interface Failure<F> {
  value: F;
  tag: 'left';
}

export interface Success<S> {
  value: S;
  tag: 'right';
}

export type Either<F, S> = Failure<F> | Success<S>;

export function failed<F>(val: any): val is Failure<F> {
  if ((val as Failure<F>)?.tag === 'left') return true;
  return false;
}

export function succeeded<S>(val: any): val is Success<S> {
  if ((val as Success<S>)?.tag === 'right') return true;
  return false;
}

export function asFailure<F>(val: F): Failure<F> {
  return { value: val, tag: 'left' };
}

export function asSuccess<S>(val: S): Success<S> {
  return { value: val, tag: 'right' };
}
