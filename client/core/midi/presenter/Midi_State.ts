import { MidiBindingKind } from '../domain/models/MidiBindingKind'
import { MidiBinding } from '../domain/models/MidiBinding'

export type Midi_State = {
  listening: boolean
  binding: MidiBindingKind | boolean
  bindings: MidiBinding[]
  updating: MidiBinding
  logs: string
  devices: MIDIInput[]
  device?: MIDIInput
  error?: Error
}

export const initialMidiState: Midi_State = {
  devices: [],
  bindings: [],
  logs: '',
  listening: false,
  binding: false,
  updating: <MidiBinding>{},
}
