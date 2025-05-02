import { Either } from '../../common/domain/Either'

export interface MidiApi_Repository {
  getMidiList(): Promise<Either<Error, MIDIInputMap>>
  getDeviceById(id: string): Promise<Either<Error, MIDIInput>>
}
