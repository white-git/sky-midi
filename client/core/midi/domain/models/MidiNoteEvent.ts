export enum MidiNoteDirection {
  on = 'Note ON',
  off = 'Note OFF',
}

export class MidiNoteEvent {
  direction: MidiNoteDirection
  note: string
  code: number
  command: number

  constructor(command: number, code: number) {
    this.code = code
    this.command = command
    this.note = this.getNoteByCode()
    this.direction = this.getDirectionByCommand()
  }

  private getNoteByCode() {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    const noteOctave = Math.floor((this.code - 12) / 12)
    const noteIndex = this.code % 12
    return noteNames[noteIndex] + noteOctave
  }

  private getDirectionByCommand() {
    switch (this.command) {
      case 144: return MidiNoteDirection.on
      case 128: return MidiNoteDirection.off
      default: return MidiNoteDirection.on
    }
  }

  static create(command: number, code: number) {
    return new this(command, code)
  }
}
