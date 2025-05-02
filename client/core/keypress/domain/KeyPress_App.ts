import type { MidiBinding } from '../../midi/domain/models/MidiBinding'
import { MidiNoteDirection, MidiNoteEvent } from '../../midi/domain/models/MidiNoteEvent'
import { KeyPressApi_Repository } from './KeyPressApi_Repository'
import { KeyPressCode } from './models/KeyPressCode'

export class KeyPress_App {
  constructor(private readonly keyPressApi: KeyPressApi_Repository) {}

  private getKeyCodeByCode(keyPC: string) {
    const key = Object.keys(KeyPressCode).find(k => k.toLowerCase() === keyPC.toLowerCase())
    if (key) return KeyPressCode[key]
  }

  keyToggle(noteEvent: MidiNoteEvent, binding: MidiBinding) {
    const keyPressCode = this.getKeyCodeByCode(binding.keyPC)
    if (keyPressCode && noteEvent.direction === MidiNoteDirection.on) {
      this.keyPressApi.keyToggle(keyPressCode)
    }
  }
}
