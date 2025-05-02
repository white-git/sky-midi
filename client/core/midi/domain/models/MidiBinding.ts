import { UID_Helper } from '../../../common/domain/helpers/UID_Helper'

export class MidiBinding {
  id: string
  keyPC: string
  keyMIDI: string
  codePC: number
  codeMIDI: number

  constructor(keyPC: string, codePC: number, keyMIDI: string, codeMIDI: number, id?: string) {
    this.id = id || UID_Helper.generate()
    this.keyPC = keyPC
    this.keyMIDI = keyMIDI
    this.codePC = codePC
    this.codeMIDI = codeMIDI
  }

  static create(
    keyPC: string = '',
    codePC: number = 0,
    keyMIDI: string = '',
    codeMIDI: number = 0,
    id?: string,
  ) {
    return new this(keyPC, codePC, keyMIDI, codeMIDI, id)
  }
}
