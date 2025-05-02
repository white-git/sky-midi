import { Either } from '../../common/domain/Either'
import { MidiBinding } from '../domain/models/MidiBinding'

export interface MidiMemory_Repository {
  setDevice(input: MIDIInput): void
  getDevice(): Either<Error, MIDIInput>
  getBindings(): Either<Error, MidiBinding[]>
  getBindingByCode(code: number): Either<Error, MidiBinding>
  setBindings(bindings: MidiBinding[]): Either<Error, MidiBinding[]>
  addBinding(binding: MidiBinding): Either<Error, MidiBinding[]>
  removeBinding(binding: MidiBinding): Either<Error, MidiBinding[]>
  updateBinding(binding: MidiBinding, update: Partial<MidiBinding>): Either<Error, MidiBinding[]>
  clearBindings(): Either<Error, MidiBinding[]>
}
