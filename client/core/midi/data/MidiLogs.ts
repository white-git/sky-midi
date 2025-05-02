import { Either } from '../../common/domain/Either'
import type { MidiLogs_Repository } from '../domain/MidiLogs_Repository'

export class MidiLogs implements MidiLogs_Repository {
  private logs: string = ''

  all(): Either<Error, string> {
    return Either.right(this.logs)
  }

  write(message: string) {
    this.logs += message
  }
}
