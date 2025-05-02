import { Either } from '../../common/domain/Either'
import type { MidiApi_Repository } from '../domain/MidiApi_Repository'

export class MidiApi implements MidiApi_Repository {
  private midiAccess?: MIDIAccess

  private async connect() {
    try {
      if (!this.midiAccess) this.midiAccess = await navigator.requestMIDIAccess()
      return this.midiAccess
    } catch (e) {
      throw new Error('Failed to requestMIDIAccess')
    }
  }

  async getMidiList(): Promise<Either<Error, MIDIInputMap>> {
    try {
      this.midiAccess = await this.connect()
      return Either.right(this.midiAccess.inputs)
    } catch (e) {
      return Either.left(<Error>e)
    }
  }

  async getDeviceById(id: string): Promise<Either<Error, MIDIInput>> {
    try {
      this.midiAccess = await this.connect()
      const input = this.midiAccess.inputs.get(id)
      if (!input) throw new Error('MIDI input does not exists')
      return Either.right(input)
    } catch (e) {
      return Either.left(<Error>e)
    }
  }
}
