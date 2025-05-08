enum Direction { left = 'left', right = 'right' }
type Left<L> = { kind: 'left', leftValue: L }
type Right<R> = { kind: 'right', rightValue: R }

type EitherValue<L, R> = Left<L> | Right<R>

export class Either<L, R> {
  private constructor(private readonly value: EitherValue<L, R>) {}

  fold<T>(leftFn: (left: L) => T, rightFn: (right: R) => T): T {
    switch (this.value.kind) {
      case Direction.left:
        return leftFn(this.value.leftValue)
      case Direction.right:
        return rightFn(this.value.rightValue)
      default:
        throw new Error('Invalid either state')
    }
  }

  left<T>(fn: (left: L) => Either<T, R>): Either<T, R> {
    return this.fold(
      left => fn(left),
      right => Either.right(right)
    )
  }

  right<T>(fn: (right: R) => Either<L, T>): Either<L, T> {
    return this.fold(
      left => Either.left(left),
      right => fn(right)
    )
  }

  mapLeft<T>(fn: (left: L) => T): Either<T, R> {
    return this.left(left => Either.left(fn(left)))
  }

  mapRight<T>(fn: (right: R) => T): Either<L, T> {
    return this.right(right => Either.right(fn(right)))
  }

  getLeft(): L {
    return this.fold(
      l => l,
      () => { throw new Error('Value is correct') },
    )
  }

  getRight(): R {
    return this.fold(
      () => { throw new Error('Value is incorrect') },
      r => r,
    )
  }

  static left<L, R>(leftValue: L) {
    return new this<L, R>({ kind: Direction.left, leftValue })
  }

  static right<L, R>(rightValue: R) {
    return new this<L, R>({ kind: Direction.right, rightValue })
  }
}
