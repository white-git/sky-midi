import { Either } from '../../common/domain/Either'

export interface MidiLogs_Repository {
  all(): Either<Error, string>
  write(message: string): void
}
