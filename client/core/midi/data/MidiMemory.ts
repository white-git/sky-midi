import { Either } from '../../common/domain/Either'
import { MidiBinding } from '../domain/models/MidiBinding'
import type { MidiMemory_Repository } from '../domain/MidiMemory_Repository'

export class MidiMemory implements MidiMemory_Repository {
  private device: MIDIInput = <MIDIInput>{}
  private bindings: MidiBinding[] = []

  setDevice(input: MIDIInput) {
    this.device = input
  }

  getDevice(): Either<Error, MIDIInput> {
    if (!this.device.id) Either.left(new Error('No device set'))
    return Either.right(this.device)
  }

  getBindings(): Either<Error, MidiBinding[]> {
    return Either.right(this.bindings)
  }

  getBindingByCode(code: number): Either<Error, MidiBinding> {
    const binding = this.bindings.find(binding => binding.codeMIDI === code)
    if (binding) return Either.right(binding)
    return Either.left(new Error('Binding not found'))
  }

  setBindings(bindings: MidiBinding[]): Either<Error, MidiBinding[]> {
    this.bindings = bindings
    return Either.right(bindings)
  }

  addBinding(binding: MidiBinding): Either<Error, MidiBinding[]> {
    this.bindings.push(binding)
    return Either.right(this.bindings)
  }

  removeBinding(binding: MidiBinding): Either<Error, MidiBinding[]> {
    const i = this.bindings.findIndex(b => b.id === binding.id)
    if (i !== -1) this.bindings.splice(i, 1)
    return Either.right(this.bindings)
  }

  updateBinding(binding: MidiBinding, update: Partial<MidiBinding>): Either<Error, MidiBinding[]> {
    const i = this.bindings.findIndex(b => b.id === binding.id)
    if (i !== -1) this.bindings.splice(i, 1, { ...binding, ...update })
    return Either.right(this.bindings)
  }

  clearBindings(): Either<Error, MidiBinding[]> {
    this.bindings = []
    return Either.right(this.bindings)
  }
}
