import { Midi_Provider } from '../midi/Midi_Provider'
import { KeyPress_Provider } from '../keypress/KeyPress_Provider'

export class Common_Provider {
  private static midiApp = Midi_Provider.createMidiApp()
  private static keyPressApp = KeyPress_Provider.createKeyPressApp()
  static midiPloc = Midi_Provider.createMidiPloc(this.midiApp, this.keyPressApp)
}
