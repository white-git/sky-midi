import { Midi_Ploc } from './presenter/Midi_Ploc'
import { Midi_App } from './domain/Midi_App'
import { MidiApi } from './data/MidiApi'
import { MidiMemory } from './data/MidiMemory'
import { MidiLogs } from './data/MidiLogs'
import type { KeyPress_App } from '../keypress/domain/KeyPress_App'

export class Midi_Provider {
  static createMidiApp() {
    return new Midi_App(
      new MidiApi(),
      new MidiMemory(),
      new MidiLogs(),
    )
  }

  static createMidiPloc(midiApp: Midi_App, keyPressApp: KeyPress_App) {
    return new Midi_Ploc(midiApp, keyPressApp)
  }
}
